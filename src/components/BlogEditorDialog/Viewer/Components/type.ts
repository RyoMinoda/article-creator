import { BlogComponentListItemObj } from "../../../../models/state/BlogComponent/obj"
import { BlogComponentContentListItemObj } from "../../../../models/state/BlogComponentContent/obj"
import { BlogComponentContentStyleListItemObj } from "../../../../models/state/BlogComponentContentStyle/obj"
import { BlogPageObj } from "../../../../models/state/BlogPage/obj"

export type BlogComponentEditorViewerComponentProps = {
    BlogPage: BlogPageObj,
    BlogComponentListItem: BlogComponentListItemObj,
    BlogComponentContentList: BlogComponentContentListItemObj[],
    BlogComponentContentStyleList: BlogComponentContentStyleListItemObj[],
    cellWidth: number,
    cellHeight: number,
}