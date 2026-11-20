import { useState } from 'react';
import Layout from '../components/Layout.jsx';

const initialBookings = [
  {
    id: 'AGV-261114-084',
    status: 'upcoming',
    label: 'Confirmed',
    statusClass: 'confirmed',
    farm: 'Hiraya Family Farm',
    name: 'Orchard walk & calamansi picking',
    detail: 'Sat, 14 Nov 2026 · 9:00–11:00 AM · 3 adults',
    price: '₱2,050 paid in full',
  },
  {
    id: 'AGV-261121-092',
    status: 'upcoming',
    label: 'Pending host confirmation',
    statusClass: 'pending',
    farm: 'Luntian Grove',
    name: 'From garden to lunch table',
    detail: 'Sat, 21 Nov · 11:00 AM–2:00 PM · 2 adults',
    price: '₱2,000 paid · refunded if declined',
  },
  {
    id: 'AGV-261024-055',
    status: 'past',
    label: 'Completed · Checked in',
    statusClass: 'completed',
    farm: 'Bukid & Bloom',
    name: 'Grow a little, learn a lot',
    detail: '24 Oct 2026 · 2 adults',
    price: '₱1,000',
  },
  {
    id: 'AGV-261108-069',
    status: 'cancelled',
    label: 'Cancelled',
    statusClass: 'cancelled',
    farm: 'Sinta Hills Farm',
    name: 'Working farm tour',
    detail: '8 Nov 2026 · 1 adult',
    price: '₱450 fully refunded',
  },
];

const tabs = [
  { id: 'all', label: 'All bookings' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past visits' },
  { id: 'cancelled', label: 'Cancelled' },
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState(initialBookings);
  const [tab, setTab] = useState('all');

  const visible = bookings.filter((b) => tab === 'all' || b.status === tab);

  function cancel(id) {
    setBookings((list) =>
      list.map((b) => (b.id === id ? { ...b, status: 'cancelled', label: 'Cancelled', statusClass: 'cancelled' } : b)),
    );
  }

  return (
    <Layout>
      <div className="page-shell">
        <section className="page-introduction page-introduction--split">
          <div className="page-introduction__copy">
            <h1 className="page-introduction__heading">Your next good day is booked.</h1>
            <p className="page-introduction__description">All your farm days, tickets, and little memories in one place.</p>
          </div>
        </section>

        <div className="booking-tabs" role="tablist" aria-label="Booking status">
          {tabs.map((t) => {
            const count = t.id === 'all' ? bookings.length : bookings.filter((b) => b.status === t.id).length;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={`booking-tabs__tab${tab === t.id ? ' is-active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.label} <span className="booking-tabs__count">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="booking-list" id="booking-list">
          {visible.length === 0 && <p className="booking-list__empty">No bookings in this tab yet.</p>}
          {visible.map((b) => (
            <article className="booking-entry" key={b.id} data-status={b.status}>
              <div className="booking-entry__header">
                <div className="booking-entry__summary">
                  <p className="booking-entry__tags">
                    <span className={`booking-status booking-status--${b.statusClass}`}>{b.label}</span>
                    <span className="booking-card__reference">{b.id}</span>
                  </p>
                  <h3 className="booking-entry__title">{b.farm} · {b.name}</h3>
                  <p className="booking-entry__meta">{b.detail} · {b.price}</p>
                  {b.status === 'upcoming' && (
                    <button className="link-button link-button--danger" type="button" onClick={() => cancel(b.id)}>
                      Cancel booking
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
