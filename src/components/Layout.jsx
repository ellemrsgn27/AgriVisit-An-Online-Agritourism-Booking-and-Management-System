import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from './Icon.jsx';
import '../layout.css';

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <Link className="brand" to="/" aria-label="AgriVisit home">
            <Icon className="brand__mark" name="sprout" />
            <span className="brand__wordmark">AgriVisit</span>
          </Link>

          <nav
            className={`primary-navigation${open ? ' is-open' : ''}`}
            aria-label="Primary"
            id="primary-navigation"
          >
            <NavLink className="primary-navigation__link" to="/" end onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink
              className="primary-navigation__link"
              to="/discovery"
              onClick={() => setOpen(false)}
            >
              Explore farms
            </NavLink>
            <NavLink
              className="primary-navigation__link"
              to="/experiences"
              onClick={() => setOpen(false)}
            >
              Experiences
            </NavLink>
            <NavLink className="primary-navigation__link" to="/story" onClick={() => setOpen(false)}>
              Our story
            </NavLink>
            <NavLink className="primary-navigation__link" to="/bookings" onClick={() => setOpen(false)}>
              My bookings
            </NavLink>

            <div className="account-actions">
              <Link className="account-actions__host" to="/register/owner" onClick={() => setOpen(false)}>
                Register your farm
              </Link>
              <span className="account-actions__divider" aria-hidden="true"></span>
              <Link className="account-actions__link" to="/login" onClick={() => setOpen(false)}>
                Log in
              </Link>
              <Link className="visitor-avatar" to="/register/tourist" aria-label="Create an account">
                AM
              </Link>
            </div>
          </nav>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="primary-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name="menu" />
          </button>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <p>AgriVisit — booking and management for local farm experiences.</p>
        </div>
      </footer>
    </>
  );
}
