import { useState } from 'react';
import OwnerLayout from '../../components/OwnerLayout.jsx';
import Icon from '../../components/Icon.jsx';
import { bookings as initialBookings, peso } from '../../services/agriData.js';

export default function OwnerQrCheckinPage() {
  const [rows, setRows] = useState(initialBookings);
  const [code, setCode] = useState('AGV-261114-084');
  const [ticket, setTicket] = useState(initialBookings.find((b) => b.ref === 'AGV-261114-084'));
  const [note, setNote] = useState('');
  const recent = rows.filter((b) => b.date === 'Sat, 14 Nov');

  function lookup(event) {
    event.preventDefault();
    setNote('');
    const found = rows.find((b) => b.ref === code.trim().toUpperCase());
    setTicket(found || null);
    if (!found) setNote('No booking found with that reference.');
  }

  function checkIn() {
    if (ticket.status === 'pending') { setNote(`${ticket.name} is not confirmed yet.`); return; }
    if (ticket.status === 'completed') { setNote(`${ticket.name} is already checked in.`); return; }
    setRows((list) => list.map((b) => b.ref === ticket.ref ? { ...b, status: 'completed' } : b));
    setTicket((current) => ({ ...current, status: 'completed' }));
    setNote(`${ticket.name} is checked in. Welcome to the farm!`);
  }

  return (
    <OwnerLayout title="QR check-in">
      <div className="console-heading"><div><h1 className="console-heading__title">QR check-in</h1><p className="console-heading__text">Verify tickets and welcome today's guests at the gate.</p></div></div>

      <div className="gate-station">
        <section className="scanner-card gate-scanner">
          <div><p className="gate-panel__eyebrow">Gate scanner</p><h2 className="console-card__title">Scan the QR code</h2></div>
          <div className="scanner-card__viewport" aria-hidden="true"><span className="scanner-card__frame"></span><Icon name="scan" className="scanner-card__icon" /></div>
          <p className="scanner-card__hint">Point the phone at the guest's pass. Keep it steady until the beep.</p>
          <button className="button button--ghost scanner-card__button" type="button">Open the camera</button>
        </section>

        <section className="console-card gate-ticket-station">
          <div><p className="gate-panel__eyebrow">Gate verification</p><h2 className="console-card__title">Booking reference &amp; ticket preview</h2></div>
          <form className="gate-lookup" onSubmit={lookup}>
            <div className="form-field"><label className="form-field__label" htmlFor="checkin-ref">Booking reference</label><div className="input"><input className="input__control" id="checkin-ref" type="text" placeholder="AGV-261114-084" value={code} onChange={(event) => setCode(event.target.value)} /></div></div>
            <button className="button button--primary" type="submit">Check this ticket</button>
          </form>
          <p className="checkin-reference__hint">Enter the booking ID printed beneath the guest's QR code.</p>
          {note && !ticket && <p className="ticket-result__note" role="status">{note}</p>}
          {ticket && <div className="selected-ticket-preview">
            <div className="selected-ticket-preview__head"><div><p className="gate-panel__eyebrow">Selected ticket preview</p><h3>{ticket.name}</h3><p className="ticket-result__ref">{ticket.ref}</p></div><span className={`booking-status booking-status--${ticket.status === 'completed' ? 'checked-in' : ticket.status === 'pending' ? 'pending' : 'not-checked-in'}`}>{ticket.status === 'completed' ? 'Checked in' : ticket.status === 'pending' ? 'Pending' : 'Valid · Not checked in'}</span></div>
            <dl className="gate-ticket-facts"><div><dt>Group size</dt><dd>{ticket.guests} guests</dd></div><div><dt>Experience &amp; session</dt><dd>{ticket.experience}<br />{ticket.date} · {ticket.time}</dd></div><div><dt>Paid</dt><dd>{peso(ticket.total)}</dd></div></dl>
            <button className="button button--primary selected-ticket-preview__action" type="button" onClick={checkIn} disabled={ticket.status === 'completed'}>{ticket.status === 'completed' ? 'Checked in' : 'Confirm check-in'}</button>
            {note && <p className="ticket-result__note" role="status">{note}</p>}
          </div>}
        </section>
      </div>

      <section className="console-card recent-arrivals-card">
        <div className="recent-arrivals-card__heading"><div><p className="gate-panel__eyebrow">Today · Sat, 14 Nov</p><h2 className="console-card__title">Recent arrivals today</h2></div><span className="booking-status booking-status--valid">{recent.filter((r) => r.status === 'completed').length} checked in</span></div>
        <div className="recent-arrivals-table-wrap"><table className="recent-arrivals-table"><thead><tr><th>Time</th><th>Guest</th><th>Group</th><th>Experience</th><th>Status</th></tr></thead><tbody>{recent.map((arrival) => <tr key={arrival.ref}><td>{arrival.time}</td><td>{arrival.name}</td><td>{arrival.guests}</td><td>{arrival.experience}</td><td><span className={`booking-status booking-status--${arrival.status === 'completed' ? 'checked-in' : arrival.status === 'pending' ? 'pending' : 'not-checked-in'}`}>{arrival.status === 'completed' ? 'Checked in' : arrival.status === 'pending' ? 'Pending' : 'Not checked in'}</span></td></tr>)}</tbody></table></div>
      </section>
    </OwnerLayout>
  );
}
