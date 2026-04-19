import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingScreen from './components/ui/LoadingScreen';
import CursorTrail from './components/3d/CursorTrail';
import Scene from './components/3d/Scene';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const CertificatesPage = lazy(() => import('./pages/CertificatesPage'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'));
const ResearchPage = lazy(() => import('./pages/ResearchPage'));
const GitHubPage = lazy(() => import('./pages/GitHubPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function App() {
  return (
    <Router>
      {/* Global 3D background — fixed behind everything on every page */}
      <Scene />
      {/* Cursor particle trail — active on all pages */}
      <CursorTrail />

      <div className="min-h-screen bg-transparent text-slate-300 selection:bg-accent-cyan/30">
        <Navbar />
        <main>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/certificates" element={<CertificatesPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/github" element={<GitHubPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
