import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

export const experiences = [
  {
    id: 'orchard-calamansi',
    category: 'fruit-picking',
    categoryLabel: 'Fruit picking',
    farm: 'Hiraya Family Farm',
    name: 'Orchard walk & calamansi picking',
    duration: '2 hours',
    place: 'Lipa, Batangas',
    price: 650,
    slots: 8,
    photo: 'https://placehold.co/360x220/ceddbe/355e43?text=Picking',
    alt: 'A visitor picking calamansi',
  },
  {
    id: 'garden-lunch',
    category: 'farm-to-table',
    categoryLabel: 'Farm-to-table',
    farm: 'Luntian Grove',
    name: 'From garden to lunch table',
    duration: '3 hours',
    place: 'Silang, Cavite',
    price: 950,
    slots: 6,
    photo: 'https://placehold.co/360x220/d8e2c6/355e43?text=Lunch',
    alt: 'A farm lunch table',
  },
  {
    id: 'seedling-workshop',
    category: 'workshops',
    categoryLabel: 'Workshops',
    farm: 'Bukid & Bloom',
    name: 'Grow a little, learn a lot',
    duration: '2 hours',
    place: 'San Pablo, Laguna',
    price: 450,
    slots: 10,
    photo: 'https://placehold.co/360x220/ceddbe/355e43?text=Seedlings',
    alt: 'Seedling workshop',
  },
  {
    id: 'walking-tour',
    category: 'farm-tours',
    categoryLabel: 'Farm tours',
    farm: 'Sinta Hills Farm',
    name: 'A walk through the working farm',
    duration: '90 minutes',
    place: 'Cuenca, Batangas',
    price: 350,
    slots: 12,
    photo: 'https://placehold.co/360x220/d8e2c6/355e43?text=Tour',
    alt: 'A walking farm tour',
  },
];

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'fruit-picking', label: 'Fruit picking' },
  { id: 'farm-to-table', label: 'Farm-to-table' },
  { id: 'workshops', label: 'Workshops' },
  { id: 'farm-tours', label: 'Farm tours' },
];

function countFor(tabId) {
  return tabId === 'all'
    ? experiences.length
    : experiences.filter((item) => item.category === tabId).length;
}

export default function ExperiencesPage() {
  const [activeTab, setActiveTab] = useState('all');

  const visible = experiences.filter((item) => activeTab === 'all' || item.category === activeTab);

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
          <p className="experience-toolbar__sort">Sort: Recommended</p>
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
