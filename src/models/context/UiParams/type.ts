export type UiParams = {
    Layout: UiLayout,
    Palette: UiPalette,
    FontSize: UiFontSize,
    LocalSetting: UiLocalSetting
}

export type UiLayout = {
    BreadcrumbHeight: number,
    TopMenuHeight: number,
    BlogComponentRowHeight: number,
    BlogComponentColumnCount: number,
    BorderRadius: number,
    ButtonHeight: number,
    BlogPreviewWidth: number,
    BlogEditorTitleHeight: number,
    BlogEditorModeMenuWidth: number,
    BlogTitleHeight: number
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
        YellowGreen: string,
        Red: string,
        Orange: string,
        Yellow: string,
        Purple: string,
        Blue: string,
        RedPurple: string,
    },
    Background: {
        Main: string,
        Light: string,
        Lighter: string,
        Lightest: string,
        Darker: string,
        Dark: string,
    },
    FontColor: {
        Darker: string,
        Dark: string,
        Main: string,
        Light: string,
        Lighter: string,
        MuchLighter: string,
        Lightest: string,
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
    Small: number,
    Smaller: number,
    MuchSmaller: number,
    Smallest: number,
}

export const DateTimeExpressionKeyValues = {
    yyyyMMdd: "yyyy-MM-dd",
} as const;

export type DateTimeExpressionType = typeof DateTimeExpressionKeyValues[keyof typeof DateTimeExpressionKeyValues];

export type UiLocalSetting = {
    TimeZone: number,
    DateTimeExpression: DateTimeExpressionType,
    UpdateTimeZone: (timeZone: number) => void
}