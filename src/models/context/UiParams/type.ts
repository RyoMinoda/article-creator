export type UiParams = {
    Layout: UiLayout,
    Palette: UiPalette,
    FontSize: UiFontSize,
}

export type UiLayout = {
    BreadcrumbHeight: number,
    TopMenuHeight: number,
    BlogComponentRowHeight: number,
    BlogComponentColumnCount: number,
    BorderRadius: number,
    ButtonHeight: number,
    BlogPreviewWidth: number,
}

export type UiPalette = {
    Main: {
        Dark: string,
        Deep: string,
        Vivid: string,
        Bright: string,
        Light: string
    },
    Second: {
        Green: string,
    },
    Background: {
        Main: string,
        Light: string,
        Lighter: string,
        Lightest: string,
        Darker: string,
    },
    FontColor: {
        Darker: string,
        Main: string,
        Light: string,
    },
    Pastel: {
        Red: string,
        Green1: string,
        Green2: string,
        Blue1: string,
        Blue2: string,
        Yellow: string,
        Purple: string,
        Gray: string,
    }
}

export type UiFontSize = {
    Largest: number,
    MuchLarger: number,
    Larger: number,
    Large: number,
    Main: number,
    Smaller: number,
    Small: number,
}