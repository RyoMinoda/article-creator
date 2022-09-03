import { Box, SxProps, Theme } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../models/context/UiParams/lib";
import { Blog } from "../models/state/Blog/type"
import { useScreenSize } from "../models/utils/ScreenSize";
import { BlogViewer, BlogViewerProps } from "./BlogViewer"

export type BlogEditorPreviewProps = {
    Blog: Blog,
}

export const BlogEditorPreview = ({ props }: { props: BlogEditorPreviewProps }) => {
    const { Blog } = props;
    const { Palette } = useContext(UiParamsContext);
    const { screenHeight, screenWidth } = useScreenSize();
    const minWidth = 600;
    const defaultWidth = screenWidth * 0.5;
    const previewWidth = defaultWidth < minWidth ? minWidth : defaultWidth;
    const previewHeight = screenHeight * 0.8;
    const viewerProps: BlogViewerProps = {
        Blog,
        width: previewWidth,
        height: screenHeight * 0.8
    }
    const windowPadding = 1;
    const windowSx: SxProps<Theme> = {
        width: previewWidth + windowPadding * 2,
        height: previewHeight + windowPadding * 2,
        padding: windowPadding,
        borderRadius: 1,
        bgcolor: Palette.Background.Lightest
    }
    return (
        <Box sx={windowSx}>
            <BlogViewer props={viewerProps} />
        </Box>
    )
}   