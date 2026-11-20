import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Icon from '../components/Icon.jsx';
import './StoryPage.css';

const CARDS = [
  {
    icon: 'pin',
    title: 'Discover something real',
    text: 'Search farms on the map by location, experience type, price and rating. Read what your host offers and what to bring.',
  },
  {
    icon: 'calendar',
    title: 'Make room, not overbookings',
    text: 'Choose a date and session with available slots. Your host confirms the request before your unique QR e-ticket is issued.',
  },
  {
    icon: 'scan',
    title: 'A warm welcome at the gate',
    text: 'Download your ticket from My bookings. Your host verifies it once on arrival to check your group in.',
  },
  {
    icon: 'star',
    title: 'Leave something useful behind',
    text: 'After a completed visit, share a rating and review to help the next visitor and give your host thoughtful feedback.',
  },
];

const GUEST_RULES = [
  {
    title: 'Respect the working space',
    text: 'Follow your host’s guidance, pick only where invited and keep to marked paths.',
  },
  {
    title: 'Come prepared',
    text: 'Read age and accessibility guidance, arrive for your booked session and bring appropriate footwear.',
  },
  {
    title: 'Keep your host in the loop',
    text: 'If plans change, manage your booking early and check the cancellation terms for your visit.',
  },
];

export default function StoryPage() {
  return (
    <Layout>
      <main className="our-story">
        <section className="our-story__hero">
          <div className="our-story__hero-copy">
            <p className="our-story__label">ROOTED IN LOCAL. GROWING TOGETHER.</p>
            <h1 className="our-story__headline">Good days for visitors. Better possibilities for growers.</h1>
            <p className="our-story__lead">
              AgriVisit brings local farms and curious people together — with authentic experiences and a simpler
              way to organize every visit.
            </p>
            <Link className="our-story__button our-story__button--solid" to="/discovery">
              Find your farm day →
            </Link>
          </div>
          <figure className="our-story__figure">
            <img
              className="our-story__photo our-story__photo--hero"
              src="/images/story/farm-landscape.jpg"
              alt="A working landscape of farm plots"
            />
            <figcaption>A working landscape. A place to learn, connect and slow down.</figcaption>
          </figure>
        </section>

        <section className="our-story__why">
          <div className="our-story__why-grid">
            <div className="our-story__why-intro">
              <p className="our-story__label">MORE TIME IN THE FIELD. LESS TIME IN THE INBOX.</p>
              <h2 className="our-story__title-lg">Local farms have so much to share.</h2>
              <p className="our-story__body our-story__body--lg">
                An orchard walk. A first seedling. A meal made with what’s in season. Tourism can offer small farms
                an additional source of income, while helping visitors understand the land and the people behind
                their food.
              </p>
            </div>
            <div className="our-story__why-text">
              <h3 className="our-story__title-md">Welcoming guests shouldn’t mean juggling messages.</h3>
              <p className="our-story__body">
                Social media inquiries and handwritten reservations can leave hosts with double bookings, missed
                visits and unclear income records. AgriVisit is designed to bring discovery, schedules, limited
                slots and digital tickets into one organized place.
              </p>
              <p className="our-story__body">
                Our purpose is simple: make authentic farm visits easier to find and manage, and support local
                agriculture and rural tourism along the way.
              </p>
            </div>
          </div>
        </section>

        <section className="our-story__growers">
          <img
            className="our-story__photo our-story__photo--growers"
            src="/images/story/farm-growers.jpg"
            alt="A grower leading visitors through the farm"
          />
          <div className="our-story__growers-copy">
            <p className="our-story__label">FOR THE PEOPLE WHO GROW</p>
            <h2 className="our-story__title-lg">The farm comes first.</h2>
            <p className="our-story__body">
              Hosts decide what to share, what each experience costs, when to welcome visitors and how many guests
              they can comfortably accommodate.
            </p>
            <p className="our-story__body">
              A clear booking list and arrival check-in help a working farm prepare. Income and cost records help
              owners understand which experiences work for them — without replacing the work that makes their farm
              special.
            </p>
            <Link className="our-story__button our-story__button--outline" to="/register/owner">
              Become a host →
            </Link>
          </div>
        </section>

        <section className="our-story__cards-section">
          <h2 className="our-story__section-title">From a little curiosity to a day well spent.</h2>
          <div className="our-story__cards">
            {CARDS.map((card) => (
              <article className="our-story__card" key={card.title}>
                <Icon name={card.icon} className="our-story__card-icon" />
                <h3 className="our-story__card-title">{card.title}</h3>
                <p className="our-story__card-text">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="our-story__guest">
          <div className="our-story__guest-copy">
            <p className="our-story__label">BE A GUEST OF THE LAND</p>
            <h2 className="our-story__title-lg">Leave room for the rhythms of a real farm.</h2>
          </div>
          <ul className="our-story__rules">
            {GUEST_RULES.map((rule) => (
              <li className="our-story__rule" key={rule.title}>
                <h3 className="our-story__rule-title">{rule.title}</h3>
                <p className="our-story__body">{rule.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="our-story__system">
          <h2 className="our-story__system-title">A thoughtful system for a local purpose.</h2>
          <p className="our-story__body">
            AgriVisit is a proposed online agritourism booking and management system with an interactive farm map,
            QR ticketing and a revenue dashboard. Tourist, farm owner and administrator workspaces are designed
            around their different responsibilities.
          </p>
          <p className="our-story__credits">
            PROJECT PROPONENTS · Buenviaje, Lance T. · Lunar, Von Andrei G. · Silla, Jisselle Mae M.
          </p>
        </section>

        <section className="our-story__closing">
          <div className="our-story__closing-copy">
            <h2 className="our-story__title-lg">There’s a good day growing nearby.</h2>
            <p className="our-story__body">Find your next experience, share your farm, or return to your workspace.</p>
          </div>
          <div className="our-story__closing-actions">
            <div className="our-story__closing-buttons">
              <Link className="our-story__button our-story__button--solid" to="/experiences">
                Explore experiences →
              </Link>
              <Link className="our-story__button our-story__button--outline" to="/register/owner">
                Register your farm
              </Link>
            </div>
            <Link className="our-story__owner-link" to="/login">
              Owner sign in
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
