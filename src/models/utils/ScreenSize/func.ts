import { useLayoutEffect, useState } from "react";
import { ScreenModeKeyValues, ScreenModeType, ScreenSize } from "./type";

export const useScreenSize = (): ScreenSize => {
    const initialSize: ScreenSize = {
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        screenMode: ScreenModeKeyValues.Desktop
    }
    const [size, setSize] = useState(initialSize);
    useLayoutEffect(() => {
      const updateSize = () => {
        setSize({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight - 1,
            screenMode: getScreenMode(window.innerWidth, window.innerHeight - 1)
        });
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}


export const getScreenMode = (width: number, height: number): ScreenModeType => {
    const rate = width / height;
    if (1024 / 768 <= rate && rate <= 1920 / 1080) {
        return ScreenModeKeyValues.Desktop;
    } else if (360 / 640 <= rate && rate <= 414 / 896) {
        return ScreenModeKeyValues.Mobile;
    } else {
        return ScreenModeKeyValues.Tablet;
    }
}