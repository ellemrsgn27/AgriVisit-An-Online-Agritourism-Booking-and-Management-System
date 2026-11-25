import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

export const experiences = [
  {
    id: 'orchard-calamansi',
    category: 'fruit-picking',
    categoryLabel: 'Fruit picking',
    farm: 'Hiraya Family Farm',
    rating: 4.9,
    name: 'Orchard walk & calamansi picking',
    duration: '2 hours',
    place: 'Lipa, Batangas',
    price: 650,
    slots: 8,
    photo: '/images/story/farm-growers.jpg',
    alt: 'A grower guiding visitors through a citrus orchard',
  },
  {
    id: 'garden-lunch',
    category: 'farm-to-table',
    categoryLabel: 'Farm-to-table',
    farm: 'Luntian Grove',
    rating: 4.8,
    name: 'From garden to lunch table',
    duration: '3 hours',
    place: 'Silang, Cavite',
    price: 950,
    slots: 6,
    photo: '/images/story/farm-landscape.jpg',
    alt: 'Green vegetable rows across a working farm',
  },
  {
    id: 'seedling-workshop',
    category: 'workshops',
    categoryLabel: 'Workshops',
    farm: 'Bukid & Bloom',
    rating: 4.9,
    name: 'Grow a little, learn a lot',
    duration: '2 hours',
    place: 'San Pablo, Laguna',
    price: 450,
    slots: 10,
    photo: '/images/story/farm-landscape.jpg',
    alt: 'Farmers tending green crop rows',
  },
  {
    id: 'walking-tour',
    category: 'farm-tours',
    categoryLabel: 'Farm tours',
    farm: 'Sinta Hills Farm',
    rating: 4.7,
    name: 'A walk through the working farm',
    duration: '90 minutes',
    place: 'Cuenca, Batangas',
    price: 350,
    slots: 12,
    photo: '/images/story/farm-growers.jpg',
    alt: 'Visitors walking through a citrus orchard with a grower',
  },
];

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'fruit-picking', label: 'Fruit picking' },
  { id: 'farm-to-table', label: 'Farm-to-table' },
  { id: 'workshops', label: 'Workshops' },
  { id: 'farm-tours', label: 'Farm tours' },
];

const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'rating', label: 'Highest rated' },
  { value: 'price-asc', label: 'Price: Low to high' },
  { value: 'price-desc', label: 'Price: High to low' },
  { value: 'slots', label: 'Most available slots' },
];

function countFor(tabId) {
  return tabId === 'all'
    ? experiences.length
    : experiences.filter((item) => item.category === tabId).length;
}

export default function ExperiencesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const visible = experiences
    .filter((item) => activeTab === 'all' || item.category === activeTab)
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'slots') return b.slots - a.slots;
      return 0;
    });

  return (
    <Layout>
      <div className="page-shell">
        <section className="page-introduction page-introduction--split">
          <div className="page-introduction__copy">
            <h1 className="page-introduction__heading">Pick a thing to do with your hands.</h1>
            <p className="page-introduction__description">
              Every experience is run by the family that works the land.
            </p>
          </div>
        </section>

        <div className="experience-toolbar">
          <div className="booking-tabs" role="tablist" aria-label="Experience filters">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`booking-tabs__tab${activeTab === tab.id ? ' is-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label} <span className="booking-tabs__count">{countFor(tab.id)}</span>
              </button>
            ))}
          </div>
          <label className="sort-control"><span>Sort by:</span><span className="sort-control__select-wrap"><select className="sort-control__select" value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort experiences">{sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><span className="sort-control__chevron" aria-hidden="true">⌄</span></span></label>
        </div>

        <div className="experience-grid">
          {visible.map((item) => (
            <article className="experience-card" key={item.id} data-category={item.category}>
              <img
                className="experience-card__photo"
                src={item.photo}
                alt={item.alt}
                width="360"
                height="220"
                loading="lazy"
              />
              <div className="experience-card__body">
                <p className="experience-card__category">
                  {item.categoryLabel} · {item.farm}
                </p>
                <h3 className="experience-card__name">{item.name}</h3>
                <p className="experience-card__meta">
                  {item.duration} · {item.place}
                </p>
                <div className="experience-card__footer">
                  <p className="experience-card__price">
                    ₱{item.price.toLocaleString('en-PH')} <span>/ guest</span>
                  </p>
                  <p className="experience-card__slots">{item.slots} slots left</p>
                </div>
                <Link className="button button--primary experience-card__cta" to="/farm">
                  View &amp; book
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
