import { DateTime } from "../../utils/DateTime/obj";
import { Position } from "../../utils/Position/obj";
import { Span } from "../../utils/Span/obj";
import { BlogComponentContentListItemObj } from "../BlogComponentContent/obj";

export type BlogComponentListItem = {
    MenuTitle: string,
    Position: Position,
    Span: Span,
    ContentList: Array<BlogComponentContentListItemObj>
}


