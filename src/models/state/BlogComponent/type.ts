export type BlogComponent = {
    BlogComponentId: string,
    X: number,
    Y: number,
    ComponentType: BlogComponentType,
    RowSpan: number,
    ColumnSpan: number,
}

export const BlogComponentType = {
    Document: "Document", 
    Picture: "Picture",
    Line: "Line",
    Table: "Table",
    Headline: "Headline"
} as const;

export type BlogComponentType = typeof BlogComponentType[keyof typeof BlogComponentType];