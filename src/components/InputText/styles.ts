import { SxProps, Theme } from "@mui/material";

export const getInputStyle = (width: number, height: number, fontSize: number): SxProps<Theme> => {
    return {
        width,
        height,
        textIndent: 5,
        borderWidth: 1,
        borderRadius: 1,
        fontSize,
        borderColor: "gray"
    };
}