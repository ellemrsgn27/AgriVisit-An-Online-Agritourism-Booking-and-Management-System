import { useState } from 'react';
import OwnerLayout from '../../components/OwnerLayout.jsx';
import { reviews as initial } from '../../data/ownerData.js';

export default function OwnerReviewsPage() {
  const [items, setItems] = useState(initial);

  function setStatus(id, status) {
    setItems((list) => list.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  return (
    <OwnerLayout title="Reviews">
      <div className="console-heading">
        <div>
          <h1 className="console-heading__title">Reviews</h1>
          <p className="console-heading__text">Read guest feedback and choose what shows on your farm page.</p>
        </div>
      </div>

      <div className="console-columns">
        {items.map((r) => (
          <article key={r.id} className="console-card">
            <h2 className="console-card__title">{r.name} &middot; {'\u2605'.repeat(r.rating)}</h2>
            <p className="console-card__text">{r.text}</p>
            {r.status === 'waiting' ? (
              <div>
                <button className="button button--ghost" type="button" onClick={() => setStatus(r.id, 'published')}>Publish</button>
              </div>
            ) : (
              <p className="form-hint">Published</p>
            )}
          </article>
        ))}
      </div>
    </OwnerLayout>
  );
}
