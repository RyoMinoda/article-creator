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
