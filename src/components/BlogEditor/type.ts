import { BlogObj } from "../../models/state/Blog/obj";
import { BlogEditorPopupType } from "../../organizations/BlogEditor/type";

export type BlogEditorMainComponentProps = {
    width: number,
    height: number,
    Blog: BlogObj,
    showPopup: (type: BlogEditorPopupType) => void,
}

export const BlogEditorModeKeyValues = {
    Files: "Files",
    Property: "Property",
    Map: "Map",
    Flow: "Flow",
} as const;

export type BlogEditorModeType = typeof BlogEditorModeKeyValues[keyof typeof BlogEditorModeKeyValues];

export const BlogEditorMenuTabKeyValues = {
    Home: "Home",
    Insert: "Insert",
    Article: "Article",
} as const;

export type BlogEditorMenuTabType = typeof BlogEditorMenuTabKeyValues[keyof typeof BlogEditorMenuTabKeyValues];