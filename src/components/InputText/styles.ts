import { CSSProperties, useContext } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";

export const getInputStyle = (width: number, height: number, fontSize: number): CSSProperties => {
    return {
        width,
        height: height - 4,
        textIndent: 5,
        borderWidth: 1,
        borderRadius: 1,
        fontSize,
        borderColor: "gray"
    };
}