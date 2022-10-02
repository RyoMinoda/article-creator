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
import { BlogEditorSubmenuItemAccordionLayout, BlogEditorSubmenuItemAccordionLayoutProps } from "../BlogEditorSubmenuItemAccordionLayout";
import { BlogEditorDialogType } from "../../../../organizations/BlogEditor/type";
import { useContext } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";

export type BlogEditorSubmenuPropertyMapProps = {
    width: number,
    height: number,
    title: string,
    accordionTitleHeight: number,
    showDialog: (type: BlogEditorDialogType) => void,
    Blog: BlogObj,
    updateBlog: (Blog: BlogObj) => void,
    index: number,
}


export const BlogEditorSubmenuPropertyMap = ({ props }: { props: BlogEditorSubmenuPropertyMapProps }) => {
    const { width, height, Blog, updateBlog, showDialog, title, index, accordionTitleHeight } = props;
    const { Palette } = useContext(UiParamsContext);
    const contentItemHeight = 32;
    const sidePadding = 1;
    const contentHeight = getSubmenuPropertyItemHeight(contentItemHeight, title as BlogEditorSubmenuPropertyItemType);
    const layoutProps: BlogEditorSubmenuItemAccordionLayoutProps = {
        width, 
        titleHeight: accordionTitleHeight,
        detailHeight: contentHeight,
        index,
        title,
        isShown: true,
        updateIsShown: () => {}
    }
    const itemProps: BlogEditorMenuPropertyComponentProps = {
        width,
        height: contentHeight - 2 * 8,
        sidePadding,
        Blog,
        updateBlog,
        showDialog
    }
    var Component = <></>;
    switch (title) {
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
    const innerBoxSx: SxProps<Theme> = {
        bgcolor: Palette.Background.Main,
        height: contentHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    return (
        <BlogEditorSubmenuItemAccordionLayout props={layoutProps}>
            <Box sx={innerBoxSx}>
                {Component}
            </Box>
        </BlogEditorSubmenuItemAccordionLayout>
    );
}