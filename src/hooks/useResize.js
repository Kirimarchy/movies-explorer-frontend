import { useCallback, useEffect, useState } from 'react';
import { DEVICES } from '../utils/constants';

export default function useResize() {
  const getWidth = useCallback(() => window.innerWidth, []);
  const [width, setWidth] = useState(getWidth());

  const {SCREEN_SM, SCREEN_MD, SCREEN_LG} = DEVICES;

  const isMobile  = width >= SCREEN_SM && width <= SCREEN_MD;
  const isTablet  = width >= SCREEN_MD && width < SCREEN_LG;
  const isDesktop = width >= SCREEN_LG;

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
          
        }, 111);
      }
    };

    return () => window.removeEventListener('resize', handleResize);
    
 }, [getWidth]);

  return {width, isMobile, isTablet, isDesktop};
}
