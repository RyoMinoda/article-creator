import { Box, SxProps, Theme } from "@mui/material";
import { BlogObj } from "../../../../models/state/Blog/obj";
import { BlogEditorSubmenuPropertyDetailTextField } from "../../../TextField/BlogEditorSubmenuPropertyDetailTextField";
import { BlogEditorSubmenuPropertyTitleTextField } from "../../../TextField/BlogEditorSubmenuPropertyTitleTextField";
import { BlogEditorSubmenuThmubnailEditor } from "./BlogEditorSubmenuThmubnailEditor";
import { GetSubmenuPropertyItemHeight } from "./func";
import { BlogEditorMenuPropertyComponentProps } from "./type";
import { BlogEditorSubmenuTagsEditor } from "./BlogEditorSubmenuTagsEditor";
import { BlogEditorSubmenuOthersEditor } from "./BlogEditorSubmenuOthersEditor";
import { BlogEditorSubmenuItemAccordionLayout, BlogEditorSubmenuItemAccordionLayoutProps } from "../BlogEditorSubmenuItemAccordionLayout";
import { BlogEditorDialogType } from "../../../../organizations/BlogEditor/type";
import { useContext } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { BlogEditorSubmenuAccordionKeyValues, BlogEditorSubmenuAccordionType } from "../types";
import { BlogComponentListItemObj } from "../../../../models/state/BlogComponent/obj";
import { StorageOperationType } from "../../../../utils/StorageOperation";

export type BlogEditorSubmenuPropertyMapProps = {
    width: number,
    height: number,
    title: string,
    accordionTitleHeight: number,
    Blog: BlogObj,
    index: number,
    isShown: boolean,
    updateBlog: (Blog: BlogObj) => void,
    updateIsShown: () => void,
    showDialog: (type: BlogEditorDialogType) => void,
    updateBlogComponentList: (componentItem: BlogComponentListItemObj, operation: StorageOperationType) => void,
}


export const BlogEditorSubmenuPropertyMap = ({ props }: { props: BlogEditorSubmenuPropertyMapProps }) => {
    const { width, height, Blog, updateBlog, showDialog, title, index, accordionTitleHeight, isShown, updateIsShown } = props;
    const { Palette } = useContext(UiParamsContext);
    const contentItemHeight = 32;
    const sidePadding = 1;
    const contentHeight = GetSubmenuPropertyItemHeight(contentItemHeight, title as BlogEditorSubmenuAccordionType);
    const layoutProps: BlogEditorSubmenuItemAccordionLayoutProps = {
        width, 
        titleHeight: accordionTitleHeight,
        detailHeight: contentHeight,
        index,
        title,
        isShown,
        updateIsShown
    }
    const itemProps: BlogEditorMenuPropertyComponentProps = {
        width,
        height: contentHeight - 2 * 8 * 2,
        sidePadding,
        Blog,
        updateBlog,
        showDialog
    }
    var Component = <></>;
    switch (title) {
        case BlogEditorSubmenuAccordionKeyValues.PropertyTitle:
            Component = <BlogEditorSubmenuPropertyTitleTextField props={itemProps} />;
            break;
        case BlogEditorSubmenuAccordionKeyValues.PropertyDetail:
            Component = <BlogEditorSubmenuPropertyDetailTextField props={itemProps} />;
            break;
        case BlogEditorSubmenuAccordionKeyValues.PropertyThumbnail:
            Component = <BlogEditorSubmenuThmubnailEditor props={itemProps} />
            break;
        case BlogEditorSubmenuAccordionKeyValues.PropertyTags:
            Component = <BlogEditorSubmenuTagsEditor props={itemProps} />;
            break;
        case BlogEditorSubmenuAccordionKeyValues.PropertyOthers:
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