import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import Layout from '../components/Layout.jsx';

const initialBookings = [
  { id: 'AGV-261114-084', status: 'upcoming', label: 'Confirmed', statusClass: 'confirmed', farm: 'Hiraya Family Farm', name: 'Orchard walk & calamansi picking', detail: 'Sat, 14 Nov 2026 · 9:00–11:00 AM · 3 adults', price: '₱2,050 paid in full · GCash', guests: 3, total: 2050, paymentMethod: 'GCash', paymentMethodValue: 'gcash', photo: '/images/story/farm-growers.jpg', confirmed: true },
  { id: 'AGV-261121-092', status: 'upcoming', label: 'Pending host confirmation', statusClass: 'pending', farm: 'Luntian Grove', name: 'From garden to lunch table', detail: 'Sat, 21 Nov · 11:00 AM–2:00 PM · 2 adults', price: '₱2,000 paid · refunded if declined', guests: 2, total: 2000, paymentMethod: 'GCash', photo: '/images/story/farm-landscape.jpg' },
  { id: 'AGV-261024-055', status: 'past', label: 'Completed · Checked in', statusClass: 'completed', farm: 'Bukid & Bloom', name: 'Grow a little, learn a lot', detail: '24 Oct 2026 · 2 adults', price: '₱1,000', guests: 2, total: 1000, photo: '/images/story/farm-landscape.jpg' },
  { id: 'AGV-261108-069', status: 'cancelled', label: 'Cancelled', statusClass: 'cancelled', farm: 'Sinta Hills Farm', name: 'Working farm tour', detail: '8 Nov 2026 · 1 adult', price: '₱450 fully refunded', guests: 1, total: 450, photo: '/images/story/farm-growers.jpg' },
];

const savedBookingsKey = 'agrivisit-confirmed-bookings';

const tabs = [
  { id: 'all', label: 'All bookings' }, { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past visits' }, { id: 'cancelled', label: 'Cancelled' },
];

function ticketPayload(booking) {
  return JSON.stringify({
    bookingId: booking.id,
    guests: booking.guests ?? 3,
    paymentMethod: booking.paymentMethod ?? 'GCash',
    total: booking.total ?? 2050,
  });
}

export default function BookingsPage() {
  const location = useLocation();
  const checkoutBooking = location.state?.confirmedBooking;
  const [bookings, setBookings] = useState(() => {
    let savedBookings = [];
    try { savedBookings = JSON.parse(localStorage.getItem(savedBookingsKey) || '[]'); } catch { savedBookings = []; }
    const base = [...initialBookings, ...savedBookings];
    return checkoutBooking && !base.some((booking) => booking.id === checkoutBooking.id) ? [...base, checkoutBooking] : base;
  });
  const [tab, setTab] = useState('all');
  const [impactOpen, setImpactOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('AGV-261114-084');
  const visible = bookings.filter((booking) => tab === 'all' || booking.status === tab);
  const selected = visible.find((booking) => booking.id === selectedId) || visible[0];
  const upcomingCount = bookings.filter((booking) => booking.status === 'upcoming').length;
  const completedCount = bookings.filter((booking) => booking.statusClass === 'completed').length;
  const supportedBookings = bookings.filter((booking) => booking.status !== 'cancelled');
  const supportedFarmCount = new Set(supportedBookings.map((booking) => booking.farm)).size;
  const supportedTotal = supportedBookings.reduce((sum, booking) => sum + (booking.total ?? 0), 0);

  function cancel(id) {
    setBookings((list) => list.map((booking) => booking.id === id
      ? { ...booking, status: 'cancelled', label: 'Cancelled', statusClass: 'cancelled', confirmed: false }
      : booking));
  }

  return (
    <Layout>
      <div className="page-shell bookings-page">
        <section className="page-introduction page-introduction--split bookings-page__header">
          <div className="page-introduction__copy">
            <h1 className="page-introduction__heading">My bookings</h1>
          </div>
          <span className="bookings-summary-badge">{upcomingCount} upcoming · {completedCount} completed</span>
        </section>

        <section className="farm-impact" aria-labelledby="farm-impact-title">
          <div className="farm-impact__heading">
            <h2 id="farm-impact-title">Your farm impact</h2>
            <button className="farm-impact__view" type="button" onClick={() => setImpactOpen(true)}>View impact breakdown</button>
          </div>
          <div className="farm-impact__grid">
            <article className="farm-impact__card"><h3>Farms supported</h3><strong>{supportedFarmCount} active farms</strong><p>₱{supportedTotal.toLocaleString('en-PH')} in confirmed &amp; completed bookings</p></article>
            <article className="farm-impact__card"><h3>Visit progress</h3><strong>{completedCount} completed · {upcomingCount} upcoming</strong><p>Past visits {completedCount} · Upcoming {upcomingCount}</p></article>
            <article className="farm-impact__card"><h3>Harvest &amp; eco impact</h3><strong>{completedCount * 8} kg produce harvested</strong><p>{completedCount} zero-waste tour completed · {upcomingCount} scheduled</p></article>
            <article className="farm-impact__card farm-impact__card--tier"><h3>Steward tier</h3><strong>Harvester · Level 2</strong><div className="farm-impact__progress" role="progressbar" aria-label="Progress to Farm Steward perk" aria-valuemin="0" aria-valuemax="3" aria-valuenow={Math.min(3, completedCount + 1)}><span style={{ width: `${Math.min(100, Math.round((completedCount + 1) / 3 * 100))}%` }} /></div><p>{upcomingCount ? 'Complete 1 upcoming visit to unlock Farm Steward · Level 3' : 'Book a visit to unlock Farm Steward · Level 3'}</p></article>
          </div>
        </section>

        <div className="booking-tabs" role="tablist" aria-label="Booking status">
          {tabs.map((item) => {
            const count = item.id === 'all' ? bookings.length : bookings.filter((booking) => booking.status === item.id).length;
            return <button key={item.id} type="button" role="tab" aria-selected={tab === item.id} className={`booking-tabs__tab${tab === item.id ? ' is-active' : ''}`} onClick={() => setTab(item.id)}>{item.label} <span className="booking-tabs__count">{count}</span></button>;
          })}
        </div>

        {impactOpen && <div className="impact-dialog__backdrop" onKeyDown={(event) => { if (event.key === 'Escape') setImpactOpen(false); }} onMouseDown={(event) => { if (event.target === event.currentTarget) setImpactOpen(false); }}>
          <section className="impact-dialog" role="dialog" aria-modal="true" aria-labelledby="impact-dialog-title">
            <button className="impact-dialog__close" type="button" aria-label="Close impact breakdown" onClick={() => setImpactOpen(false)}>×</button>
            <p className="impact-dialog__eyebrow">Your farm impact</p>
            <h2 id="impact-dialog-title">Impact &amp; rewards breakdown</h2>
            <h3>Farm contributions</h3>
            <ul className="impact-dialog__farms"><li><span>Bukid &amp; Bloom · ₱1,000</span><strong>Completed</strong></li><li><span>Hiraya Family Farm · ₱2,050</span><strong>Confirmed</strong></li><li><span>Luntian Grove · ₱2,000</span><strong>Pending</strong></li></ul>
            <h3>Earned &amp; next-tier badges</h3>
            <div className="impact-dialog__badges"><span>First Harvest</span><span>Orchard Supporter</span><span className="impact-dialog__badge--locked">🔒 Farm Steward · Complimentary seasonal harvest basket + priority weekend slots</span></div>
            <Link className="button button--primary impact-dialog__cta" to="/discovery">Book another farm to level up</Link>
          </section>
        </div>}

        <div className="bookings-master-detail">
          <section className="bookings-list-column" aria-label="Bookings list">
            {visible.length === 0 && <p className="booking-list__empty">No bookings in this tab yet.</p>}
            {visible.map((booking) => <article key={booking.id} className={`booking-list-card${selected?.id === booking.id ? ' is-selected' : ''}`}>
              <button className="booking-list-card__select" type="button" onClick={() => setSelectedId(booking.id)} aria-pressed={selected?.id === booking.id}>
                <img className="booking-list-card__photo" src={booking.photo} alt="" />
                <span className="booking-list-card__content">
                  <span className="booking-list-card__top"><span className={`booking-status booking-status--${booking.statusClass}`}>{booking.label}</span><span className="booking-list-card__id">{booking.id}</span></span>
                  <strong className="booking-list-card__title">{booking.farm} · {booking.name}</strong>
                  <span className="booking-list-card__summary">{booking.detail}</span>
                  <span className="booking-list-card__payment">{booking.price}</span>
                </span>
              </button>
              <div className="booking-list-card__actions">
                {booking.confirmed && <button type="button" className="booking-card-action" onClick={() => setSelectedId(booking.id)}>View pass</button>}
                {booking.statusClass === 'pending' && <button type="button" className="booking-card-action booking-card-action--danger" onClick={() => cancel(booking.id)}>Cancel booking</button>}
                {booking.statusClass === 'completed' && <button type="button" className="booking-card-action" onClick={() => setSelectedId(booking.id)}>Leave a review</button>}
                {booking.statusClass === 'cancelled' && <Link className="booking-card-action" to="/farm">Book again</Link>}
              </div>
            </article>)}
          </section>

          {selected && <aside className="booking-inspector" aria-live="polite">
            {selected.confirmed ? <>
              <p className="booking-inspector__eyebrow">Your farm day pass</p>
              <h2 className="booking-inspector__title">{selected.farm}</h2>
              <p className="booking-inspector__experience">{selected.name}</p>
              <QRCodeSVG className="booking-inspector__qr" value={ticketPayload(selected)} size={190} level="M" includeMargin aria-label={`QR ticket for ${selected.id}`} />
              <p className="booking-pass__reference">{selected.id}</p>
              <p className="booking-inspector__group">{selected.guests ?? 3} adults · {selected.paymentMethod ?? 'GCash'} · ₱{(selected.total ?? 2050).toLocaleString('en-PH')}</p>
              <span className="booking-pass__status">Valid · Not checked in</span>
              <p className="booking-entry__arrival">Arrive by 8:45 AM at the main gate. Wear closed shoes and bring a hat and water. One QR ticket admits your full group of {selected.guests ?? 3}.</p>
              <div className="booking-inspector__quick-links">
                <a href={`data:text/calendar;charset=utf-8,${encodeURIComponent('BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Hiraya Family Farm · Orchard walk & calamansi picking\nDTSTART:20261114T010000Z\nDTEND:20261114T030000Z\nEND:VEVENT\nEND:VCALENDAR')}`} download="hiraya-farm-day.ics">Add to calendar</a>
                <a href="mailto:maya.santos@hirayafarm.example?subject=Booking%20AGV-261114-084">Message host</a>
                <button type="button" className="booking-card-action booking-card-action--danger" onClick={() => cancel(selected.id)}>Cancel booking</button>
              </div>
              <button className="booking-pass__download" type="button" onClick={() => window.print()}>Download e-ticket</button>
            </> : <>
              <p className="booking-inspector__eyebrow">Booking details</p>
              <span className={`booking-status booking-status--${selected.statusClass}`}>{selected.label}</span>
              <h2 className="booking-inspector__title">{selected.farm}</h2>
              <p className="booking-inspector__experience">{selected.name}</p>
              <p className="booking-inspector__id">{selected.id}</p>
              <dl className="booking-inspector__breakdown">
                <div><dt>Visit</dt><dd>{selected.detail}</dd></div>
                <div><dt>Guests</dt><dd>{selected.guests} adults</dd></div>
                <div><dt>Payment</dt><dd>{selected.price}</dd></div>
              </dl>
              {selected.statusClass === 'pending' && <div className="booking-inspector__next-step"><strong>Pending host confirmation</strong><p>Your QR ticket will be issued once the host confirms.</p><p>Refunded if the host declines.</p></div>}
              {selected.statusClass === 'completed' && <div className="booking-inspector__next-step"><strong>Visit completed</strong><p>Share a note about your farm day.</p><button className="booking-card-action" type="button">Write a review</button></div>}
              {selected.statusClass === 'cancelled' && <div className="booking-inspector__next-step"><strong>Refund confirmed</strong><p>{selected.price}</p><Link className="booking-card-action" to="/farm">Book again</Link></div>}
            </>}
          </aside>}
        </div>
      </div>
    </Layout>
  );
}
