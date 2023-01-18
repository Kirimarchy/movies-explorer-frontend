import { useEffect, useCallback, useState } from 'react';

export default function useResize() {
  const getScreenWidth = useCallback(() => window.innerWidth, []);
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());

  useEffect(() => {

    function handleScreenResize() {
      setScreenWidth(getScreenWidth());
    };

    window.addEventListener('resize', resizeController, false); // при монтировании ставим обработчик

    let resizeTimer;

    function resizeController() {
      if (!resizeTimer) {
        resizeTimer = setTimeout(() => {
          resizeTimer = null;
          handleScreenResize();
        }, 555);
      }
    };

    return () => window.removeEventListener('resize', handleScreenResize);  // убираем при размонтировании
  }, [getScreenWidth]);

  return screenWidth;
}
