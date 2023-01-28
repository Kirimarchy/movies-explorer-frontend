import { useCallback, useEffect, useState } from 'react';

export default function useResize() {

  const getWidth = useCallback(() => window.innerWidth, []);
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {

    function handleResize() {
      setWidth(getWidth());
    };

    let resizeDelay;

    window.addEventListener('resize', resizeHandler, false);

    function resizeHandler() {
      if (!resizeDelay) {
        resizeDelay = setTimeout(() => {
          resizeDelay = null;
          handleResize();
        }, 555);
      }
    };

    return () => window.removeEventListener('resize', handleResize);

 }, [getWidth]);

  return width;

}
