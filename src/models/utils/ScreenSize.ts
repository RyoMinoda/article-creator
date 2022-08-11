import { useLayoutEffect, useState } from "react";

export type ScreenSize = {
    screenWidth: number;
    screenHeight: number;
}

export const useScreenSize = (): ScreenSize => {
    const initialSize: ScreenSize = {
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight
    }
    const [size, setSize] = useState(initialSize);
    useLayoutEffect(() => {
      const updateSize = () => {
        setSize({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight
        });
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}
