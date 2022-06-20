import { useEffect, useCallback } from 'react';

export default function useEventListener(callback: () => void) {
  const escFunction: EventListenerOrEventListenerObject = useCallback(
    (event) => {
      if (event.keyCode === 27) {
        callback();
      }
    },
    [callback],
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction);

    return () => {
      document.removeEventListener('keydown', escFunction);
    };
  }, [escFunction]);
}
