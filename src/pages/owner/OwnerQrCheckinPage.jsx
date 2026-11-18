import { useState } from 'react';
import OwnerLayout from '../../components/OwnerLayout.jsx';
import { bookings } from '../../data/ownerData.js';

export default function OwnerQrCheckinPage() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');

  function check(e) {
    e.preventDefault();
    const found = bookings.find((b) => b.ref === code.trim().toUpperCase());
    if (!found) setResult('No booking found with that reference.');
    else if (found.status === 'pending') setResult(`${found.name} is not confirmed yet.`);
    else if (found.status === 'completed') setResult(`${found.name} is already checked in.`);
    else setResult(`${found.name} is confirmed for ${found.guests} guests. Welcome!`);
  }

  return (
    <OwnerLayout title="QR check-in">
      <div className="console-heading">
        <div>
          <h1 className="console-heading__title">QR check-in</h1>
          <p className="console-heading__text">Type or scan a booking reference at the gate.</p>
        </div>
      </div>

      <form className="console-card" onSubmit={check}>
        <div className="form-field">
          <label className="form-field__label" htmlFor="qr-ref">Booking reference</label>
          <div className="input"><input className="input__control" id="qr-ref" type="text" placeholder="AGV-261114-084" value={code} onChange={(e) => setCode(e.target.value)} /></div>
        </div>
        <button className="button button--primary" type="submit">Check guest in</button>
        {result && <p role="status">{result}</p>}
      </form>
    </OwnerLayout>
  );
}
