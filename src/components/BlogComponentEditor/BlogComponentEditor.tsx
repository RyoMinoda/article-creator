import { Box, Grid, SxProps, Theme, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { useScreenSize } from "../../models/utils/ScreenSize/func";
import { BlogComponentEditorMain, BlogComponentEditorMainProps } from "./Main/BlogComponentEditorMain";
import { BlogComponentEditorViewer, BlogComponentEditorViewerProps } from "./Viewer/BlogComponentEditorViewer";

export type BlogComponentEditorProps = {

}

export const BlogComponentEditor = ({ props }: { props: BlogComponentEditorProps }) => {
    const { screenWidth, screenHeight } = useScreenSize();
    const { Layout, Palette } = useContext(UiParamsContext);
    const initialViewerHeight = 240;
    const [ viewerHeight, setViewerHeight ] = useState(initialViewerHeight);
    const innerHeight = screenHeight - Layout.FullDialogTitleHeight;
    const outerSx: SxProps<Theme> = {
        width: screenWidth,
        height: innerHeight
    }
    const marginLR = 2;
    const dividerHeight = 4;
    const mainWidth = screenWidth - 2 * marginLR * 8;
    const viewerWidth = 900;
    const mainHeight = innerHeight - viewerHeight - dividerHeight;
    const editorSx: SxProps<Theme> = {
        width: screenWidth,
        height: mainHeight,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const editorMainProps: BlogComponentEditorMainProps = {
        width: mainWidth,
        height: mainHeight,
    }
    const dividerItemSx: SxProps<Theme> = {
        width: screenWidth,
        height: dividerHeight,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const dividerSx: SxProps<Theme> = {
        width: screenWidth,
        height: dividerHeight,
        bgcolor: Palette.Background.Dark
    }
    const viewerItemSx: SxProps<Theme> = {
        width: screenWidth,
        height: viewerHeight,
        overflow: "hidden",
        bgcolor: Palette.Background.Lighter
    }
    const viewerProps: BlogComponentEditorViewerProps = {
        width: screenWidth,
        height: viewerHeight,
        viewerWidth,
        viewerHeight,
    }
    return (
        <Grid container sx={outerSx}>
            <Grid item sx={editorSx}>
                <BlogComponentEditorMain props={editorMainProps} />
            </Grid>
            <Grid item sx={dividerItemSx}>
                <Box sx={dividerSx} />
            </Grid>
            <Grid item sx={viewerItemSx}>
                <BlogComponentEditorViewer props={viewerProps} />
            </Grid>
        </Grid>
    );
}