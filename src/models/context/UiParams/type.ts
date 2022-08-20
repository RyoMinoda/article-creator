export type UiParams = {
    Layout: UiLayout,
    Palette: UiPalette,
    FontSize: UiFontSize
}

export type UiLayout = {
    BreadcrumbHeight: number,
    TopMenuHeight: number,
    BlogComponentRowHeight: number,
    BlogComponentColumnCount: number,
    BorderRadius: number,
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
        Main: string,
        Light: string,
        Lighter: string,
        Darker: string,
    },
    FontColor: {
        Darker: string,
        Main: string
    }
}

export type UiFontSize = {
    Largest: number,
    MuchLarger: number,
    Larger: number,
    Large: number,
    Main: number,
    Small: number,
    Smaller: number,
}