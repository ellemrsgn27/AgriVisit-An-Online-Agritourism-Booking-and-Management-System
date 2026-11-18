import OwnerLayout from '../../components/OwnerLayout.jsx';
import { farm, peso } from '../../data/ownerData.js';

export default function OwnerFarmProfilePage() {
  return (
    <OwnerLayout title="Farm profile">
      <div className="console-heading">
        <div>
          <h1 className="console-heading__title">Farm profile</h1>
          <p className="console-heading__text">This is how your farm appears on the map and in search.</p>
        </div>
      </div>

      <form className="console-form" onSubmit={(e) => e.preventDefault()}>
        <div className="console-card">
          <h2 className="console-card__title">About the farm</h2>
          <div className="form-field">
            <label className="form-field__label" htmlFor="fp-name">Farm name</label>
            <div className="input"><input className="input__control" id="fp-name" type="text" defaultValue={farm.name} /></div>
          </div>
          <div className="form-field">
            <label className="form-field__label" htmlFor="fp-intro">Farm introduction</label>
            <div className="input"><input className="input__control" id="fp-intro" type="text" defaultValue={farm.intro} /></div>
          </div>
          <div className="form-field">
            <label className="form-field__label" htmlFor="fp-city">City / municipality</label>
            <div className="input"><input className="input__control" id="fp-city" type="text" defaultValue={farm.city} /></div>
          </div>
        </div>

        <div className="console-card">
          <h2 className="console-card__title">Experiences</h2>
          <ul className="day-list">
            {farm.experiences.map((e) => (
              <li key={e.id}><span>{e.name}</span><span className="day-list__hours">{peso(e.price)} &middot; up to {e.guests} guests</span></li>
            ))}
          </ul>
        </div>

        <button className="button button--primary" type="submit">Save changes</button>
      </form>
    </OwnerLayout>
  );
}
