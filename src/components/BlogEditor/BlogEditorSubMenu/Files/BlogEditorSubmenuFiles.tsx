import { Box, Grid, SxProps, Theme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { BlogObj } from "../../../../models/state/Blog/obj";
import { BlogListObj } from "../../../../models/state/BlogList/obj";
import { BlogTagListObj } from "../../../../models/state/BlogTag/obj";
import { BlogEditorSubmenuFilesAccordionLayout } from "./BlogEditorSubmenuFilesAccordionLayout";
import { BlogEditorSubmenuFilesBlogList, BlogEditorSubmenuFilesComponentProps, BlogEditorSubmenuFilesHistoryList, BlogEditorSubmenuFilesSearchComponent, BlogEditorSubmenuFilesTagList } from "./BlogEditorSubmenuFilesComponent";
import { GetSubmenuAccordionBlogsHeight, GetSubmenuAccordionBlogsHeightProps, GetSubmenuFileAccordionContentHeightProps, GetSubmenuFileDefaultAccordions } from "../func";
import { BlogEditorSubmenuFileAccordionKeyValues, BlogEditorSubmenuFileAccordionType, BlogEditorSubmenuItemProps, BlogEditorSubmenuSearchGenreType } from "../types";


export const BlogEditorSubmenuFiles = ({ props }: { props: BlogEditorSubmenuItemProps }) => {
    const { width, height, BlogList, BlogTagList, activeSearchGenre, updateActiveSearchGenre, updateSearchInput } = props;
    const [ isShowns, setIsShowns ] = useState<Array<boolean>>([]);
    const [ accordionHeights, setAccordionHeights ] = useState<Array<number>>([]);
    const [ accordionTypes, setAccordionTypes ] = useState<Array<BlogEditorSubmenuFileAccordionType>>([]);
    const itemHeight = 35;
    const blogItemHeight = 30;
    useEffect(() => {
        const accordionProps: GetSubmenuFileAccordionContentHeightProps = {
            itemHeight, heights: accordionHeights, entireHeight: height
        }
        const currentAccordions = GetSubmenuFileDefaultAccordions(accordionProps);
        const currentHeights = currentAccordions.map(x => x.height);
        const currentIsShowns = currentAccordions.map(x => x.isShown);
        const currentTypes = currentAccordions.map(x => x.type);
        setAccordionHeights(currentHeights);
        setIsShowns(currentIsShowns);
        setAccordionTypes(currentTypes);
    }, []);

    const entireSx: SxProps<Theme> = {
        width, height,
        margin: 0,
        padding: 0,
        overflow: "hidden",
        overflowY: "scroll"
    }
    if (accordionHeights.length !== Object.values(BlogEditorSubmenuFileAccordionKeyValues).length) {
        return <Box></Box>
    }
    const updateIsShownByIndex = (i: number) => {
        const newShowns = [ ...isShowns ];
        newShowns[i] = !isShowns[i];
        setIsShowns(newShowns);
        const index = accordionTypes.indexOf(BlogEditorSubmenuFileAccordionKeyValues.Blogs);
        const heightProps: GetSubmenuAccordionBlogsHeightProps = { 
            isShowns: newShowns, 
            types: accordionTypes, 
            heights: accordionHeights, 
            entireHeight: height,
            itemHeight
        };
        accordionHeights[index] = GetSubmenuAccordionBlogsHeight(heightProps);
        setAccordionHeights(accordionHeights);
    }
    return (
        <Box sx={entireSx}>
            {Object.values(BlogEditorSubmenuFileAccordionKeyValues).map((x, i) => {
                const buttonProps: BlogEditorSubmenuFileProps = {
                    ...props,
                    index: i,
                    title: x,
                    titleHeight: itemHeight,
                    detailHeight: isShowns[i] ? accordionHeights[i] : 0,
                    accordion: x,
                    isShown: isShowns[i],
                    blogItemHeight,
                    updateIsShown: () => updateIsShownByIndex(i)
                }
                return <BlogEditorSubmenuFile props={buttonProps}  key={x} />
            })}
        </Box>
    );
}

type BlogEditorSubmenuFileProps = {
    index: number,
    title: string,
    titleHeight: number,
    detailHeight: number,
    blogItemHeight: number,
    width: number,
    isShown: boolean,
    searchInput: string,
    accordion: BlogEditorSubmenuFileAccordionType,
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

const BlogEditorSubmenuFile = ({ props }: { props: BlogEditorSubmenuFileProps }) => {
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
        case BlogEditorSubmenuFileAccordionKeyValues.Search:
            Component = <BlogEditorSubmenuFilesSearchComponent props={componentProps} />;
            break;
        case BlogEditorSubmenuFileAccordionKeyValues.Tags:
            Component = <BlogEditorSubmenuFilesTagList props={componentProps} />
            break;
        case BlogEditorSubmenuFileAccordionKeyValues.History:
            Component = <BlogEditorSubmenuFilesHistoryList props={componentProps} />
            break;
        case BlogEditorSubmenuFileAccordionKeyValues.Blogs:
            Component = <BlogEditorSubmenuFilesBlogList props={componentProps} />
            break;
    }
    return (
        <BlogEditorSubmenuFilesAccordionLayout props={props}>
            <Box sx={containerSx}>
                {Component}
            </Box>
        </BlogEditorSubmenuFilesAccordionLayout>
    )
}

