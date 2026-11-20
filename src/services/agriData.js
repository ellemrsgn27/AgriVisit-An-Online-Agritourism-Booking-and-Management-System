// One place for all app data.
// Right now every function returns SAMPLE data from src/data/.
// When the Supabase database is ready, only the bodies of these functions
// change (they will call Supabase instead). The screens stay the same.

import * as owner from '../data/ownerData.js';
import * as admin from '../data/adminData.js';

// Sample values, exported under the same names the pages already use.
// Later, Supabase versions of these will replace them here.
export * from '../data/ownerData.js';
export * from '../data/adminData.js';

const later = (value) => Promise.resolve(value);

// ---- Farm owner ----
export const getFarm = () => later(owner.farm);
export const getBookings = () => later(owner.bookings);
export const getReviews = () => later(owner.reviews);
export const getOpeningDays = () => later(owner.openingDays);
export const getMonthlyIncome = () => later(owner.monthlyIncome);

// ---- Administrator ----
export const getAdminMetrics = () => later(admin.metrics);
export const getBookingBars = () => later(admin.bookingBars);
export const getActivity = () => later(admin.activity);
export const getApprovals = () => later(admin.approvals);
export const getApplicant = () => later(admin.applicant);
export const getUsers = () => later(admin.users);
export const getCategories = () => later(admin.categories);

// Formats a number as Philippine pesos, e.g. 650 -> ₱650
export const formatPeso = owner.peso;
