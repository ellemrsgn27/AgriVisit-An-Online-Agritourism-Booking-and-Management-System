import AdminLayout from '../../components/AdminLayout.jsx';
import Icon from '../../components/Icon.jsx';
import { users } from '../../services/agriData.js';

const columns = { gridTemplateColumns: '1.3fr 0.9fr 0.7fr 0.6fr' };

export default function AdminUsersPage() {
  return (
    <AdminLayout title="Users and roles" crumb="Administration / Users & roles">
      <section className="admin-intro">
        <div className="admin-intro__copy">
          <p className="admin-eyebrow">Administration / Users &amp; roles</p>
        </div>
        <div className="admin-actions">
          <button className="admin-button" type="button">
            <Icon name="user-plus" />
            Add user
          </button>
        </div>
      </section>

      <section className="admin-metrics">
        <article className="admin-metric">
          <p className="admin-metric__label"><span>Tourist accounts</span><Icon name="users" /></p>
          <p className="admin-metric__value">2,481</p>
          <p className="admin-metric__note">196 new this month</p>
        </article>
        <article className="admin-metric">
          <p className="admin-metric__label"><span>Farm owners</span><Icon name="tractor" /></p>
          <p className="admin-metric__value">402</p>
          <p className="admin-metric__note">12 awaiting approval</p>
        </article>
        <article className="admin-metric">
          <p className="admin-metric__label"><span>Administrators</span><Icon name="shield" /></p>
          <p className="admin-metric__value">9</p>
          <p className="admin-metric__note">3 with approval rights</p>
        </article>
        <article className="admin-metric">
          <p className="admin-metric__label"><span>Suspended</span><Icon name="info" /></p>
          <p className="admin-metric__value">4</p>
          <p className="admin-metric__note">2 pending review</p>
        </article>
      </section>

      <section className="admin-filters" style={{ gridTemplateColumns: 'repeat(3, minmax(0,1fr)) auto' }}>
        <div className="admin-field">
          <label htmlFor="us-search">Search users</label>
          <input id="us-search" type="search" placeholder="Name or email address" />
        </div>
        <div className="admin-field">
          <label htmlFor="us-role">Role</label>
          <select id="us-role" defaultValue="all">
            <option value="all">All roles</option>
            <option value="tourist">Tourist</option>
            <option value="owner">Farm owner</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
        <div className="admin-field">
          <label htmlFor="us-status">Status</label>
          <select id="us-status" defaultValue="all">
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        <button className="admin-button" type="button">Apply filters</button>
      </section>

      <section className="admin-grid">
        <div className="admin-panel">
          <div className="admin-panel__head">
            <h2 className="admin-panel__title">User register</h2>
            <span className="admin-pill admin-pill--muted">2,900 accounts</span>
          </div>

          <div className="admin-table">
            <div className="admin-table__head" style={columns}>
              <span>User</span>
              <span>Role</span>
              <span>Status</span>
              <span>Action</span>
            </div>
            {users.map((user) => (
              <div key={user.name} className="admin-table__row" style={columns}>
                <strong>{user.name}</strong>
                <span>{user.role}</span>
                <span className={`admin-pill admin-pill--${user.tone}`}>{user.status}</span>
                <button className="admin-table__action" type="button">Edit role</button>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel__head">
            <h2 className="admin-panel__title">Role permissions</h2>
          </div>

          <div className="admin-field">
            <label htmlFor="us-perm-role">Role</label>
            <select id="us-perm-role" defaultValue="admin">
              <option value="tourist">Tourist</option>
              <option value="owner">Farm owner</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <div className="admin-field">
            <label htmlFor="us-reason">Reason for change</label>
            <textarea id="us-reason" rows="3" placeholder="Required for role and access changes" />
          </div>

          <div className="admin-actions">
            <button className="admin-button admin-button--primary" type="button">Save role change</button>
            <button className="admin-button" type="button">Cancel</button>
          </div>
        </div>
      </section>

      <section className="admin-panel">
        <h2 className="admin-panel__title">Recent account activity</h2>

        <div className="admin-list">
          {[
            { time: '10:20 AM', title: 'Owner account approved', note: 'Ella Reyes · Hiraya Family Farm' },
            { time: '9:45 AM', title: 'Account suspended', note: 'Rosario Bautista · unpaid permit documents' },
            { time: 'Yesterday', title: 'Administrator added', note: 'Marisol Tan · approval rights' },
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
