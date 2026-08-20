'use client';

import { useEffect } from 'react';

export default function ScrollToTop() {
  useEffect(() => {
    const rawPushState = history.pushState;

    history.pushState = function (...args) {
      const result = rawPushState.apply(this, args);
      window.scrollTo({ top: 0 });
      return result;
    };

    return () => {
      history.pushState = rawPushState;
    };
  }, []);

  return null;
}
