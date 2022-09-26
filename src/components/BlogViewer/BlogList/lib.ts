import { BlogViewerBlogListItemStyleKeyValues, BlogViewerBlogListItemStyleSet } from "./type";


const BlogViewerBlogListItemTitleOnly: BlogViewerBlogListItemStyleSet = {
    type: BlogViewerBlogListItemStyleKeyValues.TitleOnly,
    minWidth: 240,
    maxWidth: 720,
    height: 80,
}

const BlogViewerBlogListItemNoThumbnail: BlogViewerBlogListItemStyleSet = {
    type: BlogViewerBlogListItemStyleKeyValues.NoThumbnail,
    minWidth: 360,
    maxWidth: 720,
    height: 120,
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