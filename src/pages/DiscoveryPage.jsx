import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Icon from '../components/Icon.jsx';

const FARMS = [
  {
    id: 'hiraya',
    category: 'Fruit picking',
    rating: '4.9',
    reviews: 128,
    name: 'Hiraya Family Farm',
    location: 'Lipa, Batangas',
    distance: '12 km away',
    experience: 'Orchard walk & calamansi picking',
    slots: '8 slots',
    time: '9:00 AM',
    price: 650,
    photo: '/images/story/farm-growers.jpg',
  },
  {
    id: 'luntian',
    category: 'Farm-to-table',
    rating: '4.8',
    reviews: 86,
    name: 'Luntian Grove',
    location: 'Silang, Cavite',
    distance: '38 km away',
    experience: 'From garden to lunch table',
    slots: '6 slots',
    time: '11:00 AM',
    price: 950,
    photo: '/images/story/farm-landscape.jpg',
  },
  {
    id: 'bukid',
    category: 'Workshops',
    rating: '4.9',
    reviews: 64,
    name: 'Bukid & Bloom',
    location: 'San Pablo, Laguna',
    distance: '28 km away',
    experience: 'Grow a little, learn a lot',
    slots: '10 slots',
    time: '10:00 AM',
    price: 450,
    photo: '/images/story/farm-landscape.jpg',
  },
  {
    id: 'sinta',
    category: 'Farm tours',
    rating: '4.7',
    reviews: 52,
    name: 'Sinta Hills Farm',
    location: 'Cuenca, Batangas',
    distance: '21 km away',
    experience: 'A walk through the working farm',
    slots: '12 slots',
    time: '2:00 PM',
    price: 350,
    photo: '/images/story/farm-growers.jpg',
  },
];

const MAP_PLACES = [
  { key: 'silang', label: 'SILANG' },
  { key: 'calamba', label: 'CALAMBA' },
  { key: 'lipa', label: 'LIPA CITY' },
  { key: 'sanpablo', label: 'SAN PABLO' },
  { key: 'cuenca', label: 'CUENCA' },
];

const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'rating', label: 'Highest rated' },
  { value: 'price-asc', label: 'Price: Low to high' },
  { value: 'price-desc', label: 'Price: High to low' },
  { value: 'slots', label: 'Most available slots' },
];

export default function DiscoveryPage() {
  const [selectedFarm, setSelectedFarm] = useState(FARMS[0]);
  const [filtersShown, setFiltersShown] = useState(true);
  const [sortBy, setSortBy] = useState('recommended');
  const [form, setForm] = useState({
    location: 'Any location',
    date: 'Sat, 14 November 2026',
    experience: 'all',
    guests: '3 adults',
    price: 'any',
    rating: 'any',
  });

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const sortedFarms = [...FARMS].sort((a, b) => {
    if (sortBy === 'rating') return Number(b.rating) - Number(a.rating);
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'slots') return Number.parseInt(b.slots, 10) - Number.parseInt(a.slots, 10);
    return 0;
  });

  return (
    <Layout>
      <section className="view view--discovery is-active">
        <div className="page-shell">
          <section className="page-introduction">
            <div className="page-introduction__copy">
              <h1 className="page-introduction__heading">Explore local farms</h1>
              <p className="page-introduction__description">
                Search verified farms by location, experience type, price, and rating.
              </p>
            </div>
          </section>

          <form
            className="discovery-filters"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="form-field">
              <label className="form-field__label" htmlFor="filter-location">
                Location
              </label>
              <div className="input">
                <input
                  className="input__control"
                  id="filter-location"
                  type="text"
                  autoComplete="off"
                  value={form.location}
                  onChange={(event) => updateField('location', event.target.value)}
                />
                <Icon className="input__icon" name="pin" />
              </div>
            </div>

            <div className="form-field">
              <label className="form-field__label" htmlFor="filter-date">
                Visit date
              </label>
              <div className="input">
                <input
                  className="input__control"
                  id="filter-date"
                  type="text"
                  autoComplete="off"
                  value={form.date}
                  onChange={(event) => updateField('date', event.target.value)}
                />
                <Icon className="input__icon" name="calendar" />
              </div>
            </div>

            <div className="form-field">
              <label className="form-field__label" htmlFor="filter-experience">
                Experience
              </label>
              <div className="input input--select">
                <select
                  className="input__control"
                  id="filter-experience"
                  value={form.experience}
                  onChange={(event) => updateField('experience', event.target.value)}
                >
                  <option value="all">All categories</option>
                  <option value="fruit-picking">Fruit picking</option>
                  <option value="farm-to-table">Farm-to-table</option>
                  <option value="workshops">Workshops</option>
                  <option value="farm-tours">Farm tours</option>
                </select>
                <Icon className="input__icon" name="chevron" />
              </div>
            </div>

            <div className="form-field form-field--guests">
              <label className="form-field__label" htmlFor="filter-guests">
                Guests
              </label>
              <div className="input">
                <input
                  className="input__control"
                  id="filter-guests"
                  type="text"
                  autoComplete="off"
                  value={form.guests}
                  onChange={(event) => updateField('guests', event.target.value)}
                />
                <Icon className="input__icon" name="users" />
              </div>
            </div>

            <button className="button button--primary discovery-filters__submit" type="submit">
              <Icon className="button__icon" name="search" />
              Search farms
            </button>
          </form>

          <div className="filter-options">
            <span className="status-pill">
              <Icon className="status-pill__icon" name="check" />
              Available slots only
            </span>
            <button
              className="button button--ghost filter-options__toggle"
              type="button"
              aria-expanded={filtersShown}
              aria-controls="price-rating-panel"
              onClick={() => setFiltersShown((value) => !value)}
            >
              <Icon className="button__icon" name="sliders" />
              <span>{filtersShown ? 'Filters shown' : 'Show filters'}</span>
            </button>
            <p className="filter-options__note">Search verified farms by location</p>
            <button
              className="link-button"
              type="button"
              onClick={() =>
                setForm({
                  location: 'Any location',
                  date: 'Sat, 14 November 2026',
                  experience: 'all',
                  guests: '3 adults',
                  price: 'any',
                  rating: 'any',
                })
              }
            >
              Clear filters
            </button>
          </div>

          {filtersShown && (
            <section
              className="price-rating-panel"
              id="price-rating-panel"
              aria-label="Price and rating filters"
            >
              <h2 className="price-rating-panel__heading">
                Price &amp; rating &middot; Refine the farms shown on your map
              </h2>

              <div className="price-rating-panel__controls">
                <div className="form-field form-field--price">
                  <label className="form-field__label" htmlFor="filter-price">
                    Price per person (PHP)
                  </label>
                  <div className="input input--select">
                    <select
                      className="input__control"
                      id="filter-price"
                      value={form.price}
                      onChange={(event) => updateField('price', event.target.value)}
                    >
                      <option value="any">Any price</option>
                      <option value="under-500">Under ₱500</option>
                      <option value="500-800">₱500 to ₱800</option>
                      <option value="over-800">Over ₱800</option>
                    </select>
                    <Icon className="input__icon" name="chevron" />
                  </div>
                </div>

                <div className="form-field form-field--rating">
                  <label className="form-field__label" htmlFor="filter-rating">
                    Minimum rating
                  </label>
                  <div className="input input--select">
                    <select
                      className="input__control"
                      id="filter-rating"
                      value={form.rating}
                      onChange={(event) => updateField('rating', event.target.value)}
                    >
                      <option value="any">All ratings</option>
                      <option value="4.5">4.5 and up</option>
                      <option value="4.8">4.8 and up</option>
                    </select>
                    <Icon className="input__icon" name="chevron" />
                  </div>
                </div>

                <button className="button button--primary price-rating-panel__apply" type="submit">
                  <Icon className="button__icon" name="search" />
                  Apply filters
                </button>
              </div>

              <p className="price-rating-panel__note">
                Combines with location and experience filters. Any price and all ratings are
                selected, so the four current results remain unchanged.
              </p>
            </section>
          )}

          <div className="results-layout">
            <section className="farm-results" aria-labelledby="results-heading">
              <div className="farm-results__meta">
                <h2 className="farm-results__count" id="results-heading">
                  {FARMS.length} farms for your Saturday
                </h2>
                <label className="sort-control"><span>Sort by:</span><span className="sort-control__select-wrap"><select className="sort-control__select" value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort farms">{sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><span className="sort-control__chevron" aria-hidden="true">⌄</span></span></label>
              </div>

              <div className="farm-results__list">
                {sortedFarms.map((farm) => (
                  <article
                    key={farm.id}
                    className={`farm-card${selectedFarm.id === farm.id ? ' is-selected' : ''}`}
                  >
                    <button
                      className="farm-card__photography"
                      type="button"
                      aria-label={`Show ${farm.name} on the map`}
                      onClick={() => setSelectedFarm(farm)}
                    >
                      <img
                        src={farm.photo}
                        alt=""
                        loading="lazy"
                        width="180"
                        height="151"
                      />
                    </button>
                    <div className="farm-result-information">
                      <div className="farm-result-information__topline">
                        <p className="farm-result-information__category">{farm.category}</p>
                        <p className="rating">
                          <Icon className="rating__star" name="star" />
                          {farm.rating} ({farm.reviews})
                        </p>
                      </div>
                      <h3 className="farm-result-information__name">{farm.name}</h3>
                      <p className="farm-result-information__location">
                        {farm.location} &middot; {farm.distance}
                      </p>
                      <p className="farm-result-information__experience">{farm.experience}</p>
                      <div className="availability-and-price">
                        <p className="availability-and-price__slots">
                          {farm.slots} &middot; {farm.time}
                        </p>
                        <p className="availability-and-price__price">
                          ₱{farm.price}{' '}
                          <span className="availability-and-price__unit">/ guest</span>
                        </p>
                      </div>
                      <Link className="button button--ghost" to="/experiences">
                        View farm &amp; sessions
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              <p className="farm-results__note">
                You&rsquo;re seeing all farms matching your filters. Try a wider area for more.
              </p>
            </section>

            <aside className="interactive-farm-map" aria-label="Map of farms">
              <div className="map-geography">
                <svg
                  className="map-geography__roads"
                  viewBox="0 0 682 785"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M-20 250C120 300 240 250 340 300S560 420 710 340" fill="none" stroke="#d8c9a6" strokeWidth="8" />
                  <path d="M120 -20C160 180 150 420 60 810" fill="none" stroke="#d8c9a6" strokeWidth="7" />
                  <path d="M330 785C360 620 480 470 710 430" fill="none" stroke="#d8c9a6" strokeWidth="6" />
                </svg>

                <span className="map-geography__lake" aria-hidden="true">
                  Taal Lake
                </span>

                {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                  <span
                    key={index}
                    className={`cultivated-land cultivated-land--${index}`}
                    aria-hidden="true"
                  />
                ))}

                {MAP_PLACES.map((place) => (
                  <p key={place.key} className={`map-place-name map-place-name--${place.key}`}>
                    {place.label}
                  </p>
                ))}

                {FARMS.map((farm, index) => (
                  <button
                    key={farm.id}
                    className={`map-price-marker map-price-marker--${farm.price}${
                      selectedFarm.id === farm.id ? ' is-active' : ''
                    }`}
                    type="button"
                    aria-label={`Farm at ${farm.price} pesos per guest`}
                    style={{ zIndex: 3 + index }}
                    onClick={() => setSelectedFarm(farm)}
                  >
                    <Icon name="sprout" />₱{farm.price}
                  </button>
                ))}

                <div className="selected-farm-preview">
                  <img
                    className="selected-farm-preview__photo"
                    src={selectedFarm.photo}
                    alt=""
                    width="66"
                    height="50"
                    loading="lazy"
                  />
                  <div className="selected-farm-preview__summary">
                    <p className="selected-farm-preview__name">{selectedFarm.name}</p>
                    <p className="selected-farm-preview__meta">
                      {selectedFarm.rating} &middot; {selectedFarm.category}
                    </p>
                    <Link className="selected-farm-preview__link" to="/experiences">
                      View farm &amp; sessions
                      <Icon name="arrow" />
                    </Link>
                  </div>
                </div>

                <button className="map-action map-action--search-area" type="button">
                  <Icon name="rotate" />
                  Search this area
                </button>

                <div className="map-controls">
                  <button className="map-control" type="button" aria-label="Zoom in">
                    <Icon name="plus" />
                  </button>
                  <button className="map-control" type="button" aria-label="Zoom out">
                    <Icon name="minus" />
                  </button>
                  <button className="map-control" type="button" aria-label="Recenter the map">
                    <Icon name="locate" />
                  </button>
                </div>

                <div className="map-legend">
                  <Icon className="map-legend__icon" name="sprout" />
                  <p className="map-legend__label">Verified local farm</p>
                  <p className="map-legend__note">&middot; Prices per person</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
