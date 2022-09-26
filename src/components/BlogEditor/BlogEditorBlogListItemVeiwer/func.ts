import { BlogEditorBlogListItemViewerItemPattern } from "./type";

export const getBlogEditorBlogListItemViewerItemPatterns = (): Array<BlogEditorBlogListItemViewerItemPattern> => {
    const widthes = [ 400, 550, 700 ];
    const heights = [ 150, 180, 210 ];
    const titles = [ "Small", "Medium", "Large" ];
    return heights.map((_, i) => {
        const item: BlogEditorBlogListItemViewerItemPattern = {
            height: heights[i],
            width: widthes[i],
            title: titles[i],
        }
        return item;
    });
}