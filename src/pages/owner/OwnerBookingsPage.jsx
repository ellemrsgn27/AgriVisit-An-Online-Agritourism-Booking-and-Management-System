import { useState } from 'react';
import OwnerLayout from '../../components/OwnerLayout.jsx';
import { bookings, peso } from '../../services/agriData.js';

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Awaiting confirmation' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'completed', label: 'Checked in' },
];

const statusLabel = {
  pending: 'Awaiting confirmation',
  confirmed: 'Confirmed',
  completed: 'Checked in',
};

export default function OwnerBookingsPage() {
  const [filter, setFilter] = useState('all');
  const [rows, setRows] = useState(bookings);

  const shown = filter === 'all' ? rows : rows.filter((b) => b.status === filter);

  function confirm(ref) {
    setRows((list) => list.map((b) => (b.ref === ref ? { ...b, status: 'confirmed' } : b)));
  }

  function decline(ref) {
    setRows((list) => list.filter((b) => b.ref !== ref));
  }

  return (
    <OwnerLayout title="Bookings">
      <div className="console-heading">
        <div>
          <h1 className="console-heading__title">Bookings</h1>
          <p className="console-heading__text">
            Confirm requests, watch your slot counts, and keep arrival times clear.
          </p>
        </div>
      </div>

      <div className="booking-tabs" role="tablist" aria-label="Owner booking filters">
        {tabs.map((t) => {
          const count = t.key === 'all' ? rows.length : rows.filter((b) => b.status === t.key).length;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={filter === t.key}
              className={`booking-tabs__tab${filter === t.key ? ' is-active' : ''}`}
              onClick={() => setFilter(t.key)}
            >
              {t.label} <span className="booking-tabs__count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="owner-booking-list">
        {shown.map((b) => (
          <article key={b.ref} className="owner-booking-row" data-status={b.status}>
            <div className="owner-booking-row__who">
              <p className="owner-booking-row__name">{b.name}</p>
              <p className="owner-booking-row__ref">{b.ref}</p>
            </div>
            <div>
              <p className="owner-booking-row__session">{b.date} &middot; {b.time}</p>
              <p className="owner-booking-row__sub">{b.guests} guests &middot; {b.experience}</p>
            </div>
            <p className="owner-booking-row__total">{peso(b.total)}</p>
            <span className={`booking-status booking-status--${b.status}`}>{statusLabel[b.status]}</span>
            <div className="owner-booking-row__actions">
              {b.status === 'pending' && (
                <>
                  <button className="button button--primary" type="button" onClick={() => confirm(b.ref)}>
                    Confirm
                  </button>
                  <button className="link-button link-button--danger" type="button" onClick={() => decline(b.ref)}>
                    Decline
                  </button>
                </>
              )}
              {b.status === 'confirmed' && (
                <button className="button button--ghost" type="button">Message guest</button>
              )}
              {b.status === 'completed' && (
                <button className="button button--ghost" type="button">View ticket</button>
              )}
            </div>
          </article>
        ))}
      </div>
    </OwnerLayout>
  );
}
