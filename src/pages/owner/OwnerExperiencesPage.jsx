import OwnerLayout from '../../components/OwnerLayout.jsx';
import Icon from '../../components/Icon.jsx';
import { farm, peso } from '../../services/agriData.js';

export default function OwnerExperiencesPage() {
  return (
    <OwnerLayout title="Experiences">
      <div className="console-heading">
        <div>
          <h1 className="console-heading__title">Experiences</h1>
          <p className="console-heading__text">
            Set what you offer, when, and how many guests you can welcome.
          </p>
        </div>
        <button className="button button--primary" type="button">Add an experience</button>
      </div>

      <div className="experience-admin-list">
        {farm.experiences.map((e) => (
          <article key={e.id} className="experience-admin-row">
            <img src={e.image} alt="" width="96" height="72" loading="lazy" />
            <div className="experience-admin-row__body">
              <p className="experience-admin-row__title">{e.name}</p>
              <p className="experience-admin-row__meta">
                {e.category} &middot; {e.duration} &middot; {peso(e.price)} per guest
              </p>
            </div>
            <div className="experience-admin-row__slots">
              <p>{e.slotsLeft ? `${e.slotsLeft} of ${e.guests} slots left` : 'Draft'}</p>
              <p className="experience-admin-row__sub">{e.time}</p>
            </div>
            <span className={`booking-status booking-status--${e.status === 'draft' ? 'pending' : 'valid'}`}>
              {e.status === 'draft' ? 'Draft' : 'Published'}
            </span>
            <button className="button button--ghost" type="button">Manage slots</button>
          </article>
        ))}
      </div>

      <div className="console-card">
        <h2 className="console-card__title">Slot settings</h2>
        <div className="form-row">
          <div className="form-field">
            <label className="form-field__label" htmlFor="es-capacity">Guests per session</label>
            <div className="input">
              <input className="input__control" id="es-capacity" type="text" defaultValue="12" />
            </div>
          </div>
          <div className="form-field">
            <label className="form-field__label" htmlFor="es-lead">Booking lead time</label>
            <div className="input input--select">
              <select className="input__control" id="es-lead" defaultValue="1 day before">
                <option>1 day before</option>
                <option>2 days before</option>
                <option>Same day</option>
              </select>
              <Icon name="chevron" className="input__icon" />
            </div>
          </div>
        </div>
        <p className="form-hint">
          When a session reaches capacity, AgriVisit closes it automatically so no booking is taken twice.
        </p>
      </div>
    </OwnerLayout>
  );
}
