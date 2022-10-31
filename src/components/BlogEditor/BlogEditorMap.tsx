import { BlogComponentListItemObj, BlogComponentListObj } from "../../models/state/BlogComponent/obj";
import { BlogEditorMainComponentProps, BlogEditorMenuTabType, BlogEditorModeKeyValues, BlogEditorModeType } from "./type";
import { BlogObj } from "../../models/state/Blog/obj";
import { BlogEditorFlow } from "./BlogEditorFlow/BlogEditorFlow";
import { BlogEditorBlogListItemViewer } from "./BlogEditorBlogListItemVeiwer/BlogEditorBlogListItemViewer";
import { Box, SxProps, Theme } from "@mui/material";
import { BlogEditorDialogType } from "../../organizations/BlogEditor/type";
import { BlogEditorComponent } from "./BlogEditorComponent/BlogEditorComponent";
import { MousePosition } from "../../models/utils/MousePosition/type";
import { StorageOperationType } from "../../utils/StorageOperation";
import { BlogPageListObj, BlogPageObj } from "../../models/state/BlogPage/obj";

export type BlogEditorMapProps = {
    Blog: BlogObj,
    BlogComponentList: BlogComponentListObj,
    BlogPageList: BlogPageListObj,
    BlogPage: BlogPageObj,
    width: number,
    height: number,
    menuHeight: number,
    menuBottomMargin: number,
    emptyRowCount: number,
    tabType: string,
    modeType: string,
    mousePosition: MousePosition,
    activeBlogComponentId: string,
    updateActiveBlogComponentId: (id: string) => void,
    updateTabType: (tabType: BlogEditorMenuTabType) => void,
    updateModeType: (modeType: BlogEditorModeType) => void,
    showDialog: (type: BlogEditorDialogType) => void,
    updateBlogPage: (page: number, operation: StorageOperationType) => void,
    updateBlogPageList: (page: BlogPageObj, operation: StorageOperationType) => void,
    updateBlogComponent: (componentItem: BlogComponentListItemObj, operation: StorageOperationType) => void,
    updateBlogComponentList: (componentItem: BlogComponentListItemObj, operation: StorageOperationType) => void,
}

export const BlogEditorMap = ({ props }: { props: BlogEditorMapProps }) => {
    const { modeType, Blog, width, height } = props;
    const componentProps: BlogEditorMainComponentProps = {
        ...props
    }
    var Component = <></>;
    switch (modeType) {
        case  BlogEditorModeKeyValues.Flow:
            Component = <BlogEditorFlow props={componentProps} />;
            break;
        case BlogEditorModeKeyValues.Property:
            Component = <BlogEditorBlogListItemViewer props={componentProps} />;
            break;
        case BlogEditorModeKeyValues.Component:
            Component = <BlogEditorComponent props={componentProps} />;
            break;
    }
    const boxSx: SxProps<Theme> = {
        width,
        height,
        overflow: "scroll"
    }
    return (
        <Box sx={boxSx}>
            {Component}
        </Box>
    )
}