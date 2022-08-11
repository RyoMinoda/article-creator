import { createContext } from "react"
import { UiFontSize, UiLayout, UiPalette, UiParams } from "./type";


const initialLayout: UiLayout = {
    TopMenuHeight: 70
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
        Main: "#EAEDFE"
    }
}

const initialFontSize: UiFontSize = {
    Largest: 24,
    MuchLarger: 22,
    Large: 20,
    Main: 18
}

const initialUiParams: UiParams = {
    Layout: initialLayout,
    Palette: initialPalette,
    FontSize: initialFontSize
}

export const UiParamsContext = createContext<UiParams>(initialUiParams);