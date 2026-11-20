import { NavLink } from 'react-router-dom';
import Icon from './Icon.jsx';
import './AdminLayout.css';

const menu = [
  { to: '/admin/overview', label: 'Overview', icon: 'dashboard' },
  { to: '/admin/approvals', label: 'Farm approvals', icon: 'tractor' },
  { to: '/admin/users', label: 'Users & roles', icon: 'users' },
  { to: '/admin/categories', label: 'Categories', icon: 'tags' },
  { to: '/admin/moderation', label: 'Reviews & moderation', icon: 'shield' },
  { to: '/admin/reports', label: 'System reports', icon: 'chart' },
  { to: '/admin/settings', label: 'Settings', icon: 'settings' },
];

export default function AdminLayout({ title, crumb, children }) {
  return (
    <div className="admin">
      <aside className="admin-sidebar">
        <NavLink className="admin-brand" to="/">
          <Icon name="sprout" className="admin-brand__mark" />
          <span>AgriVisit</span>
        </NavLink>

        <div className="admin-identity">
          <p className="admin-identity__eyebrow">Admin console</p>
          <p className="admin-identity__name">AgriVisit platform</p>
          <p className="admin-identity__context">Platform operations</p>
        </div>

        <nav className="admin-nav" aria-label="Administrator console">
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `admin-nav__link${isActive ? ' is-active' : ''}`
              }
            >
              <Icon name={item.icon} className="admin-nav__icon" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-help">
          <p>Platform status: all systems healthy</p>
          <NavLink to="/admin/reports">View activity log ↗</NavLink>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <p className="admin-topbar__crumb">{crumb}</p>
          <div className="admin-topbar__account">
            <NavLink className="admin-topbar__site" to="/">View website ↗</NavLink>
            <span className="admin-topbar__bell" aria-hidden="true">
              <Icon name="bell" />
            </span>
            <span className="admin-avatar">JR</span>
            <span className="admin-topbar__name">Jules Reyes</span>
            <NavLink className="admin-topbar__exit" to="/admin/sign-in">Log out</NavLink>
          </div>
        </header>

        <main className="admin-content">
          <h1 className="admin-page-title">{title}</h1>
          {children}
        </main>
      </div>
    </div>
  );
}
