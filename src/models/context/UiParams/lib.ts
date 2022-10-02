import React from "react";
import { createContext } from "react"
import { DateTimeExpressionKeyValues, UiFontSize, UiLayout, UiLocalSetting, UiPalette, UiParams } from "./type";

const initialLayout: UiLayout = {
    BreadcrumbHeight: 35,
    TopMenuHeight: 60,
    BlogComponentRowHeight: 30,
    BlogComponentColumnCount: 12,
    BorderRadius: 2,
    ButtonHeight: 35,
    BlogPreviewWidth: 300,
    BlogEditorTitleHeight: 45,
    BlogEditorModeMenuWidth: 60,
    BlogTitleHeight: 45,
}

const initialPalette: UiPalette = {
    Main: {
        Dark: "#263466",
        Deep: "#425AB3",
        Vivid: "#658AE6",
        Bright: "#659BE6",
        Light: "#d0dbf7"
    },
    Second: {
        Green: "#4caf50",
        Red: "#EC7272",
        Orange: "#FEB139",
        Yellow: "#FFF80A",
        Purple: "#6F38C5",
        Blue: "#3DB2FF",
        YellowGreen: "#B7E778",
        RedPurple: "#CA5FA6"
    },
    Background: {
        Main: "#d4dafc",
        Light: "#EAEDFE",
        Lighter: "#f5f6ff",
        Lightest: "#FFFFFF",
        Dark: "#C7CFF9",
        Darker: "#BBC4F9",
    },
    FontColor: {
        Darker: "#333333",
        Dark: "#565656",
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
    Largest: 22,
    MuchLarger: 21,
    Larger: 20,
    Large: 18,
    Main: 16,
    Small: 14,
    Smaller: 12,
    MuchSmaller: 11,
    Smallest: 10,
}

const initialLocalSetting: UiLocalSetting = {
    TimeZone: 0.0,
    DateTimeExpression: DateTimeExpressionKeyValues.yyyyMMdd,
    UpdateTimeZone: (timeZone: number) => {}
}

export const initialUiParams: UiParams = {
    Layout: initialLayout,
    Palette: initialPalette,
    FontSize: initialFontSize,
    LocalSetting: initialLocalSetting
}

export const UiParamsContext = createContext<UiParams>(initialUiParams);