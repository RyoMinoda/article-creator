import { Grid, SxProps, Theme } from "@mui/material";
import { BlogViewerBlogListItem, BlogViewerBlogListItemProps } from "../../BlogViewer/BlogList/BlogViewerBlogListItem";
import { BlogViewerBlogListItemStyles } from "../../BlogViewer/BlogList/lib";
import { BlogEditorMainComponentProps } from "../type";
import { BlogEditorBlogListItemViewerItemLayout, BlogEditorBlogListItemViewerItemLayoutProps } from "./BlogEditorBlogListItemViewerItemLayout";

export const BlogEditorBlogListItemViewer = ({ props }: { props: BlogEditorMainComponentProps }) => {
    const { height, width, Blog, showDialog } = props;
    const emptyHeight = 40;
    const titleHeight = 30;
    const patterns = BlogViewerBlogListItemStyles;
    const heights = patterns.map(x => x.height);
    const gridHeight = heights.reduce((a, b) => a + b + emptyHeight + titleHeight);
    const widthes = patterns.map(x => (x.minWidth + x.maxWidth) / 2);
    const maxWidth = Math.max(...widthes);
    const targetWidth = maxWidth > width ? maxWidth : width;
    const minPadding = 2;
    const containerSx: SxProps<Theme> = {
        width: targetWidth + minPadding, 
        height: gridHeight
    }
    return (
        <Grid container sx={containerSx}>
            {patterns.map(item => {
                const layoutProps: BlogEditorBlogListItemViewerItemLayoutProps = {
                    width: targetWidth,
                    height: item.height + titleHeight + emptyHeight,
                    title: item.type,
                    itemWidth: item.minWidth,
                    titleHeight,
                    emptyHeight,
                    maxItemWidth: maxWidth,
                    minPadding
                }
                const itemProps: BlogViewerBlogListItemProps = {
                    width: (item.minWidth + item.maxWidth) / 2,
                    height: item.height,
                    Blog,
                    type: item.type,
                    showDialog
                }
                return (
                    <Grid item key={"size-" + item.type}>
                        <BlogEditorBlogListItemViewerItemLayout props={layoutProps}>
                            <BlogViewerBlogListItem props={itemProps} />
                        </BlogEditorBlogListItemViewerItemLayout>
                    </Grid>
                );
            })}
        </Grid>
    );
}