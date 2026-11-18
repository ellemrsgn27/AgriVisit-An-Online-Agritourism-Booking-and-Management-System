import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Icon from '../components/Icon.jsx';

const CATEGORIES = [
  { key: 'all', label: 'All experiences', icon: 'sprout' },
  { key: 'fruit-picking', label: 'Fruit picking', icon: 'leaf-check' },
  { key: 'farm-tours', label: 'Farm tours', icon: 'photo' },
  { key: 'workshops', label: 'Workshops', icon: 'ticket' },
  { key: 'farm-to-table', label: 'Farm-to-table', icon: 'sprout' },
];

const EXPERIENCES = [
  {
    id: 'orchard',
    category: 'fruit-picking',
    host: 'Hiraya Family Farm',
    rating: '4.9 (128)',
    name: 'Orchard walk & calamansi picking',
    meta: 'Lipa, Batangas · 2 hours',
    price: '₱650',
    image: 'https://placehold.co/520x300/ceddbe/355e43?text=Orchard+walk',
    alt: 'Calamansi orchard rows',
  },
  {
    id: 'lunch',
    category: 'farm-to-table',
    host: 'Luntian Grove',
    rating: '4.8 (96)',
    name: 'Farm-to-table breakfast',
    meta: 'Silang, Cavite · 90 minutes',
    price: '₱950',
    image: 'https://placehold.co/520x300/d8e2c6/355e43?text=Lunch+table',
    alt: 'A long lunch table in a garden',
  },
  {
    id: 'workshop',
    category: 'workshops',
    host: 'Bukid & Bloom',
    rating: '4.9 (74)',
    name: 'Grow a little, learn a lot',
    meta: 'San Pablo, Laguna · 90 minutes · take-home seedling',
    price: '₱450',
    image: 'https://placehold.co/520x300/ceddbe/355e43?text=Workshop',
    alt: 'Seedlings in trays',
  },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [saved, setSaved] = useState([]);

  const toggleSaved = (id) => {
    setSaved((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const visible = EXPERIENCES.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory,
  );

  return (
    <Layout>
      <div className="page-shell">
        <section className="home-hero">
          <div className="home-hero__copy">
            <p className="eyebrow home-hero__eyebrow">Rooted in local. Made for you.</p>
            <h1 className="home-hero__heading">
              A little closer
              <br />
              to the good life.
            </h1>
            <p className="home-hero__description">
              Trade the everyday for orchard paths, honest food, and the people who grow it. Your
              next farm day is closer than you think.
            </p>
            <div className="home-hero__actions">
              <Link className="button button--primary" to="/register/tourist">
                <Icon className="button__icon" name="arrow" />
                Find your farm day
              </Link>
              <Link className="home-hero__text-link" to="/story">
                Meet our local growers →
              </Link>
            </div>
            <div className="home-proof">
              <div className="home-proof__avatars" aria-hidden="true">
                <span>MR</span>
                <span>JS</span>
                <span>AL</span>
              </div>
              <div className="home-proof__text">
                <p className="home-proof__title">Loved by 4,200+ visitors</p>
                <p className="home-proof__note">Rated 4.9 by people who showed up</p>
              </div>
            </div>
          </div>
          <div className="home-hero__media">
            <img src="/AgriVisit.jpg" alt="A farm landscape with orchard rows" width="715" height="475" />
            <div className="home-hero__label">
              <p className="home-hero__label-kicker">Featured farm</p>
              <p className="home-hero__label-name">Bukid &amp; Bloom</p>
              <p className="home-hero__label-place">
                <Icon name="pin" /> San Pablo, Laguna
              </p>
            </div>
          </div>
        </section>

        <form className="home-search" onSubmit={(event) => event.preventDefault()}>
          <div className="form-field">
            <label className="form-field__label" htmlFor="home-location">
              Where
            </label>
            <div className="input">
              <Icon className="input__icon" name="pin" />
              <input
                className="input__control"
                id="home-location"
                name="location"
                type="text"
                defaultValue="Batangas & nearby"
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-field__label" htmlFor="home-date">
              When
            </label>
            <div className="input">
              <Icon className="input__icon" name="calendar" />
              <input
                className="input__control"
                id="home-date"
                name="date"
                type="text"
                defaultValue="Sat, 14 November 2026"
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-field__label" htmlFor="home-experience">
              What
            </label>
            <div className="input input--select">
              <Icon className="input__icon" name="sprout" />
              <select className="input__control" id="home-experience" name="experience">
                <option>Fruit picking</option>
                <option>Farm-to-table</option>
                <option>Workshops</option>
                <option>Farm tours</option>
              </select>
            </div>
          </div>
          <button className="button button--primary home-search__submit" type="submit">
            <Icon className="button__icon" name="search" />
            Search
          </button>
        </form>

        <section className="home-benefits" aria-label="Why book with AgriVisit">
          <p className="home-benefits__item">
            <Icon name="users" /> Support families who grow
          </p>
          <p className="home-benefits__item">
            <Icon name="calendar" /> Book in a few taps
          </p>
          <p className="home-benefits__item">
            <Icon name="scan" /> QR ticket at the gate
          </p>
        </section>

        <section className="home-discover" aria-labelledby="home-discover-heading">
          <div className="home-discover__intro">
            <div className="home-discover__copy">
              <p className="eyebrow">Fresh air. Fresh perspectives.</p>
              <h2 className="home-discover__heading" id="home-discover-heading">
                Find your kind of countryside.
              </h2>
              <p className="home-discover__description">
                A morning among the trees. A new skill. A meal that tastes like the place it came
                from.
              </p>
            </div>
            <Link className="button button--ghost" to="/register/tourist">
              <Icon className="button__icon" name="arrow" />
              View all experiences
            </Link>
          </div>

          <div className="home-categories" role="group" aria-label="Experience categories">
            {CATEGORIES.map((category) => (
              <button
                key={category.key}
                className={`category-chip${activeCategory === category.key ? ' is-active' : ''}`}
                type="button"
                aria-pressed={activeCategory === category.key}
                onClick={() => setActiveCategory(category.key)}
              >
                <Icon name={category.icon} /> {category.label}
              </button>
            ))}
          </div>

          <div className="home-cards">
            {visible.map((item) => (
              <article className="experience-card" key={item.id}>
                <div className="experience-card__media">
                  <img src={item.image} alt={item.alt} width="520" height="300" loading="lazy" />
                  <span className="experience-card__tag">
                    {CATEGORIES.find((category) => category.key === item.category)?.label}
                  </span>
                  <button
                    className="experience-card__save"
                    type="button"
                    aria-label="Save experience"
                    aria-pressed={saved.includes(item.id)}
                    onClick={() => toggleSaved(item.id)}
                  >
                    <Icon name="star" />
                  </button>
                </div>
                <div className="experience-card__body">
                  <div className="experience-card__row">
                    <span className="experience-card__host">{item.host}</span>
                    <span>★ {item.rating}</span>
                  </div>
                  <h3 className="experience-card__name">{item.name}</h3>
                  <p className="experience-card__meta">{item.meta}</p>
                  <div className="experience-card__price">
                    <p>
                      <strong>{item.price}</strong> / person
                    </p>
                    <Icon name="arrow" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="home-discover__description">
              No experiences in this category yet. Pick another one to keep exploring.
            </p>
          )}

          <div className="home-map-callout">
            <div className="home-map-callout__copy">
              <Icon name="pin" />
              <div>
                <p className="home-map-callout__title">
                  Your next slow Sunday is on the map.
                </p>
                <p className="home-map-callout__text">
                  Explore 48 independent farms across Batangas, Cavite, and Laguna.
                </p>
              </div>
            </div>
            <Link className="button button--ghost" to="/register/tourist">
              <Icon className="button__icon" name="arrow" />
              Explore the farm map
            </Link>
          </div>
        </section>

        <section className="home-invite" aria-labelledby="home-invite-heading">
          <img
            className="home-invite__photo"
            src="https://placehold.co/545x300/ceddbe/355e43?text=Your+farm"
            alt="A farm field with rows of crops"
            width="545"
            height="300"
            loading="lazy"
          />
          <div className="home-invite__copy">
            <p className="eyebrow">For the people who grow</p>
            <h2 className="home-invite__heading" id="home-invite-heading">
              Your farm has a story.
              <br />
              Let people be part of it.
            </h2>
            <p className="home-invite__description">
              Turn what you already love into a little more income. Share your farm, set your own
              schedules, and welcome guests on your terms. We&rsquo;ll keep the bookings organized.
            </p>
            <div className="home-invite__actions">
              <Link className="button button--primary" to="/register/owner">
                <Icon className="button__icon" name="arrow" />
                Register your farm
              </Link>
              <Link className="home-hero__text-link" to="/story">
                Read our story →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
