import { BlogObj } from "../../../../../../models/state/Blog/obj";
import { BlogComponentListItemObj } from "../../../../../../models/state/BlogComponent/obj";
import { MousePosition } from "../../../../../../models/utils/MousePosition/type";
import { StorageOperationType } from "../../../../../../utils/StorageOperation";
import { BlogEditorComponentEditorComponentItemMeta } from "../../type";

export type BlogEditorComponentEditorMainComponentProps = {
    BlogComponentItemMeta: BlogEditorComponentEditorComponentItemMeta,
    BlogComponentItem: BlogComponentListItemObj,
    isActive: boolean,
    width: number,
    height: number,
    mousePosition: MousePosition,
    isPositionMode: boolean,
    updateBlogComponentList: (componentItem: BlogComponentListItemObj, operation: StorageOperationType) => void,
    updateIsPositionMode: (bool: boolean) => void,
}

export type BlogEditorComponentEditorMainComponentItemProps = {
    BlogComponentItemMeta: BlogEditorComponentEditorComponentItemMeta,
    BlogComponentItem: BlogComponentListItemObj,
    isActive: boolean,
    activeWidth: number,
    activeHeight: number,
    height: number,
    paddingLR: number,
    paddingTB: number,
    titleHeight: number,
    mousePosition: MousePosition,
    isPositionMode: boolean,
    updateBlogComponentList: (componentItem: BlogComponentListItemObj, operation: StorageOperationType) => void,
    updateIsPositionMode: (bool: boolean) => void,
}