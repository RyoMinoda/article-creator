import { Box, Grid, SxProps, Theme, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { BlogComponentContentListItemObj, BlogComponentContentListObj } from "../../models/state/BlogComponentContent/obj";
import { BlogPageObj } from "../../models/state/BlogPage/obj";
import { useScreenSize } from "../../models/utils/ScreenSize/func";
import { StorageOperationType } from "../../utils/StorageOperation";
import { BlogComponentEditorMain, BlogComponentEditorMainProps } from "./Main/BlogComponentEditorMain";
import { BlogComponentEditorMenu, BlogComponentEditorMenuProps } from "./Menu/BlogComponentEditorMenu";
import { BlogComponentEditorViewer, BlogComponentEditorViewerProps } from "./Viewer/BlogComponentEditorViewer";

export type BlogEditorDialogProps = {
    BlogPage: BlogPageObj,
    BlogComponentContentList: BlogComponentContentListObj;
    updateBlogComponentContentList: (blogComponentContentItem: BlogComponentContentListItemObj, operation: StorageOperationType) => void,
}

export const BlogEditorDialog = ({ props }: { props: BlogEditorDialogProps }) => {
    const { BlogPage } = props;
    const { Layout, Palette } = useContext(UiParamsContext);
    const { screenWidth, screenHeight } = useScreenSize();
    const initialViewerHeight = 220;
    const [ viewerHeight, setViewerHeight ] = useState(initialViewerHeight);
    const innerHeight = screenHeight - Layout.FullDialogTitleHeight;
    const outerSx: SxProps<Theme> = {
        width: screenWidth,
        height: innerHeight
    }
    const marginLR = 2;
    const dividerHeight = 2;
    const mainWidth = screenWidth - 2 * marginLR * 8;
    const menuHeight = 50;
    const mainHeight = innerHeight - viewerHeight - dividerHeight - menuHeight;
    const menuItemSx: SxProps<Theme> = {
        height: menuHeight,
        width: screenWidth
    }
    const menuProps: BlogComponentEditorMenuProps = {
        ...props,
        BlogComponentContent: BlogComponentContentListItemObj.create(),
        height: menuHeight,
        width: screenWidth,
    }
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
        BlogPage
    }
    return (
        <Grid container sx={outerSx}>
            <Grid item sx={menuItemSx}>
                <BlogComponentEditorMenu props={menuProps} />
            </Grid>
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