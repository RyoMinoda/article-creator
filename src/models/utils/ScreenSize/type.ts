
export type ScreenSize = {
    screenWidth: number;
    screenHeight: number;
    screenMode: ScreenModeType
}

export const ScreenModeKeyValues = {
    Desktop: "Desktop",
    Mobile: "Mobile",
    Tablet: "Tablet"
} as const;

export type ScreenModeType = typeof ScreenModeKeyValues[keyof typeof ScreenModeKeyValues];