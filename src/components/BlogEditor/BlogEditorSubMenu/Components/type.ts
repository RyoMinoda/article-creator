import { BlogComponentListItemObj, BlogComponentListObj } from "../../../../models/state/BlogComponent/obj"
import { BlogComponentType } from "../../../../models/state/BlogComponent/type"

export type BlogEditorSubmenuComponentsMapItemProps = {
    width: number,
    height: number,
    BlogComponentList: BlogComponentListObj,
    createBlogEmptyComponent: (componentType: BlogComponentType) => void
}