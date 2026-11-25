import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import '../register.css';

export default function TouristRegisterPage() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!agreed) return;
    navigate('/login');
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
            <p className="reg-panel__eyebrow">Tourist registration</p>
            <h1 className="reg-panel__heading">Create a tourist account</h1>
            <p className="reg-panel__text">
              Book farm visits and manage your QR day passes.
            </p>

            <div className="reg-role-cards">
              <button type="button" className="reg-role-card is-selected" aria-pressed="true">
                Tourist · Selected
              </button>
              <Link className="reg-role-card" to="/register/owner">
                Farm owner →
              </Link>
            </div>

            <form className="reg-form" onSubmit={handleSubmit}>
              <div className="reg-row">
                <div className="reg-field">
                  <label htmlFor="reg-first">First name</label>
                  <input id="reg-first" type="text" placeholder="Your first name" required />
                </div>
                <div className="reg-field">
                  <label htmlFor="reg-last">Last name</label>
                  <input id="reg-last" type="text" placeholder="Your last name" required />
                </div>
              </div>

              <div className="reg-field">
                <label htmlFor="reg-email">Email address</label>
                <input id="reg-email" type="email" placeholder="you@example.com" required />
              </div>

              <div className="reg-field">
                <label htmlFor="reg-phone">Mobile number (optional)</label>
                <input id="reg-phone" type="tel" placeholder="+63" />
              </div>

              <div className="reg-field">
                <label htmlFor="reg-password">Password</label>
                <input id="reg-password" type="password" placeholder="Create a password" minLength={12} required />
                <p className="reg-hint">Use at least 12 characters. Never share your password.</p>
              </div>

              <div className="reg-field">
                <label htmlFor="reg-confirm">Confirm password</label>
                <input id="reg-confirm" type="password" placeholder="Re-enter your password" minLength={12} required />
              </div>

              <label className="reg-check">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required />
                <span>
                  I agree to the <a href="#terms">Terms of service</a> and <a href="#privacy">Privacy policy</a>.
                </span>
              </label>

              <button className="reg-button reg-button--primary" type="submit">
                Create tourist account →
              </button>
              <Link className="reg-button reg-button--ghost" to="/login">
                Already registered? Log in
              </Link>
            </form>
          </section>
        </div>
      </div>
    </Layout>
  );
}
