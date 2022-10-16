import { DateTime } from "../../utils/DateTime/obj";

export type BlogComponentListItem = {
    MenuTitle: string,
    X: number,
    Y: number,
    ComponentType: BlogComponentType,
    RowSpan: number,
    ColumnSpan: number,
    StrContent: string;
}

export const BlogComponentKeyValues = {
    Headline: "Headline",
    Article: "Article", 
    Image: "Image",
    Line: "Line",
    Table: "Table",
} as const;

export type BlogComponentType = typeof BlogComponentKeyValues[keyof typeof BlogComponentKeyValues];


