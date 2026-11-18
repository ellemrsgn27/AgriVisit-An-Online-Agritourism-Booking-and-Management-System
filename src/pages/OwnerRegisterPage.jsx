import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

export default function OwnerRegisterPage() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate('/pending');
  }

  return (
    <Layout>
      <section className="auth">
        <h1>Register your farm</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-field__label" htmlFor="farm-name">Farm name</label>
            <input id="farm-name" type="text" required />
          </div>
          <div className="form-field">
            <label className="form-field__label" htmlFor="farm-location">Location</label>
            <input id="farm-location" type="text" required />
          </div>
          <div className="form-field">
            <label className="form-field__label" htmlFor="owner-email">Email address</label>
            <input id="owner-email" type="email" required />
          </div>
          <button className="button button--primary" type="submit">Submit for approval</button>
        </form>
      </section>
    </Layout>
  );
}
