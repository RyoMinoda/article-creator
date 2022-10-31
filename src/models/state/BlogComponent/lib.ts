import { Position } from "../../utils/Position/obj";
import { Span } from "../../utils/Span/obj";
import { BlogComponentListItem } from "./type";

export const initialBlogComponent: BlogComponentListItem = {
    MenuTitle: "",
    Position: Position.getUndefined(),
    Span: Span.getUndefined(),
    ContentList: []
}

export const no1BlocComponent: BlogComponentListItem = {
    MenuTitle: "",
    Position: new Position(0, 10),
    Span: new Span(4, 3),
    ContentList: []
}
