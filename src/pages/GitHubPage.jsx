import { useEffect } from 'react';
import GitHubActivity from '../components/sections/GitHubActivity';

export default function GitHubPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      <GitHubActivity />
    </div>
  );
}
