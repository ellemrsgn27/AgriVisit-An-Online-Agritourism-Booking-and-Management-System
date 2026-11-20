import { useState } from 'react';
import OwnerLayout from '../../components/OwnerLayout.jsx';
import Icon from '../../components/Icon.jsx';
import { bookings, peso } from '../../data/ownerData.js';

export default function OwnerQrCheckinPage() {
  const [code, setCode] = useState('');
  const [ticket, setTicket] = useState(null);
  const [note, setNote] = useState('');

  function lookup(e) {
    e.preventDefault();
    setNote('');
    const found = bookings.find((b) => b.ref === code.trim().toUpperCase());
    setTicket(found || null);
    if (!found) setNote('No booking found with that reference.');
  }

  function checkIn() {
    if (ticket.status === 'pending') setNote(`${ticket.name} is not confirmed yet.`);
    else if (ticket.status === 'completed') setNote(`${ticket.name} is already checked in.`);
    else setNote(`${ticket.name} is checked in. Welcome to the farm!`);
  }

  return (
    <OwnerLayout title="QR check-in">
      <div className="console-heading">
        <div>
          <h1 className="console-heading__title">QR check-in</h1>
          <p className="console-heading__text">
            Scan a guest's farm day pass, or type the booking reference at the gate.
          </p>
        </div>
      </div>

      <div className="checkin-layout">
        <div className="scanner-card">
          <p className="scanner-card__title">Scan the QR code</p>
          <div className="scanner-card__viewport" aria-hidden="true">
            <span className="scanner-card__frame"></span>
            <Icon name="scan" className="scanner-card__icon" />
          </div>
          <p className="scanner-card__hint">
            Point the phone at the guest's pass. Keep it steady until the beep.
          </p>
          <button className="button button--ghost scanner-card__button" type="button">
            Open the camera
          </button>
        </div>

        <div className="console-card">
          <h2 className="console-card__title">Or type the booking reference</h2>
          <form onSubmit={lookup}>
            <div className="form-field">
              <label className="form-field__label" htmlFor="checkin-ref">Booking reference</label>
              <div className="input">
                <input
                  className="input__control"
                  id="checkin-ref"
                  type="text"
                  placeholder="AGV-261114-084"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            </div>
            <button className="button button--primary" type="submit">Check this ticket</button>
          </form>

          {ticket && (
            <div className="ticket-result">
              <div className="ticket-result__header">
                <Icon name="check" className="ticket-result__icon" />
                <div>
                  <p className="ticket-result__status">Valid ticket</p>
                  <p className="ticket-result__ref">{ticket.ref}</p>
                </div>
              </div>
              <dl className="booking-summary__lines">
                <div><dt>Guest</dt><dd>{ticket.name}</dd></div>
                <div><dt>Experience</dt><dd>{ticket.experience}</dd></div>
                <div><dt>Session</dt><dd>{ticket.date} &middot; {ticket.time}</dd></div>
                <div><dt>Guests</dt><dd>{ticket.guests} guests</dd></div>
                <div><dt>Paid</dt><dd>{peso(ticket.total)}</dd></div>
              </dl>
              <button className="button button--primary" type="button" onClick={checkIn}>
                Check the group in
              </button>
            </div>
          )}

          {note && <p className="ticket-result__note" role="status">{note}</p>}
        </div>
      </div>
    </OwnerLayout>
  );
}
