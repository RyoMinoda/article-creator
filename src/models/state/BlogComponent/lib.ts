import { Position } from "../../utils/Position/obj";
import { Span } from "../../utils/Span/obj";
import { BlogComponentListItem, BlogComponentKeyValues } from "./type";

export const initialBlogComponent: BlogComponentListItem = {
    MenuTitle: "",
    StrContent: "",
    Position: Position.getUndefined(),
    ComponentType: BlogComponentKeyValues.Article,
    Span: Span.getUndefined(),
    Styles: []
}

export const no1BlocComponent: BlogComponentListItem = {
    MenuTitle: "",
    StrContent: "",
    Position: new Position(0, 10),
    ComponentType: BlogComponentKeyValues.Article,
    Span: new Span(4, 3),
    Styles: []
}
