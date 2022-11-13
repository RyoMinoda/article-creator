import { DateTime } from "../../utils/DateTime/obj";
import { Position } from "../../utils/Position/obj";
import { Span } from "../../utils/Span/obj";
import { BlogComponentContentListItemObj } from "../BlogComponentContent/obj";

export type BlogComponentListItem = {
    MenuTitle: string,
    Position: Position,
    Span: Span,
    OverflowType: BlogComponentListItemOverflowType,
    ContentList: Array<BlogComponentContentListItemObj>,
    ContentType: BlogComponentContentType,
    FontSize: number,
}

export const BlogComponentListItemAlignKeyValues = {
    Left: "Left",
    Center: "Center",
    Right: "Right"
} as const;

export type BlogComponentListItemAlignType = typeof BlogComponentListItemAlignKeyValues[keyof typeof BlogComponentListItemAlignKeyValues];

export const BlogComponentListItemOverflowKeyValues = {
    Hidden: "Hidden",
    Ignored: "Ignored"
} as const;

export type BlogComponentListItemOverflowType = typeof BlogComponentListItemOverflowKeyValues[keyof typeof BlogComponentListItemOverflowKeyValues];

export const BlogComponentContentKeyValues = {
    Text: "Text",
    Image: "Image",
    Table: "Table"
} as const;

export type BlogComponentContentType = typeof BlogComponentContentKeyValues[keyof typeof BlogComponentContentKeyValues];
