import { BlogComponentListItemObj } from "../../../../../../models/state/BlogComponent/obj";
import { BlogEditorComponentEditorComponentItemMeta } from "../../type";

export type BlogEditorComponentEditorMainComponentProps = {
    BlogComponentItemMeta: BlogEditorComponentEditorComponentItemMeta,
    BlogComponentItem: BlogComponentListItemObj,
    isActive: boolean,
    width: number,
    height: number,
}