import { Box, SxProps, Theme } from "@mui/material"
import { useContext } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { MousePosition } from "../../../models/utils/MousePosition/type";

export type BlogEditorSubMenuLineProps = {
    width: number,
    height: number,
    updateCanMove: () => void,
}


export const BlogEditorSubMenuLine = ({ props }: { props: BlogEditorSubMenuLineProps }) => {
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
        <div onMouseDown={onMouseDown} className="vertical-transfer"  id="blog-editor-submenu-line-div">
            <Box sx={sx} id="blog-editor-submenu-line-box" className="vertical-transfer" >
            </Box>
        </div>
    );
}