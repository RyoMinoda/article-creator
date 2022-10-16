import { BlogComponentListItemObj, BlogComponentListObj } from "../../models/state/BlogComponent/obj";
import { BlogEditorMainComponentProps, BlogEditorMenuTabType, BlogEditorModeKeyValues, BlogEditorModeType } from "./type";
import { BlogObj } from "../../models/state/Blog/obj";
import { BlogEditorFlow } from "./BlogEditorFlow/BlogEditorFlow";
import { BlogEditorBlogListItemViewer } from "./BlogEditorBlogListItemVeiwer/BlogEditorBlogListItemViewer";
import { Box, SxProps, Theme } from "@mui/material";
import { BlogEditorDialogType } from "../../organizations/BlogEditor/type";
import { BlogEditorComponent } from "./BlogEditorComponent/BlogEditorComponent";
import { MousePosition } from "../../models/utils/MousePosition/type";
import { BlogEditorComponentEditorComponentItemMeta } from "./BlogEditorComponent/Editor/type";
import { StorageOperationType } from "../../utils/StorageOperation";

export type BlogEditorMapProps = {
    Blog: BlogObj,
    BlogComponentList: BlogComponentListObj,
    width: number,
    height: number,
    menuHeight: number,
    menuBottomMargin: number,
    emptyRowCount: number,
    tabType: string,
    modeType: string,
    mousePosition: MousePosition,
    componentMetas: Array<BlogEditorComponentEditorComponentItemMeta>,
    updateActiveBlogComponent: (id: string) => void,
    updateComponent: (component: BlogComponentListItemObj) => void,
    updateTabType: (tabType: BlogEditorMenuTabType) => void,
    updateModeType: (modeType: BlogEditorModeType) => void,
    showDialog: (type: BlogEditorDialogType) => void,
    updateComponentMetas: (componentMeta: BlogEditorComponentEditorComponentItemMeta, operation: StorageOperationType) => void,
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