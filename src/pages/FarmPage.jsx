import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

const sessions = [
  {
    id: 'orchard',
    name: 'Orchard walk & calamansi picking',
    meta: '2 hours · Sat, 14 Nov 2026 · 9:00 AM',
    text: 'A slow walk through the orchard with kuya Ramon, then pick your own basket. Juice and a small snack after.',
    price: 650,
    slots: 8,
    total: 12,
  },
  {
    id: 'breakfast',
    name: 'Farm-to-table breakfast',
    meta: '90 minutes · Sun, 15 Nov 2026 · 7:30 AM',
    text: 'Longganisa, eggs, and greens picked that morning, served under the bamboo hut.',
    price: 420,
    slots: 5,
    total: 10,
  },
];

const reviews = [
  {
    name: 'Andrea M.',
    rating: '5.0',
    date: '24 Oct 2026',
    text: 'Kuya Ramon let the kids pick as much as they wanted and taught them how to tell a ripe fruit. We left with two baskets and a new habit.',
  },
  {
    name: 'Jomar D.',
    rating: '4.8',
    date: '8 Oct 2026',
    text: 'Easy check-in with the QR at the gate. The orchard is steep in places, so wear proper shoes.',
  },
];

export default function FarmPage() {
  return (
    <Layout>
      <div className="page-shell">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/discovery">Explore farms</Link>
          <span aria-hidden="true">/</span>
          <span>Hiraya Family Farm</span>
        </nav>

        <section className="farm-hero">
          <img
            className="farm-hero__photo"
            src="/images/story/farm-landscape.jpg"
            alt="Vegetable rows at Hiraya Family Farm"
            width="760"
            height="420"
          />
          <div className="farm-hero__summary">
            <p className="farm-hero__tags">
              <span className="booking-status booking-status--valid">Verified farm</span>
              <span className="farm-hero__category">Fruit picking</span>
            </p>
            <h1 className="farm-hero__name" id="farm-heading">Hiraya Family Farm</h1>
            <p className="farm-hero__location">Lipa, Batangas · 12 km away · Hosted by Maya Santos</p>
            <p className="farm-hero__rating">4.9 · 128 reviews</p>
            <p className="farm-hero__description">
              Three generations of the Santos family grow calamansi, greens and herbs on this slope above
              Lipa. Guests walk the orchard, pick their own fruit, and take home a basket.
            </p>
            <dl className="farm-hero__facts">
              <div>
                <dt>Open</dt>
                <dd>Sat &amp; Sun, 8 AM – 4 PM</dd>
              </div>
              <div>
                <dt>Group size</dt>
                <dd>Up to 12 guests</dd>
              </div>
              <div>
                <dt>Languages</dt>
                <dd>Filipino, English</dd>
              </div>
            </dl>
          </div>
        </section>

        <div className="farm-layout">
          <div className="farm-layout__main">
            <h2 className="section-heading__title">Experiences at this farm</h2>

            {sessions.map((s) => (
              <article className="session-card" key={s.id}>
                <div className="session-card__body">
                  <h3 className="session-card__name">{s.name}</h3>
                  <p className="session-card__meta">{s.meta}</p>
                  <p className="session-card__text">{s.text}</p>
                </div>
                <div className="session-card__aside">
                  <p className="session-card__price">
                    ₱{s.price.toLocaleString('en-PH')} <span>/ guest</span>
                  </p>
                  <p className="session-card__slots">
                    {s.slots} of {s.total} slots left
                  </p>
                  <Link className="button button--primary" to="/checkout">
                    Book this slot
                  </Link>
                </div>
              </article>
            ))}

            <h2 className="section-heading__title">What guests say</h2>
            {reviews.map((r) => (
              <article className="review-entry" key={r.name}>
                <p className="review-entry__head">
                  <span className="review-entry__name">{r.name}</span>
                  <span className="rating">★ {r.rating}</span>
                  <span className="review-entry__date">{r.date}</span>
                </p>
                <p className="review-entry__text">{r.text}</p>
              </article>
            ))}
          </div>

          <aside className="farm-layout__aside">
            <div className="booking-summary booking-summary--sticky">
              <p className="booking-summary__label">Starting at</p>
              <p className="booking-summary__total">
                ₱420 <span>/ guest</span>
              </p>
              <p className="booking-summary__note">Next available: Sat, 14 Nov · 9:00 AM</p>
              <Link className="button button--primary booking-summary__cta" to="/checkout">
                Choose a slot
              </Link>
              <p className="booking-summary__note">Free cancellation until 12 Nov.</p>
            </div>
            <div className="map-thumbnail">
              <span className="map-thumbnail__label">Lipa, Batangas</span>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
