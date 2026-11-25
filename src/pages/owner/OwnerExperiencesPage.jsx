import { useState } from 'react';
import OwnerLayout from '../../components/OwnerLayout.jsx';
import Icon from '../../components/Icon.jsx';
import { farm, peso } from '../../services/agriData.js';

export default function OwnerExperiencesPage() {
  const [selectedId, setSelectedId] = useState(farm.experiences[0].id);
  const [capacity, setCapacity] = useState(farm.experiences[0].guests);
  const [saved, setSaved] = useState(false);
  const selected = farm.experiences.find((experience) => experience.id === selectedId);
  const usedSlots = selected.slotsLeft == null ? 0 : selected.guests - selected.slotsLeft;
  const availableSlots = Math.max(0, capacity - usedSlots);
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

      <div className="owner-experience-workspace">
      <div className="experience-admin-list">
        {farm.experiences.map((e) => (
          <article key={e.id} className={`experience-admin-row${selectedId === e.id ? ' is-selected' : ''}`}>
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
            <button className="button button--ghost" type="button" onClick={() => { setSelectedId(e.id); setCapacity(e.guests); setSaved(false); }}>Manage slots</button>
          </article>
        ))}
      </div>

      <aside className="owner-experience-side">
      <div className="console-card">
        <h2 className="console-card__title">Slot settings</h2>
        <div className="form-row">
          <div className="form-field">
            <label className="form-field__label" htmlFor="es-capacity">Guests per session</label>
            <div className="input">
              <input className="input__control" id="es-capacity" type="number" min="1" value={capacity} onChange={(event) => { setCapacity(Number(event.target.value)); setSaved(false); }} />
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
      <section className="console-card upcoming-capacity-card">
        <p className="gate-panel__eyebrow">Upcoming session capacity</p>
        <h2 className="console-card__title">{selected.name}</h2>
        <p className="upcoming-capacity-card__session">{selected.time}</p>
        <div className="capacity-meter"><span style={{ width: `${capacity ? Math.min(100, (usedSlots / capacity) * 100) : 0}%` }} /></div>
        <p className="capacity-meter__label">{availableSlots} of {capacity} guest spots available</p>
        <button className="button button--ghost" type="button" onClick={() => setSaved(true)}>Save capacity</button>
        {saved && <p className="owner-action-notice" role="status">Capacity updated for this session.</p>}
      </section>
      </aside>
      </div>
    </OwnerLayout>
  );
}
