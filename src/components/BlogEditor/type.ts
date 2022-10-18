import { BlogObj } from "../../models/state/Blog/obj";
import { BlogComponentListItemObj, BlogComponentListObj } from "../../models/state/BlogComponent/obj";
import { MousePosition } from "../../models/utils/MousePosition/type";
import { BlogEditorDialogType } from "../../organizations/BlogEditor/type";
import { StorageOperationType } from "../../utils/StorageOperation";
import { BlogEditorComponentEditorComponentItemMeta } from "./BlogEditorComponent/Editor/type";

export type BlogEditorMainComponentProps = {
    BlogComponentList: BlogComponentListObj,
    width: number,
    height: number,
    mousePosition: MousePosition,
    componentMetas: Array<BlogEditorComponentEditorComponentItemMeta>,
    Blog: BlogObj,
    activeBlogComponentId: string,
    showDialog: (type: BlogEditorDialogType) => void,
    updateActiveBlogComponentId: (id: string) => void,
    updateComponentMetas: (componentMeta: BlogEditorComponentEditorComponentItemMeta, operation: StorageOperationType) => void,
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