export type BlogComponentContentStyleListItem = {
    Id: string,
    Start: number,
    End: number,
    Style: BlogComponentContentStyleType
}

export const BlogComponentContentStyleKeyValues = {
    Bold: "Bold",
    Italic: "Italic",
    Underline: "Underline"
} as const;

export type BlogComponentContentStyleType = typeof BlogComponentContentStyleKeyValues[keyof typeof BlogComponentContentStyleKeyValues];
