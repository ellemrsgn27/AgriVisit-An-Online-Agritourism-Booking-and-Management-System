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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/story" element={<StoryPage />} />
      <Route path="/discovery" element={<DiscoveryPage />} />
      <Route path="/experiences" element={<ExperiencesPage />} />
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
