import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

export default function PendingApprovalPage() {
  return (
    <Layout>
      <section className="pending">
        <h1>Your farm is pending approval</h1>
        <p>An administrator will review your registration. We will tell you once your farm is approved.</p>
        <Link to="/">Back to home</Link>
      </section>
    </Layout>
  );
}
