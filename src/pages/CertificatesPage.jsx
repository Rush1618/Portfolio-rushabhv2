import { useEffect } from 'react';
import Certificates from '../components/sections/Certificates';

export default function CertificatesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      <Certificates preview={false} />
    </div>
  );
}
