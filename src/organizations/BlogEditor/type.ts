import { BlogObj } from "../../models/state/Blog/obj";
import { BlogPropertyType } from "../../models/state/Blog/type";
import { BlogTagListObj } from "../../models/state/BlogTag/obj";

export type BlogEditorDialogProps = {
    type: BlogEditorDialogType,
    Blog: BlogObj,
    BlogTagList: BlogTagListObj,
    windowWidth: number,
    color: string,
    blogPropertyType: BlogPropertyType,
    opacity?: number,
    showDialog: boolean,
    updateWindowWidth: (width: number) => void,
    updateBlog: (blog: BlogObj) => void,
    hideDialog: () => void
}

export const BlogEditorDialogKeyValues = {
    Preview: "Preview",
    Thumbnail: "Thumbnail",
    ThumbnailFontColorEdit: "ThumbnailFontColorEdit",
    ThumbnailBackColorEdit: "ThumbnailBackColorEdit",
    Tags: "Tags",
} as const;

export type BlogEditorDialogType = typeof BlogEditorDialogKeyValues[keyof typeof BlogEditorDialogKeyValues];
