import { createContext } from "react"
import { UiFontSize, UiLayout, UiPalette, UiParams } from "./type";


const initialLayout: UiLayout = {
    BreadcrumbHeight: 70,
    TopMenuHeight: 70,
    BlogComponentRowHeight: 40,
    BlogComponentColumnCount: 12,
    BorderRadius: 2,
}

const initialPalette: UiPalette = {
    Main: {
        Dark: "#263466",
        Deep: "#425AB3",
        Vivid: "#658AE6",
        Bright: "#80B9FF",
        Light: "#90D6F5",
    },
    Background: {
        Main: "#EAEDFE",
        Light: "#FDFDFD",
        Lighter: "#DDDDDD",
        Darker: "#AAAAAA"
    },
    FontColor: {
        Darker: "#AAAAAA",
        Main: "#777777"
    }
}

const initialFontSize: UiFontSize = {
    Largest: 25,
    MuchLarger: 23,
    Larger: 21,
    Large: 19,
    Main: 17,
    Small: 15,
    Smaller: 13,
}

const initialUiParams: UiParams = {
    Layout: initialLayout,
    Palette: initialPalette,
    FontSize: initialFontSize
}

export const UiParamsContext = createContext<UiParams>(initialUiParams);