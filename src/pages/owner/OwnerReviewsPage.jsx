import { useState } from 'react';
import OwnerLayout from '../../components/OwnerLayout.jsx';
import Icon from '../../components/Icon.jsx';
import { reviews as initial } from '../../services/agriData.js';

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'reply', label: 'Needs a reply' },
  { key: 'waiting', label: 'Awaiting moderation' },
];

export default function OwnerReviewsPage() {
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState('all');

  const shown = items.filter((r) => {
    if (filter === 'all') return true;
    if (filter === 'waiting') return r.status === 'waiting';
    return r.status === 'published';
  });

  function publish(id) {
    setItems((list) => list.map((r) => (r.id === id ? { ...r, status: 'published' } : r)));
  }

  return (
    <OwnerLayout title="Reviews">
      <div className="console-heading">
        <div>
          <h1 className="console-heading__title">Reviews</h1>
          <p className="console-heading__text">
            Only visitors with a completed visit can review. Written reviews appear after moderation.
          </p>
        </div>
        <div className="rating-summary">
          <Icon name="star" className="rating__star" />
          <span className="rating-summary__score">4.9</span>
          <span className="rating-summary__count">128 reviews</span>
        </div>
      </div>

      <div className="booking-tabs" role="tablist" aria-label="Review filters">
        {tabs.map((t) => {
          const count = items.filter((r) => {
            if (t.key === 'all') return true;
            if (t.key === 'waiting') return r.status === 'waiting';
            return r.status === 'published';
          }).length;
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

      <div className="review-admin-list">
        {shown.map((r) => (
          <article key={r.id} className="review-admin-row">
            <div className="review-admin-row__head">
              <span className="console-account__avatar">{r.initials}</span>
              <div>
                <p className="review-admin-row__name">{r.name}</p>
                <p className="review-admin-row__meta">{r.experience} &middot; {r.date}</p>
              </div>
              <p className="rating">
                <Icon name="star" className="rating__star" /> {r.rating.toFixed(1)}
              </p>
            </div>
            <p className="review-admin-row__text">{r.text}</p>
            <div className="review-admin-row__actions">
              <button className="button button--ghost" type="button">Reply</button>
              {r.status === 'published' ? (
                <span className="booking-status booking-status--valid">Published</span>
              ) : (
                <button className="link-button" type="button" onClick={() => publish(r.id)}>
                  Awaiting moderation &middot; publish
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </OwnerLayout>
  );
}
