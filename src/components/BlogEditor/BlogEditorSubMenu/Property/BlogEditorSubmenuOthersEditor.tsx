import { Box, Grid, SxProps, Theme, Typography } from "@mui/material"
import { useContext } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { BlogEditorDialogKeyValues } from "../../../../organizations/BlogEditor/type";
import { BlogEditorColorSelectButton, BlogEditorColorSelectButtonProps } from "../../../Button/BlogEditorColorSelectButton";
import { BlogEditorMenuPropertyComponentProps } from "./type"

export const BlogEditorSubmenuOthersEditor = ({ props } : { props: BlogEditorMenuPropertyComponentProps }) => {
    const { width, height, Blog, showDialog } = props;
    const { FontSize, Palette } = useContext(UiParamsContext);
    const paddingTop = 1;
    const boxSx: SxProps<Theme> = {
        width, height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const sidePadding = 1;
    const containerHeight = height - paddingTop * 8;
    const containerWidth = width - sidePadding * 2 * 8;
    const containerSx: SxProps<Theme> = {
        width: containerWidth,
        height: containerHeight
    }
    const rowCount = 2;
    const rowItemSx: SxProps<Theme> = {
        height: containerHeight / rowCount,
        width: containerWidth
    }
    const itemSx: SxProps<Theme> = {
        width: containerWidth / 2,
        height: containerHeight / rowCount,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const contentSx: SxProps<Theme> = {
        width: containerWidth / 2,
        height: containerHeight / rowCount,
        display: "flex",
        alignItems: "center"
    }
    const themeButtonProps: BlogEditorColorSelectButtonProps = {
        width: containerWidth / 4,
        height: containerHeight / rowCount / 2,
        color: Blog.Setting.Theme,
        transparentRow: 2,
        onClick: () => showDialog(BlogEditorDialogKeyValues.BlogTheme),
    }
    return (
        <Box sx={boxSx}>
            <Grid container sx={containerSx}>
                <Grid item>
                    <Grid container sx={rowItemSx}>
                        <Grid item sx={itemSx}>
                            <Typography fontSize={FontSize.Small} color={Palette.FontColor.Main}>
                                Theme
                            </Typography>
                        </Grid>
                        <Grid item sx={contentSx}>
                            <BlogEditorColorSelectButton props={themeButtonProps} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container sx={rowItemSx}>

                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}