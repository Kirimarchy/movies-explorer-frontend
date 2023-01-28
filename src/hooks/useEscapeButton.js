import { useEffect } from 'react';

const useEscapeButton = (callback, dependency) => {
  useEffect(() => {
    if (dependency) {
      const onEscClose = e => {
        if (e.key === 'Escape') {
          callback()
        }
      }
      document.addEventListener('keyup', onEscClose);
      return () => {
        document.removeEventListener('keyup', onEscClose)
      };
    }
  }, [dependency]);
}

export default useEscapeButton;
