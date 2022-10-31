import { BlogObj } from "../../models/state/Blog/obj";
import { BlogPropertyType } from "../../models/state/Blog/type";
import { BlogComponentListItemObj } from "../../models/state/BlogComponent/obj";
import { BlogComponentContentListItemObj, BlogComponentContentListObj } from "../../models/state/BlogComponentContent/obj";
import { BlogComponentContentListItem } from "../../models/state/BlogComponentContent/types";
import { BlogPageObj } from "../../models/state/BlogPage/obj";
import { BlogTagListObj } from "../../models/state/BlogTag/obj";
import { StorageOperationType } from "../../utils/StorageOperation";

export type BlogEditorDialogProps = {
    type: BlogEditorDialogType,
    Blog: BlogObj,
    BlogPage: BlogPageObj,
    BlogTagList: BlogTagListObj,
    BlogComponent: BlogComponentListItemObj,
    BlogComponentContentList: BlogComponentContentListObj,
    windowWidth: number,
    color: string,
    blogPropertyType: BlogPropertyType,
    opacity?: number,
    showDialog: boolean,
    updateWindowWidth: (width: number) => void,
    updateBlog: (blog: BlogObj) => void,
    updateBlogComponent: (component: BlogComponentListItemObj, operation: StorageOperationType) => void,
    updateBlogComponentContentList: (blogComponentContentItem: BlogComponentContentListItemObj, operation: StorageOperationType) => void,
    hideDialog: () => void
}

export const BlogEditorDialogKeyValues = {
    Preview: "Preview",
    Thumbnail: "Thumbnail",
    ThumbnailFontColorEdit: "ThumbnailFontColorEdit",
    ThumbnailBackColorEdit: "ThumbnailBackColorEdit",
    BlogTheme: "BlogTheme",
    Tags: "Tags",
    ArticleEditor: "ArticleEditor"
} as const;

export type BlogEditorDialogType = typeof BlogEditorDialogKeyValues[keyof typeof BlogEditorDialogKeyValues];
