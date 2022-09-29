import { Box, Grid, SxProps, Theme } from "@mui/material";
import { useEffect, useState } from "react";
import { BlogObj } from "../../models/state/Blog/obj"
import { BlogTagListObj } from "../../models/state/BlogTag/obj"
import { SearchConditionKeyValues } from "../../models/utils/List/type";
import { BlogEditorDialogTagListItem, BlogEditorDialogTagListItemProps } from "./BlogEditorDialogTagListItem";

export type BlogEditorDialogTagListProps = {
    width: number,
    height: number,
    BlogTagList: BlogTagListObj,
    Blog: BlogObj,
    updateBlog: (blog: BlogObj) => void,
    searchString: string,
}


export const BlogEditorDialogTagList = ({ props }: { props: BlogEditorDialogTagListProps }) => {
    const { width, height, BlogTagList, searchString, updateBlog, Blog } = props;
    const [ tagList, setTagList ] = useState(BlogTagList.toList());
    const tagIds = Blog.Tags.Items.map(x => x.Id);
    const [ activeTagIds, setActiveTagIds ] = useState(tagIds);

    useEffect(() => {
        const target = BlogTagList.search(searchString, SearchConditionKeyValues.PrefixMatching);
        setTagList(target);
    }, [searchString])

    useEffect(() => {
        const target = BlogTagList.overlap(activeTagIds);
        Blog.setTags(target);
        updateBlog(Blog);
    }, [activeTagIds])

    const sideMargin = 1;
    const innerWidth = width - sideMargin * 2 * 8;
    const innerHeight = height - 8;
    const outerBoxSx: SxProps<Theme> = {
        width: innerWidth,
        height: innerHeight,
        marginLeft: sideMargin,
        overflow: "hidden",
        overflowY: "scroll",
    }
    const tagItemHeight = 40;
    const containerSx: SxProps<Theme> = {
        height: tagList.length * tagItemHeight,
        width: innerWidth
    }
    const updateActiveCheckList = (next: boolean, id: string) => {
        const target = next ? [ ...activeTagIds, id ] : activeTagIds.filter(x => x !== id);
        setActiveTagIds(target);
    }
    return ( 
        <Box sx={outerBoxSx}>
            <Grid container sx={containerSx}>
                {tagList.map((x) => {
                    const isActive = activeTagIds.includes(x.Id);
                    const itemProps: BlogEditorDialogTagListItemProps = {
                        height: tagItemHeight,
                        width: innerWidth,
                        item: x,
                        isActive,
                        updateIsActive: () => updateActiveCheckList(!isActive, x.Id),
                    }
                    return (
                        <Grid item key={x.Id}>
                            <BlogEditorDialogTagListItem props={itemProps} />
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    );
}

