import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingScreen from './components/ui/LoadingScreen'; // Need to create this

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
      <div className="min-h-screen bg-bg-primary text-slate-300 selection:bg-accent-cyan/30">
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
