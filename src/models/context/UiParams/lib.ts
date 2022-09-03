import { createContext } from "react"
import { UiFontSize, UiLayout, UiPalette, UiParams } from "./type";


const initialLayout: UiLayout = {
    BreadcrumbHeight: 45,
    TopMenuHeight: 70,
    BlogComponentRowHeight: 30,
    BlogComponentColumnCount: 12,
    BorderRadius: 2,
    ButtonHeight: 35,
    BlogPreviewWidth: 300,
}

const initialPalette: UiPalette = {
    Main: {
        Dark: "#263466",
        Deep: "#425AB3",
        Vivid: "#658AE6",
        Bright: "#80B9FF",
        Light: "#bed7fa"
    },
    Second: {
        Green: "#4caf50",
    },
    Background: {
        Main: "#EAEDFE",
        Light: "#DCDCDC",
        Lighter: "#EDEDED",
        Lightest: "#FDFDFD",
        Darker: "#AAAAAA"
    },
    FontColor: {
        Darker: "#333333",
        Main: "#888888",
        Light: "#FFFFFF"
    },
    Pastel: {
        Red: "#F4BFBF",
        Green1: "#C8E3D4",
        Green2: "#CFDAC8",
        Blue1: "#A7C5EB",
        Blue2: "#C9CBFF",
        Yellow: "#FDFFBC",
        Purple: "#C3AED6",
        Gray: "#CDD0CB",
    }
}

const initialFontSize: UiFontSize = {
    Largest: 25,
    MuchLarger: 23,
    Larger: 21,
    Large: 19,
    Main: 17,
    Smaller: 15,
    Small: 13,
}

const initialUiParams: UiParams = {
    Layout: initialLayout,
    Palette: initialPalette,
    FontSize: initialFontSize
}

export const UiParamsContext = createContext<UiParams>(initialUiParams);