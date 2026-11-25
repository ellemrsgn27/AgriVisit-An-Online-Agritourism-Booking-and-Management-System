import AdminLayout from '../../components/AdminLayout.jsx';
import Icon from '../../components/Icon.jsx';

const sections = [
  {
    title: 'Role & access administration',
    rows: [
      { label: 'Role-based access controls', value: 'Enabled' },
      { label: 'Administrator grant approvals', value: 'Required' },
      { label: 'Role changes require a reason', value: 'Required' },
      { label: 'Access review cycle', value: 'Every 6 months' },
    ],
  },
  {
    title: 'Booking & slot rules',
    rows: [
      { label: 'Tourist booking window', value: '90 days' },
      { label: 'Free cancellation window', value: '48 hours' },
      { label: 'Cancellation request rules', value: 'Owner approval' },
      { label: 'Owner payout schedule', value: 'Weekly, every Monday' },
    ],
  },
  {
    title: 'QR ticket validation',
    rows: [
      { label: 'Gate check-in window', value: '1 hour before session' },
      { label: 'Duplicate scan handling', value: 'Blocked with warning' },
      { label: 'Manual code fallback', value: 'Enabled for owners' },
    ],
  },
  {
    title: 'Reviews & moderation',
    rows: [
      { label: 'Review visibility', value: 'After a verified visit' },
      { label: 'Flag threshold', value: '2 reports' },
      { label: 'Owner replies to reviews', value: 'Enabled' },
      { label: 'Reviewer identity', value: 'First name and initial' },
    ],
  },
  {
    title: 'Security & session policy',
    rows: [
      { label: 'Administrator session timeout', value: '30 minutes' },
      { label: 'Role change confirmation', value: 'Requires platform lead' },
    ],
  },
];

export default function AdminSettingsPage() {
  return (
    <AdminLayout title="Platform settings and policies" crumb="Administration / Settings">
      <section className="admin-intro">
        <div className="admin-intro__copy">
          <p className="admin-eyebrow">Administration / Settings</p>
        </div>
        <div className="admin-actions">
          <button className="admin-button" type="button">Export settings</button>
        </div>
      </section>

      <section className="admin-grid">
        <div className="admin-panel">
          {sections.slice(0, 3).map((section) => (
            <div key={section.title} className="admin-panel__body">
              <h2 className="admin-panel__title" style={{ fontSize: 18 }}>{section.title}</h2>
              {section.rows.map((row) => (
                <div
                  key={row.label}
                  className="admin-list__row"
                  style={{ borderTop: '1px solid #e1e4da', borderBottom: 0, paddingInline: 0 }}
                >
                  <div style={{ flex: 1 }}>
                    <strong>{row.label}</strong>
                  </div>
                  <span className="admin-pill admin-pill--valid">{row.value}</span>
                  <span className="admin-table__action">Edit</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="admin-panel">
          <h2 className="admin-panel__title" style={{ fontSize: 20 }}>Your administrator account</h2>

          <div>
            <strong>Jules Reyes</strong>
            <p className="admin-note">Administrator · Platform operations</p>
          </div>

          <div className="admin-field">
            <label htmlFor="st-email">Email address</label>
            <input id="st-email" type="email" defaultValue="jules@agrivisit.ph" />
          </div>

          <div className="admin-field">
            <label htmlFor="st-password">Password</label>
            <input id="st-password" type="password" placeholder="Enter a new password" autoComplete="new-password" />
          </div>

          <p className="admin-note">
            Password changes end other active sessions.
          </p>

          <h2 className="admin-panel__title" style={{ fontSize: 20 }}>Recent activity</h2>

          <div className="admin-list">
            {[
              { time: '09:45', title: 'System report generated', note: 'Monthly booking value' },
              { time: '09:12', title: 'Farm approval granted', note: 'Hiraya Family Farm' },
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

          <div className="admin-actions">
            <button className="admin-button" type="button">Discard</button>
            <button className="admin-button admin-button--primary" type="button">Save changes</button>
          </div>
        </div>
      </section>

      <section className="admin-grid">
        <div className="admin-panel">
          {sections.slice(3).map((section) => (
            <div key={section.title} className="admin-panel__body">
              <h2 className="admin-panel__title" style={{ fontSize: 18 }}>{section.title}</h2>
              {section.rows.map((row) => (
                <div
                  key={row.label}
                  className="admin-list__row"
                  style={{ borderTop: '1px solid #e1e4da', borderBottom: 0, paddingInline: 0 }}
                >
                  <div style={{ flex: 1 }}>
                    <strong>{row.label}</strong>
                  </div>
                  <span className="admin-pill admin-pill--valid">{row.value}</span>
                  <span className="admin-table__action">Edit</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="admin-panel">
          <h2 className="admin-panel__title" style={{ fontSize: 20 }}>Before you save</h2>

          <div className="admin-field">
            <label htmlFor="st-reason">Change reason</label>
            <input id="st-reason" type="text" placeholder="Short note for the activity log" />
          </div>

          <div className="admin-field">
            <label htmlFor="st-effective">Change to take effect</label>
            <input id="st-effective" type="date" />
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}
