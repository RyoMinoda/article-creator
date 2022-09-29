import { Box, Grid, SxProps, Theme, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { BlogTagItem } from "../../../../models/state/BlogTag/type";
import { BlogEditorDialogKeyValues } from "../../../../organizations/BlogEditor/type";
import DefaultButton, { DefaultButtonProps } from "../../../Button/DefaultButton";
import { BlogEditorMenuPropertyComponentProps } from "./type";

export const BlogEditorSubmenuTagsEditor = ({ props } : { props: BlogEditorMenuPropertyComponentProps }) => {
    const { width, height, Blog, showDialog, sidePadding } = props;
    const { FontSize, Palette } = useContext(UiParamsContext);
    const [ tags, setTags ] = useState<Array<BlogTagItem>>(Blog.Tags.Items);

    useEffect(() => {
        setTags(Blog.Tags.Items);
    }, [Blog.Tags])

    const outerSx: SxProps<Theme> = {
        width, height,
        paddingLeft: sidePadding,
        display: "flex",
        alignItems: "start",
        justifyContent: "center",
        overflow: "hidden",
        overflowY: "scroll",
        paddingTop: 1,
    }

    if (tags.length === 0) {
        const typoButtonSx: SxProps<Theme> = {
            ...outerSx,
            width: width - 2 * 8 * 1.5,
            height: height / 2,
            alignItems: "center",
            borderRadius: 1,
            marginLeft: 1,
            marginRight: 1,
            marginTop: 1,
            bgcolor: Palette.Background.Main,
            overflow: "hidden"
        }
        const defaultButtonProps: DefaultButtonProps = {
            sx: typoButtonSx,
            onClick: () => showDialog(BlogEditorDialogKeyValues.Tags),
        }
        return (
            <DefaultButton props={defaultButtonProps}>
                <Typography fontSize={FontSize.Small} color={Palette.Main.Deep}>
                    Add Tags To My Blog
                </Typography>
            </DefaultButton>
        )
    }
    const padding = 1;
    const innerWidth = width - 2 * 8 * padding;
    const columnCount = Math.ceil(innerWidth / 200);
    const rowCount = Math.ceil(tags.length / columnCount);
    const tagHeight = 28;
    const tagWidth = innerWidth / columnCount;
    const containerSx: SxProps<Theme> = {
        width: innerWidth,
        height: rowCount * tagHeight,
    }
    return (
        <Box sx={outerSx}>
            <Grid container sx={containerSx}>
                {tags.map((x) => {
                    const tagProps: BlogEditorSubmenuTagProps = {
                        width: tagWidth, BlogTagItem: x,
                        height: tagHeight
                    }
                    return (
                        <Grid item key={x.Id}>
                            <BlogEditorSubmenuTag props={tagProps} />
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    );
}

type BlogEditorSubmenuTagProps = {
    width: number,
    height: number,
    BlogTagItem: BlogTagItem
}

const BlogEditorSubmenuTag = ({ props }: { props: BlogEditorSubmenuTagProps }) => {
    const { width, BlogTagItem, height } = props;
    const { FontSize, Palette } = useContext(UiParamsContext);
    const boxSx: SxProps<Theme> = {
        width,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
    const typoSx: SxProps<Theme> = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        borderRadius: 5,
        borderStyle: "solid",
        borderColor: Palette.Main.Deep,
        color: Palette.Main.Deep,
        borderWidth: 1,
        padding: 1 / 4,
        paddingLeft: 2,
        paddingRight: 2,
    }
    return (
        <Box sx={boxSx}>
            <Typography fontSize={FontSize.Smaller} sx={typoSx}>
                {BlogTagItem.Tag}
            </Typography>
        </Box>
    );
}