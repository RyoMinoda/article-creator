import { BlogObj } from "../../../../models/state/Blog/obj";
import { BlogEditorPopupType } from "../../../../organizations/BlogEditor/type";

export type BlogEditorMenuPropertyComponentProps = {
    width: number,
    height: number,
    sidePadding: number,
    Blog: BlogObj,
    updateBlog: (blog: BlogObj) => void,
    showPopup: (type: BlogEditorPopupType) => void,
}

export const BlogEditorSubmenuPropertyItemKeyValues = {
    Title: "Title",
    Detail: "Detail",
    Thumbnail: "Thumbnail",
    Tags: "Tags"
} as const;

export type BlogEditorSubmenuPropertyItemType = typeof BlogEditorSubmenuPropertyItemKeyValues[keyof typeof BlogEditorSubmenuPropertyItemKeyValues];