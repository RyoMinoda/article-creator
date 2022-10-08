import { Box, SxProps, Theme } from "@mui/material"
import { useContext } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { MousePosition } from "../../../models/utils/MousePosition/type";
import { ClassNameKeyValues } from "../../../utils/ClassName";

export type BlogEditorSubmenuSlideLineProps = {
    width: number,
    height: number,
    updateCanMove: () => void,
}


export const BlogEditorSubmenuSlideLine = ({ props }: { props: BlogEditorSubmenuSlideLineProps }) => {
    const { width, height, updateCanMove } = props;
    const { Palette } = useContext(UiParamsContext);

    // Consts
    const onMouseDown = () => updateCanMove();

    // Styles
    const sx: SxProps<Theme> = {
        width, 
        height, 
        borderRightStyle: "solid",
        borderRightWidth: width / 1.2,
        borderRightColor: Palette.Background.Main,
        cursor: "e-resize",
        "&:hover": {
            borderRightColor: Palette.Main.Bright,
        },
    }
    return (
        <div onMouseDown={onMouseDown} className={ClassNameKeyValues.verticalTransfer}  id="blog-editor-submenu-line-div">
            <Box sx={sx} id="blog-editor-submenu-line-box" className={ClassNameKeyValues.verticalTransfer} >
            </Box>
        </div>
    );
}