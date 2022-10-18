import { DateTime } from "../../utils/DateTime/obj";
import { Position } from "../../utils/Position/obj";
import { Span } from "../../utils/Span/obj";

export type BlogComponentListItem = {
    MenuTitle: string,
    Position: Position,
    ComponentType: BlogComponentType,
    Span: Span,
    StrContent: string;
    Styles: Array<BlogComponentStyleType>;
}

export const BlogComponentKeyValues = {
    Headline: "Headline",
    Article: "Article", 
    Image: "Image",
    Line: "Line",
    Table: "Table",
} as const;

export type BlogComponentType = typeof BlogComponentKeyValues[keyof typeof BlogComponentKeyValues];

export const BlogComponentStyleKeyValues = {
    HeadlineH1: "HeadlineH1",
    HeadlineH2: "HeadlineH2",
    HeadlineH3: "HeadlineH3",
}

export type BlogComponentStyleType = typeof BlogComponentStyleKeyValues[keyof typeof BlogComponentStyleKeyValues];

