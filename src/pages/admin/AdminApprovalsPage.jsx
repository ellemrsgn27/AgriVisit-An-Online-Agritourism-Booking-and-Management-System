import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout.jsx';
import Icon from '../../components/Icon.jsx';
import { approvals, applicant } from '../../services/agriData.js';

const columns = { gridTemplateColumns: '1.2fr 1fr 0.8fr 1fr' };

export default function AdminApprovalsPage() {
  const [selected, setSelected] = useState(applicant.farm);
  const [note, setNote] = useState('Approved after document check.');

  return (
    <AdminLayout title="Farm approvals" crumb="Administration / Farm approvals">
      <section className="admin-intro">
        <div className="admin-intro__copy">
          <p className="admin-eyebrow">Administration / Farm approvals</p>
          <p>
            Review farm registrations, check documents and publish approved farms. Every decision records
            the administrator, the date and your note.
          </p>
        </div>
        <div className="admin-actions">
          <button className="admin-button" type="button">
            <Icon name="history" />
            View decision history
          </button>
        </div>
      </section>

      <section className="admin-metrics" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        <article className="admin-metric">
          <p className="admin-metric__label"><span>Pending registrations</span><Icon name="tractor" /></p>
          <p className="admin-metric__value">4</p>
          <p className="admin-metric__note">2 waiting longer than 5 days</p>
        </article>
        <article className="admin-metric">
          <p className="admin-metric__label"><span>Documents to verify</span><Icon name="shield" /></p>
          <p className="admin-metric__value">7</p>
          <p className="admin-metric__note">Permits and owner IDs</p>
        </article>
        <article className="admin-metric" style={{ background: '#eaf0e4' }}>
          <p className="admin-metric__label"><span>Review process</span></p>
          <p className="admin-note">
            Approve only when farm details, contact information and documents match. Anything missing
            goes back to the owner with a reason.
          </p>
        </article>
      </section>

      <section className="admin-filters">
        <div className="admin-field">
          <label htmlFor="ap-search">Search farm or owner</label>
          <input id="ap-search" type="search" placeholder="Farm name, owner, city" />
        </div>
        <div className="admin-field">
          <label htmlFor="ap-status">Status</label>
          <select id="ap-status" defaultValue="all">
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="missing">Documents missing</option>
            <option value="visit">Visit due</option>
          </select>
        </div>
        <div className="admin-field">
          <label htmlFor="ap-region">Region</label>
          <select id="ap-region" defaultValue="all">
            <option value="all">All regions</option>
            <option value="batangas">Batangas</option>
            <option value="cavite">Cavite</option>
            <option value="laguna">Laguna</option>
            <option value="quezon">Quezon</option>
          </select>
        </div>
        <div className="admin-field">
          <label htmlFor="ap-date">Submitted from</label>
          <input id="ap-date" type="date" />
        </div>
      </section>

      <section className="admin-grid">
        <div className="admin-panel">
          <div className="admin-panel__head">
            <h2 className="admin-panel__title">Registration queue</h2>
            <span className="admin-pill admin-pill--pending">4 pending</span>
          </div>
          <p className="admin-note">Select a registration to review its documents.</p>

          <div className="admin-table">
            <div className="admin-table__head" style={columns}>
              <span>Farm</span>
              <span>Owner</span>
              <span>City</span>
              <span>Status</span>
            </div>
            {approvals.map((row) => (
              <button
                key={row.farm}
                type="button"
                className="admin-table__row"
                style={{ ...columns, border: 0, background: row.farm === selected ? '#f7f6f0' : '#fff', textAlign: 'left', cursor: 'pointer' }}
                onClick={() => setSelected(row.farm)}
              >
                <strong>{row.farm}</strong>
                <span>{row.owner}</span>
                <span>{row.city}</span>
                <span className={`admin-pill admin-pill--${row.statusTone}`}>{row.status}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel__head">
            <h2 className="admin-panel__title">Approval detail</h2>
            <span className="admin-pill admin-pill--pending">Pending</span>
          </div>

          <div>
            <strong>{selected}</strong>
            <p className="admin-note">{applicant.owner} &middot; {applicant.city}</p>
            <p className="admin-note">Submitted {applicant.submitted}</p>
            <p className="admin-note">{applicant.experiences}</p>
          </div>

          <div className="admin-panel__body">
            {applicant.checks.map((check) => (
              <div key={check} className="admin-split-row">
                <Icon name="check" className="admin-callout__icon" />
                <span className="admin-note">{check}</span>
              </div>
            ))}
          </div>

          <div className="admin-field">
            <label htmlFor="ap-note">Decision note</label>
            <textarea id="ap-note" rows="3" value={note} onChange={(event) => setNote(event.target.value)} />
          </div>

          <div className="admin-actions">
            <button className="admin-button admin-button--primary" type="button">
              <Icon name="check" />
              Approve farm
            </button>
            <button className="admin-button" type="button">Request changes</button>
            <button className="admin-button" type="button" style={{ color: '#a84c3e' }}>
              Reject registration
            </button>
          </div>

          <div className="admin-callout">
            <Icon name="info" />
            <div>
              Approve to publish this farm profile and enable experience creation. This action is recorded
              with Jules Reyes, the date and your decision note.
            </div>
          </div>
        </div>
      </section>

      <p className="admin-note">
        Illustrative registration data &middot; 12 Nov 2026. Selecting an action requires confirmation before
        the application changes state.
      </p>
    </AdminLayout>
  );
}
