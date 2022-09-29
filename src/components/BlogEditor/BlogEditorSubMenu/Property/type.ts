import { BlogObj } from "../../../../models/state/Blog/obj";
import { BlogEditorDialogType } from "../../../../organizations/BlogEditor/type";

export type BlogEditorMenuPropertyComponentProps = {
    width: number,
    height: number,
    sidePadding: number,
    Blog: BlogObj,
    updateBlog: (blog: BlogObj) => void,
    showDialog: (type: BlogEditorDialogType) => void,
}

export const BlogEditorSubmenuPropertyItemKeyValues = {
    Title: "Title",
    Detail: "Detail",
    Thumbnail: "Thumbnail",
    Tags: "Tags",
    Others: "Others"
} as const;

export type BlogEditorSubmenuPropertyItemType = typeof BlogEditorSubmenuPropertyItemKeyValues[keyof typeof BlogEditorSubmenuPropertyItemKeyValues];