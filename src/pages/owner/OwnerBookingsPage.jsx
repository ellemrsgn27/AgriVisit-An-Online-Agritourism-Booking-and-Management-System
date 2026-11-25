import { useState } from 'react';
import OwnerLayout from '../../components/OwnerLayout.jsx';
import { bookings, peso } from '../../services/agriData.js';

const tabs = [
  { key: 'all', label: 'All' }, { key: 'pending', label: 'Awaiting confirmation' },
  { key: 'confirmed', label: 'Confirmed' }, { key: 'completed', label: 'Checked in' },
];
const statusLabel = { pending: 'Awaiting reply', confirmed: 'Confirmed', completed: 'Checked in' };

export default function OwnerBookingsPage() {
  const [filter, setFilter] = useState('all');
  const [rows, setRows] = useState(bookings);
  const [selectedRef, setSelectedRef] = useState('AGV-261121-092');
  const [message, setMessage] = useState('');
  const [notice, setNotice] = useState('');
  const shown = filter === 'all' ? rows : rows.filter((b) => b.status === filter);
  const selected = shown.find((b) => b.ref === selectedRef) || shown[0];
  const today = rows.filter((b) => b.date === 'Sat, 14 Nov').length;
  const thisMonth = rows.filter((b) => b.date.includes('Nov')).length;
  const guestCount = rows.reduce((sum, booking) => sum + booking.guests, 0);

  function confirm(ref) {
    setRows((list) => list.map((b) => (b.ref === ref ? { ...b, status: 'confirmed', hold: 'Confirmed · slots reserved' } : b)));
    setNotice('Booking confirmed and session slots reserved.');
  }
  function decline(ref) {
    setRows((list) => list.filter((b) => b.ref !== ref));
    setSelectedRef(rows.find((b) => b.ref !== ref)?.ref || '');
    setNotice('Booking request declined.');
  }

  return (
    <OwnerLayout title="Bookings">
      <div className="console-heading">
        <div><h1 className="console-heading__title">Bookings</h1><p className="console-heading__text">Review requests, keep sessions full, and prepare for arrivals.</p></div>
        <span className="owner-bookings-summary">{rows.length} bookings</span>
      </div>

      <section className="owner-kpi-grid" aria-label="Booking summary">
        <article><span>Awaiting reply</span><strong>{rows.filter((b) => b.status === 'pending').length}</strong></article>
        <article><span>Today's arrivals</span><strong>{today}</strong></article>
        <article><span>This month</span><strong>{thisMonth}</strong></article>
        <article><span>Guests booked</span><strong>{guestCount}</strong></article>
      </section>

      <div className="booking-tabs" role="tablist" aria-label="Owner booking filters">
        {tabs.map((t) => <button key={t.key} type="button" role="tab" aria-selected={filter === t.key} className={`booking-tabs__tab${filter === t.key ? ' is-active' : ''}`} onClick={() => setFilter(t.key)}>{t.label}<span className="booking-tabs__count">{t.key === 'all' ? rows.length : rows.filter((b) => b.status === t.key).length}</span></button>)}
      </div>

      <div className="owner-bookings-workspace">
        <section className="owner-queue" aria-label="Booking queue">
          <h2 className="console-card__title">Booking queue</h2>
          {shown.length === 0 && <p className="owner-queue__empty">No bookings in this view.</p>}
          {shown.map((b) => <button key={b.ref} type="button" className={`owner-queue-row${selected?.ref === b.ref ? ' is-selected' : ''}`} onClick={() => { setSelectedRef(b.ref); setNotice(''); }}>
            <span className="owner-queue-row__identity"><strong>{b.name}</strong><small>{b.ref}</small></span>
            <span className="owner-queue-row__visit">{b.date} · {b.time}<small>{b.guests} guests · {b.experience}</small></span>
            <span className={`booking-status booking-status--${b.status}`}>{statusLabel[b.status]}</span>
            <strong className="owner-queue-row__total">{peso(b.total)}</strong>
          </button>)}
        </section>

        {selected && <aside className="owner-booking-inspector">
          <p className="owner-booking-inspector__eyebrow">Selected booking detail</p>
          <h2>{selected.name}</h2>
          <p className="owner-booking-inspector__ref">{selected.ref}</p>
          <span className={`booking-status booking-status--${selected.status}`}>{statusLabel[selected.status]}</span>
          <dl className="owner-detail-list">
            <div><dt>Contact</dt><dd>{selected.email}<br />{selected.phone}</dd></div>
            <div><dt>Visit</dt><dd>{selected.date} · {selected.time}<br />{selected.experience}</dd></div>
            <div><dt>Group</dt><dd>{selected.guests} guests · {peso(selected.total)} paid</dd></div>
            <div><dt>Dietary &amp; arrival notes</dt><dd>{selected.note}</dd></div>
            <div><dt>Slot hold</dt><dd>{selected.hold}</dd></div>
          </dl>
          {selected.status === 'pending' && <div className="owner-inspector-actions"><button className="button button--primary" type="button" onClick={() => confirm(selected.ref)}>Confirm</button><button className="button button--ghost" type="button" onClick={() => decline(selected.ref)}>Decline</button><a className="button button--ghost" href={`mailto:${selected.email}?subject=${encodeURIComponent(`Booking ${selected.ref}`)}`}>Message</a></div>}
          {selected.status !== 'pending' && <a className="button button--ghost" href={`mailto:${selected.email}?subject=${encodeURIComponent(`Booking ${selected.ref}`)}`}>Message guest</a>}
          {notice && <p className="owner-action-notice" role="status">{notice}</p>}
        </aside>}
      </div>
    </OwnerLayout>
  );
}
