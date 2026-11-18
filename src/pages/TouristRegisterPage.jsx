import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Icon from '../components/Icon.jsx';

export default function TouristRegisterPage() {
  const [role, setRole] = useState('tourist');

  return (
    <Layout>
      <div className="auth-shell">
        <div className="auth-split">
          <aside className="auth-story">
            <p className="auth-story__eyebrow">Real farms. Real connections.</p>
            <h2 className="auth-story__heading">
              Your next good day
              <br />
              starts here.
            </h2>
            <p className="auth-story__text">
              One account for farm days, QR tickets and the reviews you leave after the visit.
            </p>
            <div className="auth-story__places">
              <span>Batangas</span>
              <span>Cavite</span>
              <span>Laguna</span>
            </div>
          </aside>

          <section className="auth-form-panel">
            <h1 className="auth-form-panel__heading">Create an account</h1>
            <p className="auth-form-panel__text">It takes a minute. Your tickets stay in one place.</p>

            <div className="auth-role-switch" role="tablist" aria-label="Sign up as">
              <button
                type="button"
                role="tab"
                aria-selected={role === 'tourist'}
                className={`auth-role-switch__option${role === 'tourist' ? ' is-active' : ''}`}
                onClick={() => setRole('tourist')}
              >
                <Icon name="sprout" /> Tourist
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={role === 'owner'}
                className={`auth-role-switch__option${role === 'owner' ? ' is-active' : ''}`}
                onClick={() => setRole('owner')}
              >
                <Icon name="leaf-check" /> Farm owner
              </button>
            </div>

            <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-field__label" htmlFor="reg-first">
                    First name
                  </label>
                  <input id="reg-first" type="text" required />
                </div>
                <div className="form-field">
                  <label className="form-field__label" htmlFor="reg-last">
                    Last name
                  </label>
                  <input id="reg-last" type="text" required />
                </div>
              </div>
              <div className="form-field">
                <label className="form-field__label" htmlFor="reg-email">
                  Email address
                </label>
                <input id="reg-email" type="email" required />
              </div>
              <div className="form-field">
                <label className="form-field__label" htmlFor="reg-password">
                  Password
                </label>
                <input id="reg-password" type="password" minLength={8} required />
              </div>
              <button className="button button--primary" type="submit">
                {role === 'tourist' ? 'Create tourist account' : 'Create farm owner account'}
              </button>
            </form>

            <p className="auth-hint">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
            <p className="auth-hint">
              Growing on a farm? <Link to="/register/owner">Register your farm →</Link>
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
