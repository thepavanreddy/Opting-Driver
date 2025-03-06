import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import WelcomeScreen from './screens/WelcomeScreen';
import BasicInformation from './screens/BasicInformation';
import DocumentVerification from './screens/DocumentVerification';
import VehiclePreferences from './screens/VehiclePreferences';
import ProfileCompletion from './screens/ProfileCompletion';
import VerificationPending from './screens/VerificationPending';
import VerificationSuccess from './screens/VerificationSuccess';
import DriverEtiquette from './screens/DriverEtiquette';
import DriverDashboard from './screens/DriverDashboard';
import UserDashboard from './screens/UserDashboard';
import Login from './screens/Login';
import Messages from './screens/Messages';

function App() {
  return (
    <Router>
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        
        {/* Driver Routes */}
        <Route path="/driver" element={<WelcomeScreen userType="driver" />} />
        <Route path="/driver/login" element={<Login />} />
        <Route path="/driver/basic-information" element={<BasicInformation userType="driver" />} />
        <Route path="/driver/document-verification" element={<DocumentVerification />} />
        <Route path="/driver/vehicle-preferences" element={<VehiclePreferences />} />
        <Route path="/driver/profile-completion" element={<ProfileCompletion />} />
        <Route path="/driver/verification-pending" element={<VerificationPending />} />
        <Route path="/driver/verification-success" element={<VerificationSuccess />} />
        <Route path="/driver/driver-etiquette" element={<DriverEtiquette />} />
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/driver/messages" element={<Messages userType="driver" />} />
        
        {/* User Routes */}
        <Route path="/user" element={<WelcomeScreen userType="user" />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/basic-information" element={<BasicInformation userType="user" />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/messages" element={<Messages userType="user" />} />
        
        {/* Legacy Routes - Redirect to new structure */}
        <Route path="/basic-information" element={<Navigate to="/driver/basic-information" replace />} />
        <Route path="/document-verification" element={<Navigate to="/driver/document-verification" replace />} />
        <Route path="/vehicle-preferences" element={<Navigate to="/driver/vehicle-preferences" replace />} />
        <Route path="/profile-completion" element={<Navigate to="/driver/profile-completion" replace />} />
        <Route path="/verification-pending" element={<Navigate to="/driver/verification-pending" replace />} />
        <Route path="/driver-etiquette" element={<Navigate to="/driver/driver-etiquette" replace />} />
        <Route path="/driver-dashboard" element={<Navigate to="/driver/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
