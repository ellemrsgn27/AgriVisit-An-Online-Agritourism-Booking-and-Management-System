import OwnerLayout from '../../components/OwnerLayout.jsx';
import { monthlyIncome, peso } from '../../data/ownerData.js';

export default function OwnerRevenuePage() {
  const max = Math.max(...monthlyIncome.map((m) => m.amount));
  return (
    <OwnerLayout title="Revenue dashboard">
      <div className="console-heading">
        <div>
          <h1 className="console-heading__title">Revenue dashboard</h1>
          <p className="console-heading__text">Income from your visits, month by month.</p>
        </div>
      </div>

      <article className="console-card">
        <h2 className="console-card__title">Income by month</h2>
        <ul className="rank-list">
          {monthlyIncome.map((m) => (
            <li key={m.month}>
              <span>{m.month}</span>
              <span className="rank-list__name">{Math.round((m.amount / max) * 100)}% of best month</span>
              <span className="rank-list__value">{peso(m.amount)}</span>
            </li>
          ))}
        </ul>
      </article>
    </OwnerLayout>
  );
}
