# AgriVisit — Database plan

The field names below come from the real screens in
`src/data/ownerData.js`, `src/data/adminData.js` and the pages, so the app can plug in without renaming.

Suggested engine: **Supabase** (Postgres, free tier, has login and file storage built in).
Any Postgres works; the tables are plain tables.

---

## 1. `accounts`

Everyone who logs in — tourists, farm owners, administrators.

| Field | Type | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| first_name | text | |
| last_name | text | |
| email | text | unique |
| phone | text | nullable, tourists may skip it |
| role | text | `tourist` / `owner` / `admin` |
| status | text | `active` / `pending` / `suspended` |
| created_at | timestamptz | |

Login is handled by the auth service, not by this table. Never store a plain password.
`status = pending` is what makes a new owner land on the pending-approval screen.

---

## 2. `farms`

One row per farm. Matches the farm profile page and the admin approval queue.

| Field | Type | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| owner_id | uuid | → `accounts.id` |
| name | text | "Hiraya Family Farm" |
| intro | text | short description |
| city | text | "Lipa, Batangas" |
| province | text | Batangas / Cavite / Laguna |
| address | text | street and barangay |
| pin | text | "13.9411° N, 121.1639° E" |
| main_photo_url | text | first photo, used as the search thumbnail |
| status | text | `pending` / `approved` / `documents_missing` / `visit_due` / `suspended` |
| rejection_note | text | reason sent back to the owner, nullable |
| approved_at | timestamptz | nullable |
| approved_by | uuid | → `accounts.id`, nullable |
| created_at | timestamptz | |

Only `status = approved` farms show on discovery and can take bookings.

---

## 3. `farm_photos`

| Field | Type | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| farm_id | uuid | → `farms.id` |
| url | text | file in storage bucket |
| sort_order | int | 1 = main photo |

Use Supabase Storage for the files themselves, and keep only the link here.

---

## 4. `farm_documents`

The two uploads on the owner sign-up form (business permit, owner ID).
Visible to administrators only — never on the public farm page.

| Field | Type | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| farm_id | uuid | → `farms.id` |
| kind | text | `business_permit` / `owner_id` |
| file_url | text | private storage bucket |
| uploaded_at | timestamptz | |

---

## 5. `opening_days`

| Field | Type | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| farm_id | uuid | → `farms.id` |
| weekday | int | 0 = Sunday … 6 = Saturday |
| opens_at | time | nullable when closed |
| closes_at | time | nullable when closed |
| is_closed | boolean | |

---

## 6. `categories`

| Field | Type | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| name | text | Farm tours / Fruit picking / Workshops / Farm-to-table |
| is_archived | boolean | matches "Category archived" in the activity log |

Farm counts on the admin Categories page are counted from `experiences`, not stored here.

---

## 7. `experiences`

Matches the owner Experiences page and the tourist experience list.

| Field | Type | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| farm_id | uuid | → `farms.id` |
| category_id | uuid | → `categories.id` |
| name | text | "Orchard walk & calamansi picking" |
| description | text | |
| duration_minutes | int | 90, 120 … |
| price_per_guest | numeric(10,2) | in pesos, e.g. 650.00 |
| max_guests | int | capacity per session |
| photo_url | text | |
| status | text | `published` / `draft` |

A draft experience never shows to tourists. "Add experience" creates a row with `status = draft`.

---

## 8. `experience_slots`

One row per date and time a farm opens for a specific experience. This is what the checkout
session picker reads, and where "8 slots left" comes from.

| Field | Type | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| experience_id | uuid | → `experiences.id` |
| slot_date | date | |
| starts_at | time | 9:00 AM |
| ends_at | time | |
| capacity | int | seats for this session |
| booked_count | int | incremented on confirmed booking |
| is_open | boolean | owner can close a slot |

`slots_left = capacity - booked_count`. Do not store slots_left itself.

---

## 9. `bookings`

The centre of the app: checkout writes it, the owner Bookings page and QR check-in read it.

| Field | Type | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| ref | text | unique, shown as "AGV-261114-084" |
| tourist_id | uuid | → `accounts.id`, nullable for guest checkout |
| farm_id | uuid | → `farms.id` |
| experience_id | uuid | → `experiences.id` |
| slot_id | uuid | → `experience_slots.id` |
| guest_first_name | text | |
| guest_last_name | text | |
| guest_email | text | |
| guest_phone | text | |
| guests | int | adults in the party |
| price_per_guest | numeric(10,2) | copy at booking time |
| booking_fee | numeric(10,2) | 100.00 |
| total | numeric(10,2) | |
| payment_method | text | `gcash` / `maya` / `cash` |
| status | text | `pending` / `confirmed` / `completed` / `cancelled` / `declined` |
| cancellation_reason | text | nullable |
| cancel_free_until | timestamptz | 48 hours before the session |
| checked_in_at | timestamptz | nullable, set at the gate |
| created_at | timestamptz | |

Copy the price and fee into the booking row so later price edits do not rewrite history.

---

## 10. `payments`

| Field | Type | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| booking_id | uuid | → `bookings.id` |
| provider | text | `gcash` / `maya` / `cash` |
| provider_ref | text | reference from the payment provider |
| amount | numeric(10,2) | |
| status | text | `pending` / `paid` / `failed` / `refunded` |
| paid_at | timestamptz | nullable |

Never take card numbers or GCash numbers in your own form — the payment provider collects them.

---

## 11. `tickets`

The QR pass a guest shows at the gate.

| Field | Type | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| booking_id | uuid | → `bookings.id`, unique |
| code | text | unique random string encoded in the QR |
| issued_at | timestamptz | |
| used_at | timestamptz | nullable; a second scan is refused |

---

## 12. `reviews`

Owner Reviews page and admin moderation share this table.

| Field | Type | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| booking_id | uuid | → `bookings.id`, unique — one review per visit |
| tourist_id | uuid | → `accounts.id` |
| farm_id | uuid | → `farms.id` |
| experience_id | uuid | → `experiences.id` |
| rating | int | 1–5 |
| text | text | |
| status | text | `waiting` / `published` / `hidden` |
| flag_reason | text | `promotional_content` / `needs_reply` / … nullable |
| reply_text | text | owner reply, nullable |
| created_at | timestamptz | |

The rule "reviews only after a completed visit" is checked by linking the review to a booking
whose status is `completed`.

---

## 13. `review_reports`

Travellers flagging a review. Two reports hide a review when the threshold is 2.

| Field | Type | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| review_id | uuid | → `reviews.id` |
| reported_by | uuid | → `accounts.id` |
| reason | text | |
| created_at | timestamptz | |

---

## 14. `activity_log`

The "Recent activity" lists on the owner and admin pages, and the audit trail.

| Field | Type | Notes |
| --- | --- | --- |
| id | uuid | primary key |
| actor_id | uuid | → `accounts.id` |
| actor_role | text | `owner` / `admin` |
| action | text | `farm_approved` / `review_hidden` / `category_archived` / … |
| subject | text | "Hiraya Family Farm by Jules Reyes" |
| note | text | short description |
| created_at | timestamptz | |

---

## 15. `platform_settings`

The values on the admin Settings page, one row each, so they can be edited without code changes.

| Field | Type | Notes |
| --- | --- | --- |
| key | text | primary key, e.g. `booking_window_days` |
| value | text | "90" |
| updated_by | uuid | → `accounts.id` |
| updated_at | timestamptz | |

Keys to create now: `booking_window_days` = 90, `free_cancellation_hours` = 48,
`gate_checkin_window_hours` = 1, `review_flag_threshold` = 2, `admin_session_minutes` = 30,
`payout_schedule` = "Weekly, every Monday".

---

## Rules to protect the data

1. **Nobody sees another farm's data.** Turn on row-level security (the database rule that decides
   who may read a row): a tourist sees only their own bookings and tickets, an owner sees only
   their own farm, experiences and bookings, an admin sees everything.
2. **Only approved farms are public.** Discovery should filter `farms.status = 'approved'`.
3. **Counters move once.** Confirming a booking adds to `experience_slots.booked_count` exactly
   once — do it in one database step, not two app calls that can fail halfway.
4. **Document files are private.** The `farm_documents` bucket is not public; links are signed and
   short-lived.
5. **Nothing is deleted by hand.** Cancelled bookings keep their row with a status and a reason,
   because reports and revenue depend on the history.

## Order of work

| Step | What | Why first |
| --- | --- | --- |
| 1 | `accounts`, `farms`, `categories` | Nothing else can exist without these |
| 2 | `experiences`, `experience_slots`, `opening_days` | Needed before any booking |
| 3 | `bookings`, `payments`, `tickets` | The booking flow |
| 4 | `reviews`, `review_reports` | Needs completed bookings |
| 5 | `activity_log`, `platform_settings` | Finishing touches |
| 6 | Sign-up, log-in and row-level security | Last, once tables are stable |

Start with steps 1 to 3 only, on a separate test project.
