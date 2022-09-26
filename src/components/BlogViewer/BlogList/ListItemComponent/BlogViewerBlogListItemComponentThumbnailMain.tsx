import { Box, Grid, Stack, SxProps, Theme, Typography } from "@mui/material";
import { CSSProperties, useContext } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { BlogImageBox, BlogImageBoxProps } from "../../../ImageBox/BlogImageBox";
import { BlogShortTextTypography, BlogShortTextTypographyProps } from "../../../Typography/BlogShortTextTypography";
import { BlogTitleTypography, BlogTitleTypographyProps } from "../../../Typography/BlogTitleTypography";
import { BlogViewerBlogListItemProps } from "../BlogViewerBlogListItem";

export const BlogViewerBlogListItemComponentThumbnailMain = ({ props }: { props: BlogViewerBlogListItemProps }) => {
    const { width, height, Blog } = props;
    const { FontSize } = useContext(UiParamsContext);
    const imageBoxProps: BlogImageBoxProps = {
        alt: "listItemImage",
        Blog,
        width, 
        height,
        background: "transparent"
    }
    const outerSx: SxProps<Theme> = {
        width,
        height,
        position: "relative",
    }
    const imageSx: SxProps<Theme> = {
        width,
        height,
        position: "absolute"
    }
    const textHeight = height / 3;
    const textSx: SxProps<Theme> = {
        position: "absolute",
        top: height - textHeight - 8,
        left: 0,
        width,
        height: textHeight + 8,
        bgcolor: Blog.Thumbnail.FontBackColor,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
        opacity: 0.6
    }
    const titleHeight = textHeight / 3;
    const detailHeight = textHeight - titleHeight;
    const titleSx: SxProps<Theme> = {
        width,
        height: titleHeight,
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        paddingTop: 1 / 2,
        paddingLeft: 1,
        paddingRight: 1,
    }
    const titleProps: BlogTitleTypographyProps = {
        width: width - 16,
        height: titleHeight,
        Blog,
        fontSize: FontSize.Main,
    }
    const detailSx: SxProps<Theme> = {
        width,
        height: detailHeight,
        paddingLeft: 1,
        paddingRight: 1,
    }
    const detailProps: BlogShortTextTypographyProps= {
        width: width - 16,
        height: detailHeight,
        blogId: Blog.BlogId,
        rowCount: 3,
    }
    return (
        <Box sx={outerSx}>
            <Box sx={imageSx}>
                <BlogImageBox props={imageBoxProps} />
            </Box>
            <Box sx={textSx}>
                <Grid container>
                    <Grid item sx={titleSx}>
                        <BlogTitleTypography props={titleProps}>
                            {Blog.Title}
                        </BlogTitleTypography>
                    </Grid>
                    <Grid item sx={detailSx}>
                        <BlogShortTextTypography props={detailProps}>
                            {Blog.Detail}
                        </BlogShortTextTypography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}