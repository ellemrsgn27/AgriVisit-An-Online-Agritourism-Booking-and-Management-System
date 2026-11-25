import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

const PRICE = 650;
const FEE = 100;
const BOOKING_ID = 'AGV-261114-084';
const sessionOptions = ['9:00 AM · 8 slots left', '11:00 AM · 4 slots left', '2:00 PM · 6 slots left'];
const paymentOptions = [
  { value: 'gcash', name: 'GCash', note: 'Pay now and your QR is issued immediately.' },
  { value: 'maya', name: 'Maya', note: 'Same-day confirmation after payment.' },
  { value: 'cash', name: 'Pay at the farm', note: 'The host holds your slot until 30 minutes after opening.' },
];

export default function CheckoutPage() {
  const [guests, setGuests] = useState(3);
  const [payment, setPayment] = useState('gcash');
  const navigate = useNavigate();
  const total = guests * PRICE + FEE;

  function step(delta) {
    setGuests((count) => Math.min(8, Math.max(1, count + delta)));
  }

  function confirm(event) {
    event.preventDefault();
    const selectedPayment = paymentOptions.find((option) => option.value === payment);
    navigate('/bookings', {
      state: {
        confirmedBooking: {
          id: BOOKING_ID,
          guests,
          total,
          paymentMethod: selectedPayment.name,
          paymentMethodValue: selectedPayment.value,
        },
      },
    });
  }

  return (
    <Layout>
      <div className="page-shell">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/discovery">Explore farms</Link><span aria-hidden="true">/</span>
          <Link to="/farm">Hiraya Family Farm</Link><span aria-hidden="true">/</span><span>Checkout</span>
        </nav>
        <h1 className="page-introduction__heading" id="checkout-heading">Book your farm day.</h1>

        <form className="checkout-layout" id="checkout-form" onSubmit={confirm} noValidate>
            <div className="checkout-layout__form">
              <section className="checkout-section">
                <h2 className="checkout-section__title">01 · Your visit</h2>
                <div className="form-row">
                  <div className="form-field"><label className="form-field__label" htmlFor="checkout-date">Visit date</label><input className="input__control" id="checkout-date" type="text" defaultValue="Sat, 14 November 2026" /></div>
                  <div className="form-field"><label className="form-field__label" htmlFor="checkout-session">Session</label><select className="input__control" id="checkout-session">{sessionOptions.map((option) => <option key={option}>{option}</option>)}</select></div>
                </div>
                <div className="form-field form-field--guests">
                  <span className="form-field__label">Guests</span>
                  <div className="guest-stepper" id="guest-stepper">
                    <button className="guest-stepper__button" type="button" onClick={() => step(-1)} aria-label="Remove a guest">−</button>
                    <output className="guest-stepper__value" id="guest-count" aria-live="polite">{guests}</output>
                    <button className="guest-stepper__button" type="button" onClick={() => step(1)} aria-label="Add a guest">+</button>
                    <span className="guest-stepper__note">8 slots left for this session</span>
                  </div>
                </div>
              </section>

              <section className="checkout-section">
                <h2 className="checkout-section__title">02 · Who is coming</h2>
                <div className="form-row">
                  <div className="form-field"><label className="form-field__label" htmlFor="checkout-first">First name</label><input className="input__control" id="checkout-first" type="text" defaultValue="Andrea" /></div>
                  <div className="form-field"><label className="form-field__label" htmlFor="checkout-last">Last name</label><input className="input__control" id="checkout-last" type="text" defaultValue="Mendoza" /></div>
                </div>
                <div className="form-field"><label className="form-field__label" htmlFor="checkout-email">Email address</label><input className="input__control" id="checkout-email" type="email" defaultValue="andrea@example.com" /></div>
                <div className="form-field"><label className="form-field__label" htmlFor="checkout-phone">Mobile number</label><input className="input__control" id="checkout-phone" type="tel" defaultValue="+63 917 000 0000" /></div>
              </section>

              <section className="checkout-section">
                <h2 className="checkout-section__title">03 · Payment</h2>
                {paymentOptions.map((option) => <label className={`payment-option${payment === option.value ? ' is-selected' : ''}`} key={option.value}>
                  <input type="radio" name="payment" value={option.value} checked={payment === option.value} onChange={() => setPayment(option.value)} />
                  <span className="payment-option__body"><span className="payment-option__name">{option.name}</span><span className="payment-option__note">{option.note}</span></span>
                </label>)}
              </section>
            </div>

            <aside className="checkout-layout__summary">
              <div className="booking-summary">
                <p className="booking-summary__label">Your farm day</p>
                <div className="booking-summary__farm"><div><p className="booking-summary__name">Hiraya Family Farm</p><p className="booking-summary__note">Orchard walk &amp; calamansi picking</p></div></div>
                <dl className="booking-summary__lines">
                  <div><dt>Date</dt><dd>Sat, 14 Nov 2026</dd></div><div><dt>Time</dt><dd>9:00 – 11:00 AM</dd></div>
                  <div><dt>Guests</dt><dd>{guests} adults</dd></div><div><dt>Price per guest</dt><dd>₱{PRICE}</dd></div>
                  <div><dt>Booking fee</dt><dd>₱{FEE}</dd></div>
                </dl>
                <div className="booking-summary__total-row"><p>Total</p><p>₱{total.toLocaleString('en-PH')}</p></div>
                <button className="button button--primary booking-summary__cta" type="submit">Confirm booking</button>
                <p className="booking-summary__note">Free cancellation until 12 Nov, 9:00 AM.</p>
              </div>
            </aside>
        </form>
      </div>
    </Layout>
  );
}
