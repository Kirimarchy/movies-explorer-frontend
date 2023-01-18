import { useState, useEffect } from 'react';
import {desktop, talet, mobile } from '../utils/constants'

export const useResize = () => {

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);

  return {
    width,
    isMobile: width <= SCREEN_MD,
    isTablet: width >= SCREEN_MD && width < SCREEN_LG,
    isDesktop: width >= SCREEN_LG
  };
};
