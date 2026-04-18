import { useEffect } from 'react';
import Research from '../components/sections/Research';

export default function ResearchPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      <Research preview={false} />
    </div>
  );
}
