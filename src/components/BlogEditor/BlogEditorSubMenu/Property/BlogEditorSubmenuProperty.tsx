import { Box, SxProps, Theme } from "@mui/material";
import { BlogObj } from "../../../../models/state/Blog/obj";
import { BlogEditorSubmenuPropertyDetailTextField } from "../../../TextField/BlogEditorSubmenuPropertyDetailTextField";
import { BlogEditorSubmenuPropertyTitleTextField } from "../../../TextField/BlogEditorSubmenuPropertyTitleTextField";
import { BlogEditorSubmenuItemProps } from "../types";
import { BlogEditorSubmenuThmubnailEditor } from "./BlogEditorSubmenuThmubnailEditor";
import { BlogEditorSubmenuPropertyItemLayout, BlogEditorSubmenuPropertyItemLayoutProps } from "./BlogEditorSubmenuPropertyItemLayout";
import { getSubmenuPropertyItemHeight } from "./func";
import { BlogEditorMenuPropertyComponentProps, BlogEditorSubmenuPropertyItemKeyValues, BlogEditorSubmenuPropertyItemType } from "./type";
import { BlogEditorSubmenuTagsEditor } from "./BlogEditorSubmenuTagsEditor";
import { BlogEditorSubmenuOthersEditor } from "./BlogEditorSubmenuOthersEditor";

export const BlogEditorSubmenuProperty = ({ props }: { props: BlogEditorSubmenuItemProps }) => {
    const { width, height, Blog, updateBlog, showDialog } = props;
    const entireSx: SxProps<Theme> = {
        width, height,
        overflow: "hidden",
        overflowY: "scroll"
    }
    const titleHeight = 25;
    const contentItemHeight = 30;
    const emptyHeight = 15;
    const sidePadding = 1;
    return (
        <Box sx={entireSx}>
            {Object.keys(BlogEditorSubmenuPropertyItemKeyValues).map((x: string) => {
                const contentHeight = getSubmenuPropertyItemHeight(contentItemHeight, x as BlogEditorSubmenuPropertyItemType);
                const layoutProps: BlogEditorSubmenuPropertyItemLayoutProps = {
                    type: x,
                    width, titleHeight,
                    contentHeight,
                    emptyHeight,
                    showDialog
                }
                const itemProps: BlogEditorMenuPropertyComponentProps = {
                    width,
                    height: contentHeight,
                    sidePadding,
                    Blog,
                    updateBlog,
                    showDialog
                }
                var Component = <></>;
                switch (x) {
                    case BlogEditorSubmenuPropertyItemKeyValues.Title:
                        Component = <BlogEditorSubmenuPropertyTitleTextField props={itemProps} />;
                        break;
                    case BlogEditorSubmenuPropertyItemKeyValues.Detail:
                        Component = <BlogEditorSubmenuPropertyDetailTextField props={itemProps} />;
                        break;
                    case BlogEditorSubmenuPropertyItemKeyValues.Thumbnail:
                        Component = <BlogEditorSubmenuThmubnailEditor props={itemProps} />
                        break;
                    case BlogEditorSubmenuPropertyItemKeyValues.Tags:
                        Component = <BlogEditorSubmenuTagsEditor props={itemProps} />;
                        break;
                    case BlogEditorSubmenuPropertyItemKeyValues.Others:
                        Component = <BlogEditorSubmenuOthersEditor props={itemProps} />;
                        break;
                }
                return (
                    <BlogEditorSubmenuPropertyItemLayout props={layoutProps} key={x}>
                        {Component}
                    </BlogEditorSubmenuPropertyItemLayout>
                );
            })}
        </Box>
    );
}