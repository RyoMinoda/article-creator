import { BlogObj } from "../../models/state/Blog/obj";
import { BlogComponentListItemObj, BlogComponentListObj } from "../../models/state/BlogComponent/obj";
import { BlogPageListObj } from "../../models/state/BlogPage/obj";
import { MousePosition } from "../../models/utils/MousePosition/type";
import { BlogEditorDialogType } from "../../organizations/BlogEditor/type";
import { StorageOperationType } from "../../utils/StorageOperation";

export type BlogEditorMainComponentProps = {
    BlogComponentList: BlogComponentListObj,
    BlogPageList: BlogPageListObj,
    width: number,
    height: number,
    mousePosition: MousePosition,
    Blog: BlogObj,
    activeBlogComponentId: string,
    currentPage: number,
    showDialog: (type: BlogEditorDialogType) => void,
    updateActiveBlogComponentId: (id: string) => void,
    updateCurrentPage: (page: number) => void,
    updateBlogComponentList: (componentItem: BlogComponentListItemObj, operation: StorageOperationType) => void,
}

export const BlogEditorModeKeyValues = {
    Files: "Files",
    Property: "Property",
    Component: "Component",
    Flow: "Flow",
} as const;

export type BlogEditorModeType = typeof BlogEditorModeKeyValues[keyof typeof BlogEditorModeKeyValues];

export const BlogEditorMenuTabKeyValues = {
    Home: "Home",
    Insert: "Insert",
    Article: "Article",
} as const;

export type BlogEditorMenuTabType = typeof BlogEditorMenuTabKeyValues[keyof typeof BlogEditorMenuTabKeyValues];