import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout.jsx';
import Icon from '../../components/Icon.jsx';
import { moderation, users, categories } from '../../data/adminData.js';

export default function AdminModerationPage() {
  const [active, setActive] = useState(moderation[0].id);
  const current = moderation.find((item) => item.id === active) ?? moderation[0];

  return (
    <AdminLayout title="Reviews and content moderation" crumb="Administration / Reviews & moderation">
      <section className="admin-intro">
        <div className="admin-intro__copy">
          <p className="admin-eyebrow">Administration / Reviews &amp; moderation</p>
          <p>
            Review pending and flagged content, record moderation decisions and manage community reports.
          </p>
        </div>
        <div className="admin-actions">
          <button className="admin-button" type="button">
            <Icon name="history" />
            View activity log
          </button>
        </div>
      </section>

      <section className="admin-metrics">
        <article className="admin-metric">
          <p className="admin-metric__label"><span>Reviews this month</span><Icon name="star" /></p>
          <p className="admin-metric__value">412</p>
          <p className="admin-metric__note">Average rating 4.6</p>
        </article>
        <article className="admin-metric">
          <p className="admin-metric__label"><span>Awaiting moderation</span><Icon name="shield" /></p>
          <p className="admin-metric__value">12</p>
          <p className="admin-metric__note">8 pending · 4 flagged</p>
        </article>
        <article className="admin-metric">
          <p className="admin-metric__label"><span>Flagged this week</span><Icon name="info" /></p>
          <p className="admin-metric__value">4</p>
          <p className="admin-metric__note">3 promotional · 1 dispute</p>
        </article>
        <article className="admin-metric">
          <p className="admin-metric__label"><span>Hidden reviews</span><Icon name="history" /></p>
          <p className="admin-metric__value">7</p>
          <p className="admin-metric__note">Last 30 days</p>
        </article>
      </section>

      <section className="admin-grid">
        <div className="admin-panel">
          <div className="admin-panel__head">
            <h2 className="admin-panel__title">Review queue</h2>
            <span className="admin-pill admin-pill--pending">4 flagged · 8 pending</span>
          </div>

          <div className="admin-tabs">
            <button className="admin-button admin-button--primary admin-button--quiet" type="button">Needs review</button>
            <button className="admin-button admin-button--quiet" type="button">Flagged only</button>
            <button className="admin-button admin-button--quiet" type="button">Filters</button>
          </div>

          <div className="admin-list">
            {moderation.map((item) => (
              <button
                key={item.id}
                type="button"
                className="admin-list__row"
                style={{
                  border: '1px solid #e1e4da',
                  borderRadius: 8,
                  padding: 14,
                  background: item.id === active ? '#f7f6f0' : '#fff',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
                onClick={() => setActive(item.id)}
              >
                <div style={{ flex: 1 }}>
                  <strong>{item.guest} &middot; {item.farm}</strong>
                  <small>{item.date}</small>
                  <p className="admin-note" style={{ marginTop: 6 }}>&ldquo;{item.text}&rdquo;</p>
                  <span className={`admin-pill admin-pill--${item.tone}`} style={{ marginTop: 8 }}>
                    {item.flag}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <p className="admin-note">Showing 3 of 12 reviews awaiting a decision.</p>
        </div>

        <div className="admin-panel">
          <div className="admin-panel__head">
            <h2 className="admin-panel__title">Review detail</h2>
            <span className="admin-pill admin-pill--muted">{current.id}</span>
          </div>

          <p className="admin-panel__title" style={{ fontSize: 20 }}>A closer look before it&rsquo;s public.</p>

          <div className="admin-callout admin-callout--alert">
            <Icon name="info" />
            <div>
              Reported by 2 community members. This review is not currently public.
            </div>
          </div>

          <div>
            <strong>{current.guest} &middot; {current.farm}</strong>
            <p className="admin-note">{current.date}</p>
            <p className="admin-note">Verified booking · AQV-261108-079</p>
          </div>

          <p className="admin-note">&ldquo;{current.text}&rdquo;</p>

          <div className="admin-field">
            <label htmlFor="mod-decision">Decision reason</label>
            <select id="mod-decision" defaultValue="promo">
              <option value="promo">Promotional or unrelated content</option>
              <option value="dispute">Booking dispute</option>
              <option value="language">Inappropriate language</option>
              <option value="valid">Valid review</option>
            </select>
          </div>

          <div className="admin-field">
            <label htmlFor="mod-note">Internal note</label>
            <textarea id="mod-note" rows="3" defaultValue="Includes an external sales link unrelated to the farm visit." />
          </div>

          <div className="admin-actions">
            <button className="admin-button admin-button--primary" type="button">Hide review</button>
            <button className="admin-button" type="button">Publish review</button>
          </div>

          <p className="admin-note">
            Every decision is logged. Hiding a review notifies the author and keeps it off the farm page.
          </p>
        </div>
      </section>

      <section className="admin-grid">
        <div className="admin-panel">
          <div className="admin-panel__head">
            <h2 className="admin-panel__title">The people behind the visits.</h2>
            <span className="admin-pill admin-pill--muted">2,900 accounts</span>
          </div>

          <div className="admin-table">
            <div className="admin-table__head" style={{ gridTemplateColumns: '1.3fr 0.9fr 0.7fr 0.8fr' }}>
              <span>User</span>
              <span>Role</span>
              <span>Status</span>
              <span>Action</span>
            </div>
            {users.slice(0, 5).map((user) => (
              <div key={user.name} className="admin-table__row" style={{ gridTemplateColumns: '1.3fr 0.9fr 0.7fr 0.8fr' }}>
                <strong>{user.name}</strong>
                <span>{user.role}</span>
                <span className={`admin-pill admin-pill--${user.tone}`}>{user.status}</span>
                <span className="admin-table__action">Edit role</span>
              </div>
            ))}
          </div>

          <p className="admin-note">
            Edit roles, suspend access or restore accounts. Administrative changes require a reason and are
            recorded in the activity log.
          </p>
        </div>

        <div className="admin-panel">
          <div className="admin-panel__head">
            <h2 className="admin-panel__title">Experience categories</h2>
            <button className="admin-button admin-button--quiet" type="button">
              <Icon name="plus" />
              Add
            </button>
          </div>

          <div className="admin-list">
            {categories.map((category) => (
              <div key={category.name} className="admin-list__row">
                <span className="admin-icon-box"><Icon name={category.icon} /></span>
                <div style={{ flex: 1 }}>
                  <strong>{category.name}</strong>
                  <small>{category.farms} farms · Active</small>
                </div>
                <span className="admin-table__action">Edit</span>
              </div>
            ))}
          </div>

          <p className="admin-note">
            Categories in use can be archived, not deleted. Archived categories never appear in new listings.
          </p>
        </div>
      </section>

      <div className="admin-callout">
        <Icon name="info" />
        <div>
          Moderation decisions need a reason and a record. Reviews stay visible until a decision is saved.
        </div>
      </div>
    </AdminLayout>
  );
}
