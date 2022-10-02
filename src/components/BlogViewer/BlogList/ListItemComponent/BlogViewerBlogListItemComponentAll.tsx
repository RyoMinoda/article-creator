import { Box, Grid, SxProps, Theme, Typography } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { DateTime } from "../../../../models/utils/DateTime/obj";
import { BlogImageBox, BlogImageBoxProps } from "../../../ImageBox/BlogImageBox";
import { BlogShortTextTypography, BlogShortTextTypographyProps } from "../../../Typography/BlogShortTextTypography";
import { BlogViewerBlogListItemProps } from "../BlogViewerBlogListItem"
import { BlogListItemComponentTag } from "./BlogListItemComponentTag";

export const BlogViewerBlogListItemComponentAll = ({ props }: { props: BlogViewerBlogListItemProps }) => {
    const { width, height, Blog } = props;
    const {  FontSize, LocalSetting } = useContext(UiParamsContext);
    const outerSx: SxProps<Theme> = {
        width,
        height,
        position: "relative",
        overflow: "hidden",
    }
    const backgroundSx: SxProps<Theme> = {
        width,
        height,
        position: "absolute",
        bgcolor: Blog.Setting.Theme,
        opacity: Blog.Setting.ThemeOpacity
    }
    const containerSx: SxProps<Theme> = {
        width, height,
        position: "absolute"
    }
    const imageItemSx: SxProps<Theme> = {
        height,
    }
    const imageBoxProps: BlogImageBoxProps = {
        width: height,
        height,
        alt: "image",
        Blog,
        bgcolor: "transparent",
        opacity: 0,
    }
    const mainTextWidth = width - height;
    const mainItemSx: SxProps<Theme> = {
        width: mainTextWidth,
        height,
        left: height,
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const paddingTopBottom = 1;
    const sidePadding = 2;
    const mainInnerTextWidth = mainTextWidth - 2 * sidePadding * 8;
    const mainTextHeight = height - 2 * 8 * paddingTopBottom;
    const textOuterSx: SxProps<Theme> = {
        width: mainInnerTextWidth,
        height: mainTextHeight
    }
    const dateHeight = 20;
    const titleHeight = 28;
    var tagHeight = 20;
    var tagComponent = <></>;
    if (Blog.Tags.Items.length > 0) {
        tagHeight = 42;
        const tagSx: SxProps<Theme> = {
            width: mainInnerTextWidth,
            height: tagHeight,
            overflow: "hidden",
            display: "flex",
            justifyContent: "start",
            alignItems: "center"
        }
        tagComponent = (
            <Grid container sx={tagSx}>
                {Blog.Tags.Items.map((x) => {
                    return (
                        <BlogListItemComponentTag>
                            {x.Tag}
                        </BlogListItemComponentTag>
                    )
                })}
            </Grid>
        );
    }



    const detailHeight = mainTextHeight - dateHeight - titleHeight - tagHeight;
    const dateSx: SxProps<Theme> = {
        width: mainInnerTextWidth,
        height: dateHeight,
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
    }
    const titleSx: SxProps<Theme> = {
        height: titleHeight,
        width: mainInnerTextWidth,
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
    }
    const detailSx: SxProps<Theme> = {
        width: mainInnerTextWidth,
        height: detailHeight,
    }
    const detailTypography: BlogShortTextTypographyProps = {
        width: mainInnerTextWidth,
        height: detailHeight,
        blogId: Blog.BlogId,
        color: Blog.Thumbnail.FontColor,
        rowCount: 2,
    }

    return (
        <Box sx={outerSx}>
            <Box sx={backgroundSx}></Box>
            <Grid container sx={containerSx}>
                <Box sx={imageItemSx}>
                    <BlogImageBox props={imageBoxProps} />
                </Box>
                <Box sx={mainItemSx}>
                    <Grid container sx={textOuterSx}>
                        <Grid item sx={dateSx}>
                            <Typography fontSize={FontSize.Smaller}>
                                {new DateTime(Blog.CreatedAt)
                                    .setLocalTimeZone(LocalSetting.TimeZone)
                                    .toDateString(LocalSetting.DateTimeExpression)}
                            </Typography>
                        </Grid>
                        <Grid item sx={titleSx}>
                            <Typography fontSize={FontSize.Main} fontWeight="bold">
                                {Blog.Title}
                            </Typography>
                        </Grid>
                        <Grid item sx={detailSx}>
                            <BlogShortTextTypography props={detailTypography}>
                                {Blog.Detail}
                            </BlogShortTextTypography>
                        </Grid>
                        <Grid item>
                            {tagComponent}
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Box>
    );
}

