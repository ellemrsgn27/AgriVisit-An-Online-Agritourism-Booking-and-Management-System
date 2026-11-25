import OwnerLayout from '../../components/OwnerLayout.jsx';
import Icon from '../../components/Icon.jsx';
import { farm, openingDays } from '../../services/agriData.js';

export default function OwnerFarmProfilePage() {
  return (
    <OwnerLayout title="Farm profile">
      <div className="console-heading">
        <div>
          <h1 className="console-heading__title">Farm profile</h1>
        </div>
        <button className="button button--primary" type="submit" form="farm-profile-form">
          Save changes
        </button>
      </div>

      <form className="console-form owner-profile-workspace" id="farm-profile-form" onSubmit={(e) => e.preventDefault()}>
        <div className="owner-profile-main">
        <div className="console-card">
          <h2 className="console-card__title">About the farm</h2>
          <div className="form-field">
            <label className="form-field__label" htmlFor="fp-name">Farm name</label>
            <div className="input">
              <input className="input__control" id="fp-name" type="text" defaultValue={farm.name} />
            </div>
          </div>
          <div className="form-field">
            <label className="form-field__label" htmlFor="fp-intro">Farm introduction</label>
            <div className="input">
              <input className="input__control" id="fp-intro" type="text" defaultValue={farm.intro} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label className="form-field__label" htmlFor="fp-city">City / municipality</label>
              <div className="input">
                <input className="input__control" id="fp-city" type="text" defaultValue={farm.city} />
              </div>
            </div>
            <div className="form-field">
              <label className="form-field__label" htmlFor="fp-pin">Map pin</label>
              <div className="input">
                <input className="input__control" id="fp-pin" type="text" defaultValue={farm.pin} />
                <Icon name="pin" className="input__icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="console-card">
          <h2 className="console-card__title">Opening days</h2>
          <ul className="day-list">
            {openingDays.map((d) => (
              <li key={d.day}>
                <span>{d.day}</span>
                <span className="day-list__hours">{d.hours}</span>
                <button className="link-button" type="button">Edit</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="console-card">
          <h2 className="console-card__title">Verification</h2>
          <p className="console-card__text">
            Approved by the administrator on 2 October 2026. Documents are visible only to
            authorized reviewers.
          </p>
          <div className="doc-row">
            <span className="doc-chip">Business permit &middot; on file</span>
            <span className="doc-chip">Owner identification &middot; on file</span>
          </div>
        </div>
        </div>

        <aside className="owner-profile-side">
          <section className="console-card">
            <h2 className="console-card__title">Farm photos</h2>
            <div className="farm-photo-gallery"><div className="farm-photo-preview"><img src="/images/story/farm-growers.jpg" alt="Farm main photo" /><span>Main photo</span></div><div className="farm-photo-preview"><img src="/images/story/farm-landscape.jpg" alt="Farm landscape" /></div></div>
            <button className="button button--ghost" type="button"><Icon name="photo" className="button__icon" /> Replace main photo</button>
            <p className="form-hint">JPG or PNG, at least 1600 x 900. The first photo becomes your search thumbnail.</p>
          </section>
          <section className="console-card">
            <h2 className="console-card__title">Facilities &amp; features</h2>
            <div className="feature-checklist"><label><input type="checkbox" defaultChecked /> Restroom available</label><label><input type="checkbox" defaultChecked /> Parking on site</label><label><input type="checkbox" /> Wheelchair accessible</label><label><input type="checkbox" defaultChecked /> Family friendly</label></div>
          </section>
          <section className="console-card">
            <h2 className="console-card__title">Location map pin</h2>
            <div className="farm-map-preview"><Icon name="pin" /><span>{farm.city}</span><small>{farm.pin}</small></div>
          </section>
        </aside>
      </form>
    </OwnerLayout>
  );
}
