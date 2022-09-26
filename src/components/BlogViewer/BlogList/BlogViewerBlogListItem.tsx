import { Box, SxProps, Theme } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { BlogObj } from "../../../models/state/Blog/obj";
import { BlogEditorPopupType } from "../../../organizations/BlogEditor/type";
import { getBlogViewerBlogListItemStyle } from "./func";
import { BlogViewerBlogListItemComponentAll } from "./ListItemComponent/BlogViewerBlogListItemComponentAll";
import { BlogViewerBlogListItemComponentThumbnailMain } from "./ListItemComponent/BlogViewerBlogListItemComponentThumbnailMain";
import { BlogViewerBlogListItemStyleKeyValues, BlogViewerBlogListItemStyleType } from "./type";

export type BlogViewerBlogListItemProps = {
    width: number,
    height: number,
    type: BlogViewerBlogListItemStyleType,
    Blog: BlogObj,
    showPopup: (type: BlogEditorPopupType) => void,
}

export const BlogViewerBlogListItem = ({ props }: { props: BlogViewerBlogListItemProps }) => {
    const { width, height, type } = props;
    const { Palette } = useContext(UiParamsContext);
    const containerSx: SxProps<Theme> = {
        width, height, borderRadius: 1,
        overflow: "hidden"
    }
    var Component = <></>;
    switch (type) {
        case BlogViewerBlogListItemStyleKeyValues.ThumbnailMain:
            Component = <BlogViewerBlogListItemComponentThumbnailMain props={props} />
            break;
        case BlogViewerBlogListItemStyleKeyValues.All:
            Component = <BlogViewerBlogListItemComponentAll props={props} />
            break;
    }
    return (
        <Box sx={containerSx}>
            {Component}
        </Box>
    );
}