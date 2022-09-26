import { Box, Grid, Stack, SxProps, Theme } from "@mui/material";
import { useContext, useState } from "react";
import { EditorPreviewHeader, EditorPreviewHeaderProps } from "../../components/BlogEditor/EditorPreview/EditPreviewHeader";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { useScreenSize } from "../../models/utils/ScreenSize/func";
import { BlogViewer, BlogViewerProps } from "../BlogViewer"
import { BlogEditorPopupProps } from "./type";


export const BlogEditorPreview = ({ props }: { props: BlogEditorPopupProps }) => {
    const { Blog, windowWidth, updateWindowWidth } = props;
    const { Palette } = useContext(UiParamsContext);
    const { screenHeight, screenWidth } = useScreenSize();
    const previewHeight = screenHeight * 0.8;
    const headerHeight = 60;
    const padding = 8;
    const headerItemSx: SxProps<Theme> = {
        position: "absolute", top: 0, left: 0,
        width: windowWidth,
        height: previewHeight,
        bgcolor: Palette.Main.Light,
        borderRadius: 1,
    }
    const mainItemSx: SxProps<Theme> = {
        position: "absolute",
        top: headerHeight,
        left: padding,
        width: windowWidth - padding * 2,
        height: previewHeight - headerHeight,
        bgcolor: Palette.Background.Lightest,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2
    }
    const windowSx: SxProps<Theme> = {
        width: windowWidth - padding * 2,
        height: previewHeight - headerHeight,
    }
    const viewerProps: BlogViewerProps = {
        Blog,
        width: windowWidth - padding * 2,
        height: screenHeight * 0.8
    }
    const headerProps: EditorPreviewHeaderProps = {
        height: headerHeight,
        width: windowWidth,
        previewWindowWidth: windowWidth,
        updatePreviewWindowWidth: (width: number) => {
            updateWindowWidth(width);
        }
    }
    return (
        <Box sx={windowSx}>
            <Stack position="relative">
                <Box sx={headerItemSx}>
                    <EditorPreviewHeader props={headerProps} />
                </Box>
                <Box sx={mainItemSx}>
                    <BlogViewer props={viewerProps} />
                </Box>
            </Stack>
        </Box>
    )
}   
