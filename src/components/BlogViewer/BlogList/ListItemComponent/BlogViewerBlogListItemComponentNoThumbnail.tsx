import { Box, Grid, SxProps, Theme, Typography } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { DateTime } from "../../../../models/utils/DateTime/obj";
import { BlogShortTextTypography, BlogShortTextTypographyProps } from "../../../Typography/BlogShortTextTypography";
import { BlogViewerBlogListItemProps } from "../BlogViewerBlogListItem"
import { BlogListItemComponentTag } from "./BlogListItemComponentTag";

export const BlogViewerBlogListItemComponentNoThumbnail = ({ props }: { props: BlogViewerBlogListItemProps }) => {
    const { width, height, Blog } = props;
    const { Palette, LocalSetting, FontSize } = useContext(UiParamsContext);
    const paddingTopBottom = 1;
    const sidePadding = 2;
    const outerSx: SxProps<Theme> = {
        width,
        height,
        bgcolor: Blog.Setting.Theme,
        borderRadius: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    }
    const innerWidth = width - 2 * 8 * sidePadding;
    const innerHeight = height - 2 * 8 * paddingTopBottom;
    const containerSx: SxProps<Theme> = {
        width: innerWidth,
        height: innerHeight,
    }
    const dateHeight = 20;
    const titleHeight = 25;
    var tagHeight = 10;
    var tagComponent = <></>;
    if (Blog.Tags.Items.length > 0) {
        tagHeight = 24;
        const tagSx: SxProps<Theme> = {
            width: innerWidth,
            height: tagHeight,
        }
        tagComponent = (
            <Grid container sx={tagSx}>
                {Blog.Tags.Items.map((x) => {
                    return (
                        <BlogListItemComponentTag key={x.Id}>
                            {x.Tag}
                        </BlogListItemComponentTag>
                    )
                })}
            </Grid>
        );
    }
    const detailHeight = innerHeight - dateHeight - titleHeight - tagHeight;
    const dateSx: SxProps<Theme> = {
        height: dateHeight,
        width: innerWidth,
        display: "flex",
        justifyContent: "start",
        alignItems: "center"
    }
    const titleSx: SxProps<Theme> = {
        height: titleHeight,
        width: innerWidth,
    }
    const detailSx: SxProps<Theme> = {
        width: innerWidth,
        height: detailHeight,
    }
    const detailProps: BlogShortTextTypographyProps= {
        width: innerWidth,
        height: detailHeight,
        blogId: Blog.BlogId,
        rowCount: 3,
        color: Blog.Thumbnail.FontColor
    }
    return (
        <Box sx={outerSx}>
            <Grid container sx={containerSx}>
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
                    <BlogShortTextTypography props={detailProps}>
                        {Blog.Detail}
                    </BlogShortTextTypography>
                </Grid>
                <Grid item>
                    {tagComponent}
                </Grid>
            </Grid>
        </Box>
    );
}