import AdminLayout from '../../components/AdminLayout.jsx';
import Icon from '../../components/Icon.jsx';
import { reportBars, topFarms, cancellations } from '../../services/agriData.js';

export default function AdminReportsPage() {
  return (
    <AdminLayout title="System reports" crumb="Administration / System reports">
      <section className="admin-intro">
        <div className="admin-intro__copy">
          <p className="admin-eyebrow">Administration / System reports</p>
        </div>
        <div className="admin-actions">
          <button className="admin-button admin-button--primary" type="button">
            <Icon name="download" />
            Export report
          </button>
        </div>
      </section>

      <section className="admin-filters">
        <div className="admin-field">
          <label htmlFor="rp-period">Period</label>
          <select id="rp-period" defaultValue="year">
            <option value="year">This year</option>
            <option value="half">Last 6 months</option>
            <option value="quarter">This quarter</option>
          </select>
        </div>
        <div className="admin-field">
          <label htmlFor="rp-category">Category</label>
          <select id="rp-category" defaultValue="all">
            <option value="all">All categories</option>
            <option value="tours">Farm tours</option>
            <option value="picking">Fruit picking</option>
            <option value="workshops">Workshops</option>
          </select>
        </div>
        <button className="admin-button" type="button">Apply</button>
      </section>

      <section className="admin-metrics">
        <article className="admin-metric">
          <p className="admin-metric__label"><span>Total bookings</span><Icon name="calendar" /></p>
          <p className="admin-metric__value">1,842</p>
          <p className="admin-metric__note">Up 12% from last period</p>
        </article>
        <article className="admin-metric">
          <p className="admin-metric__label"><span>Booking value</span><Icon name="chart" /></p>
          <p className="admin-metric__value">PHP 1.24M</p>
          <p className="admin-metric__note">Gross, before refunds</p>
        </article>
        <article className="admin-metric">
          <p className="admin-metric__label"><span>Average stay value</span><Icon name="ticket" /></p>
          <p className="admin-metric__value">PHP 674</p>
          <p className="admin-metric__note">Per confirmed booking</p>
        </article>
        <article className="admin-metric">
          <p className="admin-metric__label"><span>Cancellations</span><Icon name="info" /></p>
          <p className="admin-metric__value">37</p>
          <p className="admin-metric__note">2% of all bookings</p>
        </article>
      </section>

      <section className="admin-grid">
        <div className="admin-panel">
          <h2 className="admin-panel__title">Booking value by month</h2>
          <div className="admin-bars">
            {reportBars.map((bar) => (
              <div key={bar.label} className="admin-bars__col">
                <span className="admin-bars__value">{bar.amount}</span>
                <span className="admin-bars__track">
                  <span className="admin-bars__bar" style={{ height: `${bar.value}%` }} />
                </span>
                <span className="admin-bars__label">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-panel">
          <h2 className="admin-panel__title">Top performing farms</h2>

          <div className="admin-list">
            {topFarms.map((farm) => (
              <div key={farm.farm} className="admin-list__row">
                <div style={{ flex: 1 }}>
                  <strong>{farm.farm}</strong>
                  <small>{farm.bookings} bookings</small>
                </div>
                <span className="admin-note">{farm.value}</span>
              </div>
            ))}
          </div>

          <button className="admin-button" type="button">View all farms</button>
        </div>
      </section>

      <section className="admin-grid">
        <div className="admin-panel">
          <h2 className="admin-panel__title">Cancellations and refunds</h2>

          <div className="admin-table">
            <div className="admin-table__head" style={{ gridTemplateColumns: '1.6fr 0.5fr 0.5fr' }}>
              <span>Reason</span>
              <span>Count</span>
              <span>Share</span>
            </div>
            {cancellations.map((row) => (
              <div key={row.reason} className="admin-table__row" style={{ gridTemplateColumns: '1.6fr 0.5fr 0.5fr' }}>
                <span>{row.reason}</span>
                <strong>{row.count}</strong>
                <span>{row.share}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-panel">
          <h2 className="admin-panel__title">Report scope</h2>
          <span className="admin-pill admin-pill--valid">Figures verified</span>
          <p className="admin-note">
            Approved farms with at least one confirmed booking in the selected period.
          </p>

          <button className="admin-button admin-button--primary" type="button">
            <Icon name="download" />
            Download monthly summary
          </button>
        </div>
      </section>
    </AdminLayout>
  );
}
