export type BlogComponentContentListItem = {
    Type: BlogComponentContentType,
    Text: string,
    Styles: Array<BlogComponentContentStyleType>
}

export const BlogComponentContentKeyValues = {
    Text: "Text",
    Image: "Image",
    Table: "Table"
} as const;

export type BlogComponentContentType = typeof BlogComponentContentKeyValues[keyof typeof BlogComponentContentKeyValues];

export const BlogComponentContentStyleKeyValues = {
    Bold: "Bold",
    Italic: "Italic",
} as const;

export type BlogComponentContentStyleType = typeof BlogComponentContentStyleKeyValues[keyof typeof BlogComponentContentStyleKeyValues];
