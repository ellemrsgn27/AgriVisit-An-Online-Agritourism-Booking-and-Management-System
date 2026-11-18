import OwnerLayout from '../../components/OwnerLayout.jsx';
import { farm, peso } from '../../data/ownerData.js';

export default function OwnerExperiencesPage() {
  return (
    <OwnerLayout title="Experiences">
      <div className="console-heading">
        <div>
          <h1 className="console-heading__title">Experiences</h1>
          <p className="console-heading__text">Set what you offer, when, and how many guests you can welcome.</p>
        </div>
      </div>

      <div className="experience-admin-list">
        {farm.experiences.map((e) => (
          <article key={e.id} className="experience-admin-row">
            <div>
              <p className="owner-booking-row__name">{e.name}</p>
              <p className="owner-booking-row__sub">Starts {e.time} &middot; up to {e.guests} guests</p>
            </div>
            <p className="owner-booking-row__total">{peso(e.price)}</p>
          </article>
        ))}
      </div>
    </OwnerLayout>
  );
}
