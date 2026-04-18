import { useState, useEffect } from 'react';

export function useGitHubReadme(repoUrl) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!repoUrl) return;

    let url = repoUrl;
    if (!url.startsWith('http')) url = 'https://' + url;
    
    try {
      const urlObj = new URL(url);
      const parts = urlObj.pathname.split('/').filter(Boolean);
      if (parts.length >= 2) {
        const user = parts[0];
        const repo = parts[1];
        
        const fetchReadme = async () => {
          setLoading(true);
          setError(null);
          try {
            let res = await fetch(`https://raw.githubusercontent.com/${user}/${repo}/main/README.md`);
            if (!res.ok) {
              res = await fetch(`https://raw.githubusercontent.com/${user}/${repo}/master/README.md`);
            }
            
            if (!res.ok) {
              throw new Error('README not found');
            }
            
            const text = await res.text();
            setContent(text);
          } catch (err) {
            setError(err.message);
            setContent('# README Not Available\nCould not load documentation from GitHub.');
          } finally {
            setLoading(false);
          }
        };

        fetchReadme();
      }
    } catch (e) {
      setError('Invalid URL');
    }
  }, [repoUrl]);

  return { content, loading, error };
}
