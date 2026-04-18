import { useEffect } from 'react';
import Achievements from '../components/sections/Achievements';

export default function AchievementsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      <Achievements preview={false} />
    </div>
  );
}
