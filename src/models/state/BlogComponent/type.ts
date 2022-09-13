export type BlogComponent = {
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
    Article: "Article", 
    Picture: "Picture",
    Line: "Line",
    Table: "Table",
    Headline: "Headline"
} as const;

export type BlogComponentType = typeof BlogComponentKeyValues[keyof typeof BlogComponentKeyValues];