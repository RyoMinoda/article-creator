export type BlogViewerBlogListItemStyleSet = {
    type: BlogViewerBlogListItemStyleType,
    maxWidth: number,
    minWidth: number,
    height: number,
}

export const BlogViewerBlogListItemStyleKeyValues = {
    NoThumbnail: "No Thumbnail",
    ThumbnailMain: "Thumbnail Main",
    Short: "Short",
    All: "All",
} as const;

export type BlogViewerBlogListItemStyleType = typeof BlogViewerBlogListItemStyleKeyValues[keyof typeof BlogViewerBlogListItemStyleKeyValues];