import { Box, SxProps, Theme } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { BlogObj } from "../../../../models/state/Blog/obj";
import { BlogListObj } from "../../../../models/state/BlogList/obj";
import { BlogTagListObj } from "../../../../models/state/BlogTag/obj";
import { BlogEditorSubmenuItemAccordionLayout, BlogEditorSubmenuItemAccordionLayoutProps } from "../BlogEditorSubmenuItemAccordionLayout";
import { BlogEditorSubmenuAccordionKeyValues, BlogEditorSubmenuAccordionType, BlogEditorSubmenuSearchGenreType } from "../types";
import { BlogEditorSubmenuFilesBlogList, BlogEditorSubmenuFilesComponentProps, BlogEditorSubmenuFilesHistoryList, BlogEditorSubmenuFilesSearchComponent, BlogEditorSubmenuFilesTagList } from "./BlogEditorSubmenuFilesComponent";

export type BlogEditorSubmenuFilesMapProps = {
    index: number,
    title: string,
    titleHeight: number,
    detailHeight: number,
    blogItemHeight: number,
    width: number,
    isShown: boolean,
    searchInput: string,
    accordion: BlogEditorSubmenuAccordionType,
    activeSearchGenre: BlogEditorSubmenuSearchGenreType,
    activeTagIdList: Array<string>,
    Blog: BlogObj,
    BlogList: BlogListObj,
    BlogTagList: BlogTagListObj,
    BlogEditHistoryList: BlogListObj,
    updateIsShown: () => void,
    updateActiveTagIdList: (tags: Array<string>) => void,
    updateActiveSearchGenre: (genre: BlogEditorSubmenuSearchGenreType) => void,
    updateSearchInput: (input: string) => void
}

export const BlogEditorSubmenuFilesMap = ({ props }: { props: BlogEditorSubmenuFilesMapProps }) => {
    const { isShown, detailHeight, width, accordion, updateActiveSearchGenre, searchInput } = props;
    const { Palette } = useContext(UiParamsContext);
    const containerHeight = isShown ? detailHeight : 0;
    const containerSx: SxProps<Theme> = {
        display: isShown ? "inherit" : "none",
        height: containerHeight,
        width,
        bgcolor: Palette.Background.Main
    }
    const componentProps: BlogEditorSubmenuFilesComponentProps = {
        ...props,
        height: containerHeight,
        searchInput,
        updateActiveSearchGenre,
        sidePadding: 5,
    }
    var Component = <></>;
    switch (accordion) {
        case BlogEditorSubmenuAccordionKeyValues.FilesSearch:
            Component = <BlogEditorSubmenuFilesSearchComponent props={componentProps} />;
            break;
        case BlogEditorSubmenuAccordionKeyValues.FilesTags:
            Component = <BlogEditorSubmenuFilesTagList props={componentProps} />
            break;
        case BlogEditorSubmenuAccordionKeyValues.FilesHistory:
            Component = <BlogEditorSubmenuFilesHistoryList props={componentProps} />
            break;
        case BlogEditorSubmenuAccordionKeyValues.FilesBlogs:
            Component = <BlogEditorSubmenuFilesBlogList props={componentProps} />
            break;
    }
    return (
        <BlogEditorSubmenuItemAccordionLayout props={props}>
            <Box sx={containerSx}>
                {Component}
            </Box>
        </BlogEditorSubmenuItemAccordionLayout>
    )
}

