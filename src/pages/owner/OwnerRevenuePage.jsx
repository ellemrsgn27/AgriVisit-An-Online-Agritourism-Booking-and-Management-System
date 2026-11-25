import { useState } from 'react';
import OwnerLayout from '../../components/OwnerLayout.jsx';
import Icon from '../../components/Icon.jsx';
import { monthlyIncome, peso } from '../../services/agriData.js';

const weekly = [
  { week: 'W1', height: 62 },
  { week: 'W2', height: 48 },
  { week: 'W3', height: 74 },
  { week: 'W4', height: 56 },
  { week: 'W5', height: 88 },
  { week: 'W6', height: 96 },
];

const bestSelling = [
  { name: 'Orchard walk & calamansi picking', amount: 23400 },
  { name: 'Farm-to-table breakfast', amount: 11340 },
  { name: 'Seedling workshop', amount: 3660 },
];

export default function OwnerRevenuePage() {
  const max = Math.max(...monthlyIncome.map((m) => m.amount));
  const [expenses, setExpenses] = useState([]);
  const [expense, setExpense] = useState({ name: '', amount: '' });

  return (
    <OwnerLayout title="Revenue dashboard">
      <div className="console-heading">
        <div>
          <h1 className="console-heading__title">Revenue dashboard</h1>
          <p className="console-heading__text">
            What you earned, what it cost, and which experiences guests choose.
          </p>
        </div>
        <div className="console-heading__actions console-heading__actions--nowrap">
          <div className="input input--select console-range">
            <select className="input__control" id="revenue-range" defaultValue="Last 30 days">
              <option>Last 30 days</option>
              <option>This quarter</option>
              <option>This year</option>
            </select>
            <Icon name="chevron" className="input__icon" />
          </div>
          <button className="button button--ghost" type="button">Export report</button>
        </div>
      </div>

      <div className="stat-grid">
        <article className="stat-card">
          <p className="stat-card__label">Gross income</p>
          <p className="stat-card__value">{peso(38400)}</p>
          <p className="stat-card__note">Up 12% from last month</p>
        </article>
        <article className="stat-card">
          <p className="stat-card__label">Recorded costs</p>
          <p className="stat-card__value">{peso(9150)}</p>
          <p className="stat-card__note">Seeds, snacks, transport</p>
        </article>
        <article className="stat-card">
          <p className="stat-card__label">Net income</p>
          <p className="stat-card__value">{peso(29250)}</p>
          <p className="stat-card__note">76% of gross</p>
        </article>
        <article className="stat-card">
          <p className="stat-card__label">Guests hosted</p>
          <p className="stat-card__value">64</p>
          <p className="stat-card__note">19 bookings completed</p>
        </article>
      </div>

      <div className="console-columns console-columns--wide">
        <article className="console-card">
          <h2 className="console-card__title">Income by week</h2>
          <div className="chart" role="img" aria-label="Weekly income for the last six weeks">
            {weekly.map((w) => (
              <div key={w.week} className="chart-bar">
                <span style={{ '--bar-height': `${w.height}%` }}></span>
                <p>{w.week}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="console-card">
          <h2 className="console-card__title">Best-selling experiences</h2>
          <ul className="rank-list">
            {bestSelling.map((b, i) => (
              <li key={b.name}>
                <span className="rank-list__index">{i + 1}</span>
                <span className="rank-list__name">{b.name}</span>
                <span className="rank-list__value">{peso(b.amount)}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="revenue-bottom-grid">
      <article className="console-card">
        <h2 className="console-card__title">Bookings and income by month</h2>
        <div className="chart chart--monthly" role="img" aria-label="Monthly income from July to November">
          {monthlyIncome.map((m) => (
            <div key={m.month} className="chart-bar">
              <span style={{ '--bar-height': `${Math.round((m.amount / max) * 100)}%` }}></span>
              <p>{m.month}</p>
            </div>
          ))}
        </div>
      </article>
      <form className="console-card expense-form" onSubmit={(event) => { event.preventDefault(); if (!expense.name || !expense.amount) return; setExpenses((list) => [{ ...expense, id: Date.now() }, ...list]); setExpense({ name: '', amount: '' }); }}>
        <h2 className="console-card__title">Record an expense</h2>
        <label className="form-field__label" htmlFor="expense-name">Expense</label>
        <input id="expense-name" type="text" value={expense.name} onChange={(event) => setExpense((item) => ({ ...item, name: event.target.value }))} placeholder="e.g. Orchard supplies" required />
        <label className="form-field__label" htmlFor="expense-amount">Amount (₱)</label>
        <input id="expense-amount" type="number" min="1" value={expense.amount} onChange={(event) => setExpense((item) => ({ ...item, amount: event.target.value }))} placeholder="0" required />
        <button className="button button--primary" type="submit">Save expense</button>
        {expenses.map((item) => <p className="expense-form__saved" key={item.id}>{item.name} · {peso(Number(item.amount))}</p>)}
      </form>
      </div>
    </OwnerLayout>
  );
}
