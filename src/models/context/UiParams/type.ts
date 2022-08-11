export type UiParams = {
    Layout: UiLayout,
    Palette: UiPalette,
    FontSize: UiFontSize
}

export type UiLayout = {
    TopMenuHeight: number,
}

export type UiPalette = {
    Main: {
        Dark: string,
        Deep: string,
        Vivid: string,
        Bright: string,
        Light: string,
    },
    Background: {
        Main: string
    }
}

export type UiFontSize = {
    Largest: number,
    MuchLarger: number,
    Large: number,
    Main: number,
}