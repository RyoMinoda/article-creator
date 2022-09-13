import { Box, Grid, SxProps, Theme } from "@mui/material";
import { useContext, useState } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { MousePosition } from "../../../models/utils/MousePosition/type";
import { BlogEditorModeKeyValues, BlogEditorModeType } from "../type";
import { BlogEditorSubMenuFiles } from "./BlogEditorSubMenuFIles";
import { BlogEditorSubMenuLine, BlogEditorSubMenuLineProps } from "./BlogEditorSubMenuLine";

export type BlogEditorSubMenuProps = {
    width: number,
    height: number,
    modeType: BlogEditorModeType,
    mousePosition: MousePosition,
    
    updateSubWindowWidth: () => void,
}

export const BlogEditorSubMenu = ({ props }: { props: BlogEditorSubMenuProps }) => {
    const { width, height, mousePosition, updateSubWindowWidth } = props;

    const { Palette } = useContext(UiParamsContext);
    const borderRight = 3;

    // Props
    const borderProps: BlogEditorSubMenuLineProps = {
        width: borderRight,
        height, 
        updateCanMove: updateSubWindowWidth
    }

    // Styles
    const containerSx: SxProps<Theme> = {
        width, 
        height,
        bgcolor: Palette.Background.Main,
        overflow: "hidden",
    }
    const mainItemSx: SxProps<Theme> = {
        width: width - borderRight * 2,
        height,
    }
    const borderItemSx: SxProps<Theme> = {
        width: borderRight,
        height
    }
    return (
        <Grid container sx={containerSx}>
            <Grid item sx={mainItemSx}>
                <SubMenuComponent props={props} />
            </Grid>
            <Grid item sx={borderItemSx}>
                <BlogEditorSubMenuLine props={borderProps} />
            </Grid>
        </Grid>
    );
}

const SubMenuComponent = ({ props }: { props: BlogEditorSubMenuProps }) => {
    const { modeType } = props;
    switch (modeType) {
        case BlogEditorModeKeyValues.Files:
            return <BlogEditorSubMenuFiles props={props} />;
        default:
            return <></>
    }
}