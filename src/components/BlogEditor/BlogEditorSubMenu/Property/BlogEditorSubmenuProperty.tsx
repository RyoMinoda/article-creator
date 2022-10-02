import { Box, SxProps, Theme } from "@mui/material";
import { BlogObj } from "../../../../models/state/Blog/obj";
import { BlogEditorSubmenuPropertyDetailTextField } from "../../../TextField/BlogEditorSubmenuPropertyDetailTextField";
import { BlogEditorSubmenuPropertyTitleTextField } from "../../../TextField/BlogEditorSubmenuPropertyTitleTextField";
import { BlogEditorSubmenuItemProps } from "../types";
import { BlogEditorSubmenuThmubnailEditor } from "./BlogEditorSubmenuThmubnailEditor";
import { getSubmenuPropertyItemHeight } from "./func";
import { BlogEditorMenuPropertyComponentProps, BlogEditorSubmenuPropertyItemKeyValues, BlogEditorSubmenuPropertyItemType } from "./type";
import { BlogEditorSubmenuTagsEditor } from "./BlogEditorSubmenuTagsEditor";
import { BlogEditorSubmenuOthersEditor } from "./BlogEditorSubmenuOthersEditor";
import { BlogEditorSubmenuPropertyMap, BlogEditorSubmenuPropertyMapProps } from "./BlogEditorSubmenuPropertyMap";

export const BlogEditorSubmenuProperty = ({ props }: { props: BlogEditorSubmenuItemProps }) => {
    const { width, height, Blog, updateBlog, showDialog } = props;
    const entireSx: SxProps<Theme> = {
        width, height,
        overflow: "hidden",
        overflowY: "scroll"
    }
    return (
        <Box sx={entireSx}>
            {Object.keys(BlogEditorSubmenuPropertyItemKeyValues).map((x: string, i: number) => {
                const nextProps: BlogEditorSubmenuPropertyMapProps = {
                    ...props,
                    width,
                    height,
                    title: x,
                    index: i,
                }
                return <BlogEditorSubmenuPropertyMap props={nextProps} />
            })}
        </Box>
    );
}