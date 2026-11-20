import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import StoryPage from './pages/StoryPage.jsx';
import DiscoveryPage from './pages/DiscoveryPage.jsx';
import ExperiencesPage from './pages/ExperiencesPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import TouristRegisterPage from './pages/TouristRegisterPage.jsx';
import OwnerRegisterPage from './pages/OwnerRegisterPage.jsx';
import PendingApprovalPage from './pages/PendingApprovalPage.jsx';
import OwnerOverviewPage from './pages/owner/OwnerOverviewPage.jsx';
import OwnerFarmProfilePage from './pages/owner/OwnerFarmProfilePage.jsx';
import OwnerExperiencesPage from './pages/owner/OwnerExperiencesPage.jsx';
import OwnerBookingsPage from './pages/owner/OwnerBookingsPage.jsx';
import OwnerQrCheckinPage from './pages/owner/OwnerQrCheckinPage.jsx';
import OwnerReviewsPage from './pages/owner/OwnerReviewsPage.jsx';
import OwnerRevenuePage from './pages/owner/OwnerRevenuePage.jsx';
import AdminSignInPage from './pages/admin/AdminSignInPage.jsx';
import AdminOverviewPage from './pages/admin/AdminOverviewPage.jsx';
import AdminApprovalsPage from './pages/admin/AdminApprovalsPage.jsx';
import AdminUsersPage from './pages/admin/AdminUsersPage.jsx';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage.jsx';
import AdminModerationPage from './pages/admin/AdminModerationPage.jsx';
import AdminReportsPage from './pages/admin/AdminReportsPage.jsx';
import AdminSettingsPage from './pages/admin/AdminSettingsPage.jsx';
import FarmPage from './pages/FarmPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import BookingsPage from './pages/BookingsPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/story" element={<StoryPage />} />
      <Route path="/discovery" element={<DiscoveryPage />} />
      <Route path="/experiences" element={<ExperiencesPage />} />
      <Route path="/farm" element={<FarmPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/bookings" element={<BookingsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register/tourist" element={<TouristRegisterPage />} />
      <Route path="/register/owner" element={<OwnerRegisterPage />} />
      <Route path="/pending" element={<PendingApprovalPage />} />
      <Route path="/owner" element={<Navigate to="/owner/overview" replace />} />
      <Route path="/owner/overview" element={<OwnerOverviewPage />} />
      <Route path="/owner/farm-profile" element={<OwnerFarmProfilePage />} />
      <Route path="/owner/experiences" element={<OwnerExperiencesPage />} />
      <Route path="/owner/bookings" element={<OwnerBookingsPage />} />
      <Route path="/owner/qr-checkin" element={<OwnerQrCheckinPage />} />
      <Route path="/owner/reviews" element={<OwnerReviewsPage />} />
      <Route path="/owner/revenue" element={<OwnerRevenuePage />} />
      <Route path="/admin" element={<Navigate to="/admin/overview" replace />} />
      <Route path="/admin/sign-in" element={<AdminSignInPage />} />
      <Route path="/admin/overview" element={<AdminOverviewPage />} />
      <Route path="/admin/approvals" element={<AdminApprovalsPage />} />
      <Route path="/admin/users" element={<AdminUsersPage />} />
      <Route path="/admin/categories" element={<AdminCategoriesPage />} />
      <Route path="/admin/moderation" element={<AdminModerationPage />} />
      <Route path="/admin/reports" element={<AdminReportsPage />} />
      <Route path="/admin/settings" element={<AdminSettingsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
