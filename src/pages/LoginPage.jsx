import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Icon from '../components/Icon.jsx';

export default function LoginPage() {
  const [role, setRole] = useState('tourist');

  return (
    <Layout>
      <div className="auth-shell">
        <div className="auth-split">
          <aside className="auth-story">
            <img
              className="auth-story__photo"
              src="/images/story/farm-landscape.jpg"
              alt=""
              aria-hidden="true"
            />
            <div className="auth-story__content">
              <p className="auth-story__eyebrow">Real farms · Real connections</p>
              <h2 className="auth-story__heading">
                Discover &amp; manage local farm visits.
              </h2>
              <p className="auth-story__text">
                Connect directly with verified farms and manage your bookings in one place.
              </p>
            </div>
          </aside>

          <section className="auth-form-panel">
            <h1 className="auth-form-panel__heading">Welcome back.</h1>
            <p className="auth-form-panel__text">Log in to pick up where you left off.</p>

            <div className="auth-role-switch" role="tablist" aria-label="Log in as">
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
              <div className="form-field">
                <label className="form-field__label" htmlFor="login-email">
                  Email address
                </label>
                <input id="login-email" type="email" required />
              </div>
              <div className="form-field">
                <label className="form-field__label" htmlFor="login-password">
                  Password
                </label>
                <input id="login-password" type="password" required />
              </div>
              <button className="button button--primary" type="submit">
                {role === 'tourist' ? 'Log in as tourist' : 'Log in as farm owner'}
              </button>
            </form>

            <p className="auth-hint">
              New to AgriVisit? <Link to="/register/tourist">Create an account</Link>
            </p>
            <p className="auth-hint">
              Want to host? <Link to="/register/owner">Register your farm →</Link>
            </p>

            {role === 'owner' && (
              <Link className="owner-home-link" to="/owner/overview">
                Preview the farm owner workspace →
              </Link>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
}
