Hi! Here is everything you need for the AgriVisit database. Copy this whole message into your AI tool
and give it the file `docs/database-plan.md` from the project folder. That file has every table and
field with the exact names our app already uses.

---

## What AgriVisit is

A website for booking farm visits in Batangas, Cavite and Laguna. Three kinds of people use it:

- **Tourist** — browses farms, books a farm day, gets a QR ticket, reviews after the visit.
- **Farm owner** — registers a farm, waits for approval, then manages experiences, bookings,
  QR check-in, revenue and reviews.
- **Administrator** — approves farms, manages users and categories, moderates reviews, reads
  reports, edits platform settings.

There are currently 1 public homepage area, 7 owner pages and 8 administrator pages, all built in
React. Right now every page uses fake data written in two files (`src/data/ownerData.js` and
`src/data/adminData.js`). Nothing is saved, so a booking disappears on refresh. That is the job.

---

## What to use

- **Supabase** (free tier). It gives us Postgres, sign-up and log-in, and file storage in one place.
- Make a **separate project for testing** and keep the real one clean.
- Do not put keys in the code. Supabase keys go into a `.env` file that is not pushed to git.
  Send me the project URL and the public (anon) key when it exists. Never send the service key.

---

## What to build, in this order

1. `accounts`, `farms`, `categories`
2. `experiences`, `experience_slots`, `opening_days`
3. `bookings`, `payments`, `tickets`

Stop after step 3 and tell me. The rest (reviews, activity log, settings) comes after we connect
these, so we do not build on top of mistakes.

The full field lists are in `docs/database-plan.md`. Please use those names exactly — the screens
are already written expecting them.

---

## Things our app already expects, so please match them

- **Booking reference** looks like `AGV-261114-084` and is unique per booking.
- **Booking status** is one of: `pending`, `confirmed`, `completed`, `cancelled`, `declined`.
  Our owner page has filter tabs for exactly these.
- **Tickets** are a random code, one per booking. Second scan of the same code is refused.
- **Money** is in pesos. Our prices are whole numbers today (650, 420, 450), but store them as
  decimals so we never lose centavos.
- **Payment method** is `gcash`, `maya` or `cash` (pay at the farm).
- **Farm status** is `pending`, `approved`, `documents_missing`, `visit_due` or `suspended`.
- **Cancellation** is free until 48 hours before the session. Keep the reason as text.
- **Review status** is `waiting`, `published` or `hidden`. One review per completed booking.
- **Counters**: store capacity and booked count on each session, and let the database work out
  slots left. Two people confirming at the same time must not oversell the seats.

---

## Rules I care about

- A tourist must never see another tourist's booking or ticket.
- An owner must never see another farm's data.
- Only an administrator sees verification documents.
- Only `approved` farms show up in search and can take bookings.
- Passwords are handled by Supabase login. We never store them ourselves, and I do not want
  password fields written into the tables.
- Do not delete rows by hand. Cancelled bookings keep a status and a reason.

---

## Testing it

- Put in about 3 farms, 6 experiences and 10 bookings so the pages have something to show.
- Test on the free test project only.
- When step 3 works, message me a list of the tables plus one sample row each. I will connect the
  app to it and we check the pages together.

---

## Please ask me before

- Adding a table we did not plan.
- Changing a field name.
- Deleting anything in the database.

If the AI tool suggests a different structure, send it to me first before building it, so the
screens and the database do not drift apart.

Thanks!
