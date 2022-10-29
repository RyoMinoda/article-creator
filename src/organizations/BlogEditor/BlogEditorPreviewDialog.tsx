import { Box, Grid, Stack, SxProps, Theme } from "@mui/material";
import { useContext, useState } from "react";
import { EditorPreviewHeader, EditorPreviewHeaderProps } from "../../components/BlogEditor/EditorPreview/EditPreviewHeader";
import { DialogLayout, DialogLayoutProps } from "../../components/Layout/DialogLayout";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { useScreenSize } from "../../models/utils/ScreenSize/func";
import { BlogViewer, BlogViewerProps } from "../BlogViewer"
import { BlogEditorDialogProps } from "./type";


export const BlogEditorPreviewDialog = ({ props }: { props: BlogEditorDialogProps }) => {
    const { Blog, windowWidth, updateWindowWidth, hideDialog, showDialog, type } = props;
    const { Palette } = useContext(UiParamsContext);
    const { screenHeight, screenWidth } = useScreenSize();
    const previewHeight = screenHeight * 0.8;
    const headerHeight = 60;
    const padding = 8;
    const headerItemSx: SxProps<Theme> = {
        position: "absolute", top: 0, left: 0,
        width: windowWidth,
        height: previewHeight,
        bgcolor: Palette.Background.Light,
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
    const dialogProps: DialogLayoutProps = {
        width: windowWidth - padding * 2,
        height: previewHeight - headerHeight,
        minWidth: 400,
        minHeight: 600,
        showDialog,
        hideDialog, 
        type,
        title: "",
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
        <DialogLayout props={dialogProps}>
            <Stack position="relative">
                <Box sx={headerItemSx}>
                    <EditorPreviewHeader props={headerProps} />
                </Box>
                <Box sx={mainItemSx}>
                    <BlogViewer props={viewerProps} />
                </Box>
            </Stack>
        </DialogLayout>
    )
}   
