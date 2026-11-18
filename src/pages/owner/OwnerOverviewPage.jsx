import OwnerLayout from '../../components/OwnerLayout.jsx';
import { farm, bookings, peso } from '../../data/ownerData.js';

export default function OwnerOverviewPage() {
  const pending = bookings.filter((b) => b.status === 'pending').length;
  return (
    <OwnerLayout title="Overview">
      <div className="console-heading">
        <div>
          <h1 className="console-heading__title">Good morning, Maya.</h1>
          <p className="console-heading__text">Your farm at a glance.</p>
        </div>
      </div>

      <div className="stat-grid">
        <article className="stat-card"><p className="stat-card__label">Upcoming bookings</p><p className="stat-card__value">{bookings.length}</p><p className="stat-card__note">{pending} awaiting confirmation</p></article>
        <article className="stat-card"><p className="stat-card__label">Income this month</p><p className="stat-card__value">{peso(38400)}</p><p className="stat-card__note">Up 12% from October</p></article>
        <article className="stat-card"><p className="stat-card__label">Experiences</p><p className="stat-card__value">{farm.experiences.length}</p><p className="stat-card__note">Active on your farm</p></article>
        <article className="stat-card"><p className="stat-card__label">Average rating</p><p className="stat-card__value">4.9</p><p className="stat-card__note">128 reviews</p></article>
      </div>

      <article className="console-card">
        <h2 className="console-card__title">Needs a look</h2>
        <ul className="attention-list">
          <li><strong>{pending} bookings</strong> awaiting your confirmation</li>
          <li><strong>2 reviews</strong> waiting for moderation</li>
        </ul>
      </article>
    </OwnerLayout>
  );
}
