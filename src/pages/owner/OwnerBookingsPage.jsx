import { useState } from 'react';
import OwnerLayout from '../../components/OwnerLayout.jsx';
import { bookings, peso } from '../../data/ownerData.js';

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Awaiting confirmation' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'completed', label: 'Checked in' },
];

export default function OwnerBookingsPage() {
  const [filter, setFilter] = useState('all');
  const shown = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <OwnerLayout title="Bookings">
      <div className="console-heading">
        <div>
          <h1 className="console-heading__title">Bookings</h1>
          <p className="console-heading__text">Confirm new visits and see who is coming.</p>
        </div>
      </div>

      <div className="booking-tabs" role="tablist" aria-label="Booking filters">
        {tabs.map((t) => {
          const count = t.key === 'all' ? bookings.length : bookings.filter((b) => b.status === t.key).length;
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
          </article>
        ))}
      </div>
    </OwnerLayout>
  );
}
