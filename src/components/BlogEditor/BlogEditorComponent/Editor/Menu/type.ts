export const BlogEditorComponentEditorComponentKeyValues = {
    All: "All",
    Headline: "Headline",
    Article: "Article", 
    Image: "Image",
    Line: "Line",
    Table: "Table",
} as const;

export type BlogEditorComponentEditorComponentType = typeof BlogEditorComponentEditorComponentKeyValues[keyof typeof BlogEditorComponentEditorComponentKeyValues];