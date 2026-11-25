import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../../components/Icon.jsx';
import '../../components/AdminLayout.css';
import './AdminSignIn.css';

export default function AdminSignInPage() {
  const [note, setNote] = useState('');

  return (
    <div className="admin-signin">
      <header className="admin-signin__top">
        <NavLink className="admin-brand admin-brand--light" to="/">
          <Icon name="sprout" className="admin-brand__mark" />
          <span>AgriVisit</span>
        </NavLink>
      </header>

      <div className="admin-signin__body">
        <aside className="admin-signin__photo">
          <img src="/images/admin/countryside.jpg" alt="" />
          <span className="admin-signin__badge">
            <Icon name="sprout" />
            Good days grow here
          </span>
          <div className="admin-signin__story">
            <p className="admin-signin__eyebrow">Real farms. Real connections.</p>
            <h1>A growing community, well cared for.</h1>
            <p>For the people who help every farm and every visitor find their place.</p>
          </div>
        </aside>

        <div className="admin-signin__form">
          <p className="admin-eyebrow">AgriVisit &middot; Administrator access</p>
          <h2>Keep the community growing well.</h2>
          <p className="admin-note">Sign in with an account that has already been granted administrator access.</p>

          <div className="admin-callout">
            <Icon name="info" />
            <div>
              <strong>Authorized administrators only</strong>
              <p>
                This sign-in does not create an administrator account. Access is assigned by an authorized
                administrator through Users &amp; roles.
              </p>
            </div>
          </div>

          <form
            className="admin-signin__fields"
            onSubmit={(event) => {
              event.preventDefault();
              setNote('Demo sign-in. Access is assigned through Users & roles.');
            }}
          >
            <div className="admin-field">
              <label htmlFor="admin-email">Administrator email</label>
              <input id="admin-email" type="email" placeholder="you@agrivisit.ph" />
            </div>
            <div className="admin-field">
              <label htmlFor="admin-password">Password</label>
              <input id="admin-password" type="password" placeholder="Enter your password" />
            </div>

            <button className="admin-button admin-button--primary" type="submit">
              Sign in to administrator console &rarr;
            </button>
          </form>

          {note ? <p className="admin-note">{note}</p> : null}

          <p className="admin-note">
            Administrative actions are recorded in the activity log. Sessions follow the administrator
            inactivity policy. Never use a shared account or share your password.
          </p>
          <p className="admin-note">Need administrative access? Contact an existing platform administrator.</p>
        </div>
      </div>

      <footer className="admin-signin__footer">
        <p>&copy; 2026 AgriVisit. Growing good things, together.</p>
        <div>
          <span>Privacy policy</span>
          <span>Terms of service</span>
        </div>
      </footer>
    </div>
  );
}
