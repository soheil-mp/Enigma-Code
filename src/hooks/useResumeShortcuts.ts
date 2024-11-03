import { useEffect } from 'react';

export function useResumeShortcuts(handlers: {
  onSave: () => void;
  onPreview: () => void;
  onAIHelp: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            handlers.onSave();
            break;
          case 'p':
            e.preventDefault();
            handlers.onPreview();
            break;
          case 'h':
            e.preventDefault();
            handlers.onAIHelp();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
} 