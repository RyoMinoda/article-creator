import { BlogViewerBlogListItemStyles } from "./lib"

export const getBlogViewerBlogListItemStyle = (width: number) => {
    const target = BlogViewerBlogListItemStyles.filter(x => x.minWidth <= width && width < x.maxWidth);
    return target[0].type;
}