import { BlogViewerBlogListItemStyleKeyValues, BlogViewerBlogListItemStyleSet } from "./type";


const BlogViewerBlogListItemTitleOnly: BlogViewerBlogListItemStyleSet = {
    type: BlogViewerBlogListItemStyleKeyValues.Short,
    minWidth: 240,
    maxWidth: 720,
    height: 100,
}

const BlogViewerBlogListItemNoThumbnail: BlogViewerBlogListItemStyleSet = {
    type: BlogViewerBlogListItemStyleKeyValues.NoThumbnail,
    minWidth: 360,
    maxWidth: 720,
    height: 140,
}

const BlogViewerBlogListItemThumbnailMain: BlogViewerBlogListItemStyleSet = {
    type: BlogViewerBlogListItemStyleKeyValues.ThumbnailMain,
    minWidth: 120,
    maxWidth: 300,
    height: 260
}

const BlogViewerBlogListItemAll: BlogViewerBlogListItemStyleSet = {
    type: BlogViewerBlogListItemStyleKeyValues.All,
    minWidth: 480,
    maxWidth: 720,
    height: 160
}

export const BlogViewerBlogListItemStyles = [
    BlogViewerBlogListItemTitleOnly,
    BlogViewerBlogListItemNoThumbnail,
    BlogViewerBlogListItemThumbnailMain,
    BlogViewerBlogListItemAll
];