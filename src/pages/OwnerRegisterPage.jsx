import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import '../register.css';

export default function OwnerRegisterPage() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate('/pending');
  }

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
            <p className="reg-panel__eyebrow">Farm owner registration</p>
            <h1 className="reg-panel__heading">Register your farm</h1>
            <p className="reg-panel__text">
              Create an owner account and submit your farm documents for verification.
            </p>

            <div className="reg-role-cards">
              <Link className="reg-role-card" to="/register/tourist">
                Tourist →
              </Link>
              <button type="button" className="reg-role-card is-selected" aria-pressed="true">
                Farm owner · Selected
              </button>
            </div>

            <form className="reg-form" onSubmit={handleSubmit}>
              <h2 className="reg-section-title">01 · Your account</h2>
              <div className="reg-row">
                <div className="reg-field">
                  <label htmlFor="owner-first">First name</label>
                  <input id="owner-first" type="text" placeholder="Your first name" required />
                </div>
                <div className="reg-field">
                  <label htmlFor="owner-last">Last name</label>
                  <input id="owner-last" type="text" placeholder="Your last name" required />
                </div>
              </div>
              <div className="reg-field">
                <label htmlFor="owner-email">Email address</label>
                <input id="owner-email" type="email" placeholder="owner@example.com" required />
              </div>
              <div className="reg-field">
                <label htmlFor="owner-phone">Mobile number</label>
                <input id="owner-phone" type="tel" placeholder="+63" required />
              </div>
              <div className="reg-row">
                <div className="reg-field">
                  <label htmlFor="owner-password">Password</label>
                  <input id="owner-password" type="password" placeholder="Create a password" minLength={12} required />
                </div>
                <div className="reg-field">
                  <label htmlFor="owner-confirm">Confirm password</label>
                  <input id="owner-confirm" type="password" placeholder="Re-enter password" minLength={12} required />
                </div>
              </div>
              <p className="reg-hint">Use at least 12 characters. Passwords are never shown to administrators.</p>

              <h2 className="reg-section-title">02 · Your farm</h2>
              <div className="reg-field">
                <label htmlFor="farm-name">Farm name</label>
                <input id="farm-name" type="text" placeholder="Your farm's public name" required />
              </div>
              <div className="reg-field">
                <label htmlFor="farm-address">Farm address</label>
                <input id="farm-address" type="text" placeholder="Street / barangay and farm entrance" required />
              </div>
              <div className="reg-row">
                <div className="reg-field">
                  <label htmlFor="farm-city">City / municipality</label>
                  <input id="farm-city" type="text" placeholder="City or municipality" required />
                </div>
                <div className="reg-field">
                  <label htmlFor="farm-province">Province</label>
                  <input id="farm-province" type="text" placeholder="Province" required />
                </div>
              </div>
              <div className="reg-field">
                <label htmlFor="farm-pin">Farm map pin</label>
                <input id="farm-pin" type="text" placeholder="Set your farm entrance location →" readOnly />
              </div>
              <div className="reg-field">
                <label htmlFor="farm-intro">Farm introduction</label>
                <input id="farm-intro" type="text" placeholder="What do you grow, and what can guests experience?" />
              </div>

              <h2 className="reg-section-title">03 · Verification documents</h2>
              <div className="reg-row">
                <div className="reg-doc">
                  <strong>Business permit</strong>
                  <label className="reg-doc__pick">
                    Choose a document →
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" required />
                  </label>
                  <span>PDF, JPG or PNG</span>
                </div>
                <div className="reg-doc">
                  <strong>Owner identification</strong>
                  <label className="reg-doc__pick">
                    Choose a document →
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" required />
                  </label>
                  <span>PDF, JPG or PNG</span>
                </div>
              </div>
              <p className="reg-hint">
                Verification documents are visible only to authorized administrators, never on your public farm page.
              </p>

              <label className="reg-check">
                <input type="checkbox" required />
                <span>I confirm that I am authorized to register this farm and that the information is accurate.</span>
              </label>
              <label className="reg-check">
                <input type="checkbox" required />
                <span>
                  I agree to the <a href="#terms">Terms of service</a> and <a href="#privacy">Privacy policy</a>.
                </span>
              </label>

              <div className="reg-review">
                <strong>Review comes before publication.</strong>
                <p>
                  An administrator reviews the farm details and documents. Only approved farms can publish experiences and
                  accept bookings.
                </p>
              </div>

              <button className="reg-button reg-button--primary" type="submit">
                Create owner account &amp; submit farm →
              </button>
              <Link className="reg-button reg-button--ghost" to="/login">
                Already registered? Log in
              </Link>
            </form>

            <p className="reg-note">You'll receive the decision and any requested changes by email.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
