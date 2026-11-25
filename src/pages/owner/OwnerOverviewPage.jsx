import { Link } from 'react-router-dom';
import OwnerLayout from '../../components/OwnerLayout.jsx';
import Icon from '../../components/Icon.jsx';
import { farm, bookings, reviews, peso } from '../../services/agriData.js';

const arrivals = [
  { time: '9:00 AM', name: 'Andrea Mendoza', guests: 3, status: 'confirmed' },
  { time: '9:00 AM', name: 'Jomar Dela Cruz', guests: 4, status: 'confirmed' },
  { time: '11:00 AM', name: 'Rica Villanueva', guests: 2, status: 'completed' },
  { time: '2:00 PM', name: 'Paolo Reyes', guests: 5, status: 'pending' },
];

const statusLabel = {
  confirmed: 'Not checked in',
  completed: 'Checked in',
  pending: 'Pending',
};

export default function OwnerOverviewPage() {
  const pending = bookings.filter((b) => b.status === 'pending').length;
  const waiting = reviews.filter((r) => r.status === 'waiting').length;

  return (
    <OwnerLayout title="Overview">
      <div className="console-heading">
        <div>
          <h1 className="console-heading__title">Good morning, Maya.</h1>
        </div>
        <Link className="button button--primary" to="/owner/qr-checkin">
          Open check-in <Icon name="scan" className="button__icon" />
        </Link>
      </div>

      <div className="stat-grid">
        <article className="stat-card">
          <p className="stat-card__label">Today's guests</p>
          <p className="stat-card__value">14</p>
          <p className="stat-card__note">2 sessions &middot; 9:00 AM and 2:00 PM</p>
        </article>
        <article className="stat-card">
          <p className="stat-card__label">Upcoming bookings</p>
          <p className="stat-card__value">{bookings.length}</p>
          <p className="stat-card__note">Next 14 days &middot; {pending} awaiting confirmation</p>
        </article>
        <article className="stat-card">
          <p className="stat-card__label">Income this month</p>
          <p className="stat-card__value">{peso(38400)}</p>
          <p className="stat-card__note">Up 12% from October</p>
        </article>
        <article className="stat-card">
          <p className="stat-card__label">Average rating</p>
          <p className="stat-card__value">4.9</p>
          <p className="stat-card__note">128 reviews &middot; {waiting} to moderate</p>
        </article>
      </div>

      <div className="console-columns">
        <article className="console-card">
          <h2 className="console-card__title">Today's arrivals</h2>
          <ul className="arrival-list">
            {arrivals.map((a) => (
              <li key={a.name}>
                <span className="arrival-list__time">{a.time}</span>
                <span className="arrival-list__name">{a.name}</span>
                <span className="arrival-list__guests">{a.guests} guests</span>
                <span className={`booking-status booking-status--${a.status === 'completed' ? 'checked-in' : a.status === 'pending' ? 'pending' : 'not-checked-in'}`}>
                  {statusLabel[a.status]}
                </span>
              </li>
            ))}
          </ul>
          <Link className="link-button" to="/owner/bookings">
            See all bookings <Icon name="arrow" className="link-button__icon" />
          </Link>
        </article>

        <article className="console-card">
          <h2 className="console-card__title">Needs a look</h2>
          <ul className="attention-list">
            <li><strong>{waiting} {waiting === 1 ? 'review' : 'reviews'}</strong> waiting for moderation</li>
            <li><strong>{pending} {pending === 1 ? 'booking' : 'bookings'}</strong> awaiting your confirmation</li>
            <li><strong>Saturday 11:00 AM</strong> has only 2 slots left</li>
            <li><strong>Farm photos</strong> were last updated in September</li>
          </ul>
        </article>
      </div>
    </OwnerLayout>
  );
}
