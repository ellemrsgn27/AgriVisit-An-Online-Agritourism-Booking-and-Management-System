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
  const [reply, setReply] = useState('');
  const [replySent, setReplySent] = useState(false);
  const [replies, setReplies] = useState([]);
  const [replyTo, setReplyTo] = useState(initial.find((review) => review.status === 'waiting')?.id ?? initial[0].id);

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
          <span className="rating-summary__highlight"><span aria-hidden="true">★</span>
          <span className="rating-summary__score">4.9</span>
          </span><span className="rating-summary__count">128 reviews</span>
        </div>
      </div>

      <div className="owner-reviews-workspace">
      <div className="owner-review-feed">
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
                <button className="review-publish-button" type="button" onClick={() => publish(r.id)}>
                  Publish review
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
      </div>
      <aside className="owner-review-sidebar">
        <section className="console-card rating-breakdown-card">
          <h2 className="console-card__title">Rating breakdown</h2>
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = items.filter((review) => Math.round(review.rating) === stars).length;
            const percent = items.length ? (count / items.length) * 100 : 0;
            return <div className="rating-breakdown-row" key={stars}><span>{stars} star</span><div className="rating-breakdown-track"><span style={{ width: `${percent}%` }} /></div><strong>{count}</strong></div>;
          })}
          <p className="form-hint">Based on reviews currently loaded in your dashboard.</p>
        </section>
        <form className="console-card owner-reply-composer" onSubmit={(event) => { event.preventDefault(); if (reply.trim()) { setReplies((list) => [{ id: Date.now(), reviewId: replyTo, text: reply.trim() }, ...list]); setReplySent(true); setReply(''); } }}>
          <h2 className="console-card__title">Reply to guest</h2>
          <label className="form-field__label" htmlFor="reply-review">Choose a review</label>
          <select className="owner-reply-composer__select" id="reply-review" value={replyTo} onChange={(event) => { setReplyTo(Number(event.target.value)); setReplySent(false); }}>
            {items.map((review) => <option key={review.id} value={review.id}>{review.name} · {review.experience}</option>)}
          </select>
          <label className="form-field__label" htmlFor="guest-reply">Your reply</label>
          <textarea id="guest-reply" rows="5" value={reply} onChange={(event) => { setReply(event.target.value); setReplySent(false); }} placeholder="Thank your guest or share a helpful follow-up…" />
          <button className="button button--primary" type="submit" disabled={!reply.trim()}>Send reply</button>
          {replySent && <p className="owner-action-notice" role="status">Reply saved for the selected guest.</p>}
          {replies.filter((item) => item.reviewId === replyTo).map((item) => <p className="owner-reply-saved" key={item.id}>{item.text}</p>)}
        </form>
      </aside>
      </div>
    </OwnerLayout>
  );
}
