import AdminLayout from '../../components/AdminLayout.jsx';
import Icon from '../../components/Icon.jsx';
import { metrics, bookingBars, activity, approvals, applicant } from '../../services/agriData.js';

export default function AdminOverviewPage() {
  return (
    <AdminLayout title="Platform overview" crumb="Administration / Overview">
      <section className="admin-intro">
        <div className="admin-intro__copy">
          <p className="admin-eyebrow">Administration / Overview</p>
          <p>
            Platform health, approvals and bookings in one place. Figures exclude cancelled and refunded bookings.
          </p>
        </div>
        <div className="admin-actions">
          <button className="admin-button admin-button--primary" type="button">
            <Icon name="download" />
            Download report
          </button>
        </div>
      </section>

      <section className="admin-metrics">
        {metrics.map((metric) => (
          <article key={metric.label} className="admin-metric">
            <p className="admin-metric__label">
              <span>{metric.label}</span>
              <Icon name={metric.icon} />
            </p>
            <p className="admin-metric__value">{metric.value}</p>
            <p className="admin-metric__note">{metric.note}</p>
          </article>
        ))}
      </section>

      <section className="admin-grid">
        <div className="admin-panel">
          <div className="admin-panel__head">
            <h2 className="admin-panel__title">Booking value by month</h2>
            <span className="admin-pill admin-pill--valid">System report</span>
          </div>
          <p className="admin-note">Monthly booking value across all approved farms.</p>
          <div className="admin-bars">
            {bookingBars.map((bar) => (
              <div key={bar.label} className="admin-bars__col">
                <span className="admin-bars__value">{bar.amount}</span>
                <span className="admin-bars__bar" style={{ height: `${bar.value}%` }} />
                <span className="admin-bars__label">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel__head">
            <h2 className="admin-panel__title">Recent activity</h2>
            <span className="admin-pill admin-pill--muted">Today</span>
          </div>

          <div className="admin-panel__body">
            {activity.map((event) => (
              <div key={event.title} className="admin-split-row">
                <span className="admin-pill admin-pill--muted">{event.time}</span>
                <div>
                  <strong>{event.title}</strong>
                  <p className="admin-note">{event.note}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="admin-note">Every administrative action records the account, time and decision.</p>
        </div>
      </section>

      <section className="admin-grid">
        <div className="admin-panel">
          <div className="admin-panel__head">
            <h2 className="admin-panel__title">Registrations waiting for approval</h2>
            <span className="admin-pill admin-pill--pending">4 pending</span>
          </div>

          <div className="admin-table">
            <div className="admin-table__head" style={{ gridTemplateColumns: '1.2fr 1fr 0.8fr 1fr' }}>
              <span>Farm</span>
              <span>Owner</span>
              <span>City</span>
              <span>Status</span>
            </div>
            {approvals.map((row) => (
              <div
                key={row.farm}
                className="admin-table__row"
                style={{ gridTemplateColumns: '1.2fr 1fr 0.8fr 1fr' }}
              >
                <strong>{row.farm}</strong>
                <span>{row.owner}</span>
                <span>{row.city}</span>
                <span className={`admin-pill admin-pill--${row.statusTone}`}>{row.status}</span>
              </div>
            ))}
          </div>

          <p className="admin-note">
            Approving publishes the farm profile and enables experience creation.
          </p>
        </div>

        <div className="admin-panel">
          <div className="admin-panel__head">
            <h2 className="admin-panel__title">Latest application</h2>
            <span className="admin-pill admin-pill--pending">Pending</span>
          </div>

          <div>
            <strong>{applicant.farm}</strong>
            <p className="admin-note">
              {applicant.owner} &middot; {applicant.city}
            </p>
            <p className="admin-note">Submitted {applicant.submitted}</p>
          </div>

          <div className="admin-panel__body">
            {applicant.checks.map((check) => (
              <div key={check} className="admin-split-row">
                <Icon name="check" className="admin-callout__icon" />
                <span className="admin-note">{check}</span>
              </div>
            ))}
          </div>

          <div className="admin-actions">
            <button className="admin-button admin-button--primary" type="button">
              <Icon name="check" />
              Approve farm
            </button>
            <button className="admin-button" type="button">Request changes</button>
          </div>

          <p className="admin-note">
            Approval publishes the farm profile and enables experience creation. The owner receives an email.
          </p>
        </div>
      </section>

      <p className="admin-note">
        System report generated 12 Nov 2026, 9:45 AM &middot; Figures exclude cancelled and refunded bookings.
      </p>
    </AdminLayout>
  );
}
