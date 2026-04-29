import { Route, Routes } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import HomePage from './pages/HomePage';
import BrowsePetsPage from './pages/BrowsePetsPage';
import PetProfilePage from './pages/PetProfilePage';
import QuizPage from './pages/QuizPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import LoginPage from './pages/LoginPage';
import AdoptionApplicationPage from './pages/AdoptionApplicationPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse-pets" element={<BrowsePetsPage />} />
        <Route path="/pets/:id" element={<PetProfilePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/success-stories" element={<SuccessStoriesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/apply/:petId" element={<AdoptionApplicationPage />} />
        <Route path="/dashboard" element={<AdminDashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
