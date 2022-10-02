import { Box, Grid, SxProps, Theme } from "@mui/material";
import { useContext, useState } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { BlogObj } from "../../../models/state/Blog/obj";
import { BlogListObj } from "../../../models/state/BlogList/obj";
import { BlogTagListObj } from "../../../models/state/BlogTag/obj";
import { MousePosition } from "../../../models/utils/MousePosition/type";
import { BlogEditorDialogType } from "../../../organizations/BlogEditor/type";
import { BlogEditorModeKeyValues, BlogEditorModeType } from "../type";
import { BlogEditorSubmenuSlideLine, BlogEditorSubmenuSlideLineProps } from "./BlogEditorSubmenuSlideLine";
import { BlogEditorSubmenuComponents } from "./Components/BlogEditorSubmenuComponents";
import { BlogEditorSubmenuFiles } from "./Files/BlogEditorSubmenuFiles";
import { BlogEditorSubmenuProperty } from "./Property/BlogEditorSubmenuProperty";
import { BlogEditorSubmenuPropertyMap } from "./Property/BlogEditorSubmenuPropertyMap";
import { BlogEditorSubmenuFileAccordionType, BlogEditorSubmenuItemProps, BlogEditorSubmenuSearchGenreKeyValues, BlogEditorSubmenuSearchGenreType } from "./types";


export type BlogEditorSubmenuProps = {
    Blog: BlogObj,
    BlogList: BlogListObj,
    BlogTagList: BlogTagListObj,
    BlogEditHistoryList: BlogListObj,
    width: number,
    height: number,
    modeType: BlogEditorModeType,
    mousePosition: MousePosition,
    activeAccordions: Array<BlogEditorSubmenuFileAccordionType>,
    updateSubWindowWidth: () => void,
    updateBlog: (blog: BlogObj) => void,
    showDialog: (type: BlogEditorDialogType) => void,
}

export const BlogEditorSubmenu = ({ props }: { props: BlogEditorSubmenuProps }) => {
    const { width, height, mousePosition, modeType, updateSubWindowWidth, updateBlog, showDialog } = props;

    // States
    const { Palette } = useContext(UiParamsContext);
    const [ activeSearchGenre, setActiveSearchGenre ] = useState<BlogEditorSubmenuSearchGenreType>(BlogEditorSubmenuSearchGenreKeyValues.Title);
    const [ activeTagIdList, setActiveTagIdList ] = useState<Array<string>>([]);
    const [ searchInput, setSearchInput ] = useState<string>("");
    const borderRight = 3;

    // Props
    const borderProps: BlogEditorSubmenuSlideLineProps = {
        width: borderRight,
        height, 
        updateCanMove: updateSubWindowWidth,
    }

    // Styles
    const containerSx: SxProps<Theme> = {
        width, 
        height,
        bgcolor: Palette.Background.Main,
        overflow: "hidden",

    }
    const mainItemSx: SxProps<Theme> = {
        width: width - borderRight * 2,
        height,
    }
    const borderItemSx: SxProps<Theme> = {
        width: borderRight,
        height
    }

    const updateActiveTagIdList = (tags: Array<string>) => {
        setActiveTagIdList(tags);
    }
    const updateSearchInput = (input: string) => {
        setSearchInput(input);
    }
    const itemComponentProps: BlogEditorSubmenuItemProps = {
        ...props, 
        searchInput,
        activeTagIdList,
        width: width - borderRight,
        accordionTitleHeight: 35,
        updateActiveSearchGenre:  (genre: BlogEditorSubmenuSearchGenreType) => {
            setActiveSearchGenre(genre);
        },
        activeSearchGenre,
        updateActiveTagIdList,
        updateSearchInput,
        updateBlog,
        showDialog,
    }
    var Component = <></>;
    switch (modeType) {
        case BlogEditorModeKeyValues.Files:
            Component = <BlogEditorSubmenuFiles props={itemComponentProps} />;
            break;
        case BlogEditorModeKeyValues.Property:
            Component = <BlogEditorSubmenuProperty props={itemComponentProps} />
            break;
        case BlogEditorModeKeyValues.Component:
            Component = <BlogEditorSubmenuComponents props={itemComponentProps} />;
            break;
    }
    return (
        <Grid container sx={containerSx}>
            <Grid item sx={mainItemSx}>
                {Component}
            </Grid>
            <Grid item sx={borderItemSx}>
                <BlogEditorSubmenuSlideLine props={borderProps} />
            </Grid>
        </Grid>
    );
}
