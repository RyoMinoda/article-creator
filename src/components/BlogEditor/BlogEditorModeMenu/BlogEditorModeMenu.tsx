import { Button, Grid, SxProps, Theme } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { BlogEditorModeMenuIconButton, BlogEditorModeMenuIconButtonProps } from "../../Button/BlogEditorModeMenuIconButton";
import { BlogEditorModeKeyValues, BlogEditorModeType } from "../type";

export type BlogEditorModeMenuProps = {
    width: number,
    height: number,
    modeType: BlogEditorModeType,
    updateModeType: (mode: BlogEditorModeType) => void
}

export const BlogEditorModeMenu = ({ props }: { props: BlogEditorModeMenuProps }) => {
    const { width, height, updateModeType, modeType } = props;
    // States
    const { Palette } = useContext(UiParamsContext);

    // Consts
    const buttonGridHeight = width + 2;
    const buttonCount = Object.keys(BlogEditorModeKeyValues).length;
    const minHeight = (buttonCount + 1) * buttonGridHeight;

    // Styles
    const innerContainerSx: SxProps<Theme> = {
        width,
        height: buttonGridHeight * buttonCount,
        marginTop: 1
    }
    const containerSx: SxProps<Theme> = {
        width, height,
        minHeight,
        bgcolor: Palette.Main.Vivid
    }
    const gridItemSx: SxProps<Theme> = {
        width,
        height: buttonGridHeight,
    }
    return (
        <Grid container sx={containerSx}>
            <Grid container sx={innerContainerSx}>
                {Object.values(BlogEditorModeKeyValues).map((x: BlogEditorModeType) => {
                    const buttonProps: BlogEditorModeMenuIconButtonProps = {
                        width,
                        height: width,
                        isActive: x === modeType,
                        modeType: x,
                        onClickHandler: () => {
                            updateModeType(x);
                        }
                    }
                    return (
                        <Grid item key={x} sx={gridItemSx}>
                            <BlogEditorModeMenuIconButton props={buttonProps} />
                        </Grid>
                    );
                })}
            </Grid>
        </Grid>
    )
}
