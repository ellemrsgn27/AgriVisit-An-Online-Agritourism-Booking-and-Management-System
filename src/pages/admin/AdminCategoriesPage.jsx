import AdminLayout from '../../components/AdminLayout.jsx';
import Icon from '../../components/Icon.jsx';
import { categories } from '../../services/agriData.js';

const columns = { gridTemplateColumns: '1.6fr 0.8fr 0.7fr 0.9fr' };

export default function AdminCategoriesPage() {
  return (
    <AdminLayout title="Experience categories" crumb="Administration / Categories">
      <section className="admin-intro">
        <div className="admin-intro__copy">
          <p className="admin-eyebrow">Administration / Categories</p>
        </div>
        <div className="admin-actions">
          <button className="admin-button admin-button--primary" type="button">
            <Icon name="plus" />
            Add category
          </button>
        </div>
      </section>

      <section className="admin-metrics">
        <article className="admin-metric">
          <p className="admin-metric__label"><span>Active categories</span><Icon name="tags" /></p>
          <p className="admin-metric__value">4</p>
          <p className="admin-metric__note">Used across 68 farms</p>
        </article>
        <article className="admin-metric">
          <p className="admin-metric__label"><span>Experiences listed</span><Icon name="calendar" /></p>
          <p className="admin-metric__value">186</p>
          <p className="admin-metric__note">22 added this month</p>
        </article>
        <article className="admin-metric">
          <p className="admin-metric__label"><span>Archived categories</span><Icon name="history" /></p>
          <p className="admin-metric__value">2</p>
          <p className="admin-metric__note">Hidden from discovery</p>
        </article>
        <article className="admin-metric">
          <p className="admin-metric__label"><span>Farms with no category</span><Icon name="info" /></p>
          <p className="admin-metric__value">3</p>
          <p className="admin-metric__note">Needs owner follow-up</p>
        </article>
      </section>

      <section className="admin-grid">
        <div className="admin-panel">
          <div className="admin-panel__head">
            <h2 className="admin-panel__title">Category catalog</h2>
            <span className="admin-pill admin-pill--muted">4 active</span>
          </div>

          <div className="admin-table">
            <div className="admin-table__head" style={columns}>
              <span>Category</span>
              <span>Farms</span>
              <span>Status</span>
              <span>Action</span>
            </div>
            {categories.map((category) => (
              <div key={category.name} className="admin-table__row" style={columns}>
                <div className="admin-split-row">
                  <span className="admin-icon-box"><Icon name={category.icon} /></span>
                  <strong>{category.name}</strong>
                </div>
                <span>{category.farms} farms</span>
                <span className="admin-pill admin-pill--valid">Active</span>
                <button className="admin-table__action" type="button">Edit</button>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel__head">
            <h2 className="admin-panel__title">New category</h2>
          </div>

          <div className="admin-field">
            <label htmlFor="cat-name">Category name</label>
            <input id="cat-name" type="text" placeholder="For example: Farm stay" />
          </div>

          <div className="admin-field">
            <label htmlFor="cat-desc">Description</label>
            <textarea id="cat-desc" rows="3" placeholder="One sentence explaining what visitors do" />
          </div>

          <div className="admin-actions">
            <button className="admin-button admin-button--primary" type="button">Create category</button>
            <button className="admin-button" type="button">Discard draft</button>
          </div>
        </div>
      </section>

      <section className="admin-panel">
        <h2 className="admin-panel__title">Change history</h2>

        <div className="admin-list">
          {[
            { time: 'Current', title: 'Four active categories in discovery', note: 'Names and farm usage match the current catalog' },
            { time: '2 Nov', title: 'Farm stay category archived', note: 'Low usage · archived by Jules Reyes' },
            { time: '18 Oct', title: 'Farm-to-table renamed', note: 'Previously called Harvest meals' },
          ].map((item) => (
            <div key={item.title} className="admin-list__row">
              <span className="admin-pill admin-pill--muted">{item.time}</span>
              <div>
                <strong>{item.title}</strong>
                <small>{item.note}</small>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AdminLayout>
  );
}
