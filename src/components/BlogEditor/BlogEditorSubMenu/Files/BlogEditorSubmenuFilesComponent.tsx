import { Box, FormControl, Grid, SxProps, Theme } from "@mui/material";
import { BlogObj } from "../../../../models/state/Blog/obj";
import { BlogListItemObj, BlogListObj } from "../../../../models/state/BlogList/obj";
import { BlogTagListObj } from "../../../../models/state/BlogTag/obj";
import { BlogEditorSubmenuBlogItemButton, BlogEditorSubmenuBlogItemButtonProps } from "../../../Button/BlogEditorSubmenuBlogItemButton";
import { BlogEditorSubmenuFilesTagCheckBoxList, BlogEditorSubmenuFilesTagCheckBoxListProps } from "../../../CheckBox/BlogEditorSubmenuFilesTagCheckBoxList";
import { BlogEditorSubmenuBlogsChip, BlogEditorSubmenuBlogsChipProps } from "../../../Chip/BlogEditorSubmenuBlogsChip";
import { SearchTextField, SearchTextFieldProps } from "../../../TextField/SearchTextField";
import { BlogEditorSubmenuFilesSearchGenreSelector, BlogEditorSubmenuFilesSearchGenreSelectorProps } from "../../../Selector/BlogEditorSubmenuFilesSearchGenreSelector";
import { BlogEditorSubmenuSearchGenreType } from "../types";
import SearchIcon from '@mui/icons-material/Search';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useContext } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";

export type BlogEditorSubmenuFilesComponentProps = {
    Blog: BlogObj,
    searchInput: string,
    width: number,
    height: number,
    sidePadding: number,
    blogItemHeight: number,
    activeSearchGenre: BlogEditorSubmenuSearchGenreType,
    BlogList: BlogListObj,
    BlogTagList: BlogTagListObj,
    BlogEditHistoryList: BlogListObj,
    activeTagIdList: Array<string>,
    updateActiveSearchGenre: (genre: BlogEditorSubmenuSearchGenreType) => void,
    updateActiveTagIdList: (tags: Array<string>) => void,
    updateIsShown: () => void,
    updateSearchInput: (input: string) => void
}

export const BlogEditorSubmenuFilesSearchComponent = ({ props }: { props: BlogEditorSubmenuFilesComponentProps }) => {
    const { width, height, searchInput, BlogTagList, activeSearchGenre, updateActiveSearchGenre, updateSearchInput } = props;
    const entireSx: SxProps<Theme> = {
        width, height,
        display: "flex",
        justifyContent: "center",
        alignItems: "start"
    }
    const padding = 8;
    const innerHeight = height - 2 * padding;
    const sidePadding = 10;
    const innerWidth = width - 2 * sidePadding;
    const searchInputProps: SearchTextFieldProps = {
        searchInput,
        settingHeight: innerHeight / 2,
        textInputHeight: innerHeight / 2,
        width: innerWidth,
        updateSearchInput
    }
    const selectorProps: BlogEditorSubmenuFilesSearchGenreSelectorProps = {
        width, height: innerHeight / 2,
        activeSearchGenre,
        updateActiveSearchGenre
    }
    const containerSx: SxProps<Theme> = {
        width: innerWidth,
        height: innerHeight
    }
    const itemSx: SxProps<Theme> = {
        width: innerWidth,
        height: innerHeight / 2,
    }
    return (
        <Box sx={entireSx}> 
            <Grid container sx={containerSx}>
                <Grid item sx={itemSx}>
                    <SearchTextField props={searchInputProps} />
                </Grid>
                <Grid item sx={itemSx}>
                    <BlogEditorSubmenuFilesSearchGenreSelector props={selectorProps} />
                </Grid>
            </Grid>
        </Box>
    );
}

export const BlogEditorSubmenuFilesTagList = ({ props }: { props: BlogEditorSubmenuFilesComponentProps }) => {
    const { width, height, BlogTagList, sidePadding, blogItemHeight, activeTagIdList, updateActiveTagIdList } = props;
    const entireSx: SxProps<Theme> = {
        width, height, display: "flex", 
        justifyContent: "center",
        overflow: "hidden",
        overflowY: "scroll",
        paddingLeft: 2
    }
    const checkBoxListProps: BlogEditorSubmenuFilesTagCheckBoxListProps = {
        itemHeight: blogItemHeight,
        width: width - 2 * sidePadding,
        BlogTagList,
        activeTagIdList,
        updateActiveTagIdList
    }
    return (
        <Box sx={entireSx}>
            <BlogEditorSubmenuFilesTagCheckBoxList props={checkBoxListProps} />
        </Box>
    )
}

export const BlogEditorSubmenuFilesHistoryList = ({ props }: { props: BlogEditorSubmenuFilesComponentProps }) => {
    const { width, height, sidePadding, blogItemHeight, activeTagIdList, BlogEditHistoryList } = props;
    const boxSx: SxProps<Theme> = {
        width, height, 
        display: "flex",
        overflow: "hidden",
        overflowY: "scroll",
        justifyContent: "center"
    }
    const containerSx: SxProps<Theme> = {
        width: width - sidePadding * 2,
        height: blogItemHeight * BlogEditHistoryList.Items.length,
    }
    return (
        <Box sx={boxSx}>
            <Grid container sx={containerSx}>
                {BlogEditHistoryList.Items.map(x => {
                    const buttonProps: BlogEditorSubmenuBlogItemButtonProps = {
                        width,
                        height: blogItemHeight,
                        title: x.Title,
                        isActive: false,
                    }
                    return <BlogEditorSubmenuBlogItemButton props={buttonProps} key={x.Id} />
                })}
            </Grid>
        </Box>
    );
}

export const BlogEditorSubmenuFilesBlogList = ({ props }: { props: BlogEditorSubmenuFilesComponentProps }) => {
    const { width, BlogList, blogItemHeight, sidePadding, Blog, height, activeTagIdList, searchInput, 
        BlogTagList, updateSearchInput, updateActiveTagIdList } = props;
    const { Palette } = useContext(UiParamsContext);
    const list = BlogList.Items;
    const paddingTop = 1;
    const innerHeight = height - 2 * paddingTop
    const containerSx: SxProps<Theme> = {
        width, height: innerHeight, 
        overflow: "hidden",
        overflowY: "scroll"
    }
    const iconProps: SxProps<Theme> = {
        color: Palette.Background.Darker
    }
    const isDisplaySearchChip = searchInput !== "";
    const searchChipHeight = isDisplaySearchChip ? blogItemHeight : 0;
    const searchChipItemSx: SxProps<Theme> = {
        display: isDisplaySearchChip ? "inherit" : "none",
        height: searchChipHeight + 2,
        width
    }
    const searchChipProps: BlogEditorSubmenuBlogsChipProps = {
        height: blogItemHeight,
        width, text: searchInput,
        deleteChip: () => {
            updateSearchInput("");
        },
        avatar: <SearchIcon sx={iconProps} />
    }
    const isDisplayTagsChip = activeTagIdList.length > 0;
    const tagsChipHeight = isDisplayTagsChip ? blogItemHeight : 0;
    const tagsChipItemSx: SxProps<Theme> = {
        display: isDisplayTagsChip ? "inherit" : "none",
        height: tagsChipHeight,
        width
    }
    const tagsChipProps: BlogEditorSubmenuBlogsChipProps = {
        height: blogItemHeight,
        width, 
        text: BlogTagList.getActiveTagsText(activeTagIdList),
        deleteChip: () => {
            updateActiveTagIdList([]);
        },
        avatar: <LocalOfferIcon  />
    }
    const mainItemSx: SxProps<Theme> = {
        width, 
        height: innerHeight - searchChipHeight - tagsChipHeight
    }
    const blogsSx: SxProps<Theme> = {
        width: width, 
        height: blogItemHeight * list.length,
        paddingTop, 
        paddingBottom: paddingTop
    }
    return (
        <Grid container sx={containerSx}>
            <Grid item sx={searchChipItemSx}>
                <BlogEditorSubmenuBlogsChip props={searchChipProps} />
            </Grid>
            <Grid item sx={tagsChipItemSx}>
                <BlogEditorSubmenuBlogsChip props={tagsChipProps} />
            </Grid>
            <Grid item sx={mainItemSx}>
                <Grid container sx={blogsSx}>
                    {list.map((x) => {
                        const listItemProps: BlogEditorSubmenuBlogItemButtonProps = {
                            width: width - sidePadding * 2,
                            height: blogItemHeight,
                            title: x.Title,
                            isActive: x.Id === Blog.BlogId
                        };
                        const itemSx: SxProps<Theme> = {
                            width, height: blogItemHeight,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }
                        return (
                            <Grid item sx={itemSx}  key={x.Id}>
                                <BlogEditorSubmenuBlogItemButton props={listItemProps} />
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
        </Grid>
    )
}
