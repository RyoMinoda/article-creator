import { BlogComponentListItemObj } from "../../../../models/state/BlogComponent/obj"
import { BlogComponentContentListItemObj } from "../../../../models/state/BlogComponentContent/obj"
import { BlogPageObj } from "../../../../models/state/BlogPage/obj"

export type BlogComponentEditorViewerComponentProps = {
    BlogPage: BlogPageObj,
    BlogComponentListItem: BlogComponentListItemObj,
    cellWidth: number,
    cellHeight: number,
}