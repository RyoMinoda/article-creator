import { BlogObj } from "../../models/state/Blog/obj";
import { BlogComponentType } from "../../models/state/BlogComponent/type";
import { MousePosition } from "../../models/utils/MousePosition/type";
import { BlogEditorDialogType } from "../../organizations/BlogEditor/type";

export type BlogEditorMainComponentProps = {
    width: number,
    height: number,
    mousePosition: MousePosition,
    Blog: BlogObj,
    activeComponentType: BlogComponentType | null,
    showDialog: (type: BlogEditorDialogType) => void,
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