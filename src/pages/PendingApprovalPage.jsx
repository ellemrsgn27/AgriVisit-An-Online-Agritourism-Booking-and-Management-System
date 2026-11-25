import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import '../register.css';

export default function PendingApprovalPage() {
  return (
    <Layout>
      <div className="reg-shell">
        <div className="reg-split">
          <aside className="reg-story">
            <img
              className="reg-story__photo"
              src="/images/story/farm-landscape.jpg"
              alt=""
              aria-hidden="true"
            />
            <span className="reg-badge">Good days grow here</span>
            <div className="reg-story__body">
              <p className="reg-story__eyebrow">Real farms · Real connections</p>
              <h2 className="reg-story__heading">
                Discover &amp; manage local farm visits.
              </h2>
              <p className="reg-story__text">
                Connect directly with verified farms and manage your bookings in one place.
              </p>
            </div>
          </aside>

          <section className="reg-panel">
            <p className="reg-panel__eyebrow">Farm registration · Under review</p>
            <h1 className="reg-panel__heading">Your next chapter is taking root.</h1>
            <p className="reg-panel__text">
              Your owner account is created and your farm registration has been received. An administrator must approve
              your farm before it goes public.
            </p>

            <div className="reg-pending-card">
              <p className="reg-pending-card__status">Pending administrator approval</p>
              <h2 className="reg-pending-card__name">Amihan Terra</h2>
              <p>FARM-0267 · Submitted 10 November 2026</p>
              <p>Ella Reyes · Los Baños, Laguna</p>
              <p>Decision updates: ella@amihanterra.ph</p>
            </div>

            <div className="reg-step">
              <h3>01 · Submission received</h3>
              <p>Farm details, contact information and verification documents are ready for review.</p>
            </div>
            <div className="reg-step is-current">
              <h3>02 · Administrator review · Current step</h3>
              <p>An administrator checks your registration and may request corrections or more information.</p>
            </div>
            <div className="reg-step">
              <h3>03 · Approval &amp; publication · Not yet available</h3>
              <p>Once approved, your farm joins discovery and you can create experiences and open sessions.</p>
            </div>

            <h3 className="reg-section-title">Your farm is not public yet.</h3>
            <p className="reg-panel__text">
              Experience publishing and accepting bookings stay unavailable while approval is pending. You can review your
              submitted details and respond to administrator requests.
            </p>
            <p className="reg-hint">
              If changes are requested, the decision notice will explain what to update. Verification documents remain
              restricted to administrators.
            </p>

            <button className="reg-button reg-button--primary" type="button">
              Review submitted details →
            </button>
            <Link className="reg-button reg-button--ghost" to="/login">
              Return to log in
            </Link>
            <p className="reg-note">Example submission · No approval decision has been recorded.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
