export type BlogComponentList = {
    List: Array<BlogComponentListItem>
}

export type BlogComponentListItem = {
    BlogComponentId: string,
    X: number,
    Y: number,
    ComponentType: BlogComponentType,
    RowSpan: number,
    ColumnSpan: number,
    ComponentTitle: string,
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