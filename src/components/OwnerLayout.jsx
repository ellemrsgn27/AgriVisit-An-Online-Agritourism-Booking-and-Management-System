import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { farm } from '../data/ownerData.js';

const menu = [
  { group: 'Farm', items: [
    { to: '/owner/overview', label: 'Overview' },
    { to: '/owner/farm-profile', label: 'Farm profile' },
    { to: '/owner/experiences', label: 'Experiences' },
  ] },
  { group: 'Visits', items: [
    { to: '/owner/bookings', label: 'Bookings' },
    { to: '/owner/qr-checkin', label: 'QR check-in' },
    { to: '/owner/reviews', label: 'Reviews' },
  ] },
  { group: 'Business', items: [
    { to: '/owner/revenue', label: 'Revenue dashboard' },
  ] },
];

export default function OwnerLayout({ title, children }) {
  useEffect(() => {
    document.body.classList.add('is-console');
    return () => document.body.classList.remove('is-console');
  }, []);

  return (
    <section className="console" aria-label="Farm owner workspace">
      <aside className="console-sidebar">
        <NavLink className="brand brand--console" to="/">
          <span className="brand__wordmark">AgriVisit</span>
        </NavLink>

        <nav className="console-navigation" aria-label="Owner workspace">
          {menu.map((group) => (
            <div key={group.group}>
              <p className="console-navigation__group">{group.group}</p>
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `console-navigation__link${isActive ? ' is-active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="console-account">
          <span className="console-account__avatar">MS</span>
          <div>
            <p className="console-account__name">{farm.owner}</p>
            <p className="console-account__role">Farm owner &middot; Lipa</p>
          </div>
          <NavLink className="console-account__exit" to="/login">Log out</NavLink>
        </div>
      </aside>

      <div className="console-main">
        <header className="console-topbar">
          <p className="console-topbar__crumb">
            <span>{title}</span> &middot; {farm.name}
          </p>
          <div className="console-topbar__actions">
            <span className="booking-status booking-status--valid">{farm.status}</span>
          </div>
        </header>

        <div className="console-panel is-active">{children}</div>
      </div>
    </section>
  );
}
