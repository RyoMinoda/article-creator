import { Position } from "../../utils/Position/obj";
import { Span } from "../../utils/Span/obj";
import { BlogComponentContentKeyValues, BlogComponentListItem, BlogComponentListItemOverflowKeyValues } from "./type";

export const initialBlogComponent: BlogComponentListItem = {
    MenuTitle: "",
    Position: Position.getUndefined(),
    Span: Span.getUndefined(),
    ContentList: [],
    OverflowType: BlogComponentListItemOverflowKeyValues.Ignored,
    ContentType: BlogComponentContentKeyValues.Text,
    FontSize: 16,
}

export const no1BlocComponent: BlogComponentListItem = {
    MenuTitle: "",
    Position: new Position(0, 10),
    Span: new Span(4, 3),
    ContentList: [],
    OverflowType: BlogComponentListItemOverflowKeyValues.Ignored,
    ContentType: BlogComponentContentKeyValues.Text,
    FontSize: 16,
}
