import { lazy, Suspense } from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';

// Lazy load sections below the fold
const Projects = lazy(() => import('../components/sections/Projects'));
const Achievements = lazy(() => import('../components/sections/Achievements'));
const Certificates = lazy(() => import('../components/sections/Certificates'));
const GitHubActivity = lazy(() => import('../components/sections/GitHubActivity'));

const SectionSkeleton = () => <div className="h-[400px] w-full bg-bg-primary" />;

export default function Home() {
  return (
    <>
      <Hero />
      <div id="about"><About /></div>
      <div id="skills"><Skills /></div>
      
      <Suspense fallback={<SectionSkeleton />}>
        <Projects preview={true} />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <Achievements preview={true} />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <Certificates preview={true} />
      </Suspense>
      
      <div id="github">
        <Suspense fallback={<SectionSkeleton />}>
          <GitHubActivity />
        </Suspense>
      </div>
    </>
  );
}
