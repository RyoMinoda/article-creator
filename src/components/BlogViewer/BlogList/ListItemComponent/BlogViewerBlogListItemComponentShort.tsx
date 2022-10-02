import { Box, Grid, SxProps, Theme, Typography } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { BlogShortTextTypography, BlogShortTextTypographyProps } from "../../../Typography/BlogShortTextTypography";
import { BlogViewerBlogListItemProps } from "../BlogViewerBlogListItem";

export const BlogViewerBlogListItemComponentShort = ({ props }: { props: BlogViewerBlogListItemProps }) => {
    const { width, height, Blog } = props;
    const { FontSize } = useContext(UiParamsContext);
    const outerSx: SxProps<Theme> = {
        width, height,
        bgcolor: Blog.Setting.Theme,
        borderRadius: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    }
    const paddingTopBottom = 1.5;
    const sidePadding = 2;
    const innerHeight = height - 2 * paddingTopBottom * 8;
    const innerWidth = width - 2 * sidePadding * 8;
    const containerSx: SxProps<Theme> = {
        width: innerWidth,
        height: innerHeight,
    }
    const titleHeight = innerHeight / 3;
    const detailHeight = innerHeight - titleHeight;
    const titleSx: SxProps<Theme> = {
        width: innerWidth,
        height: titleHeight,
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        paddingBottom: 1,
    }
    const detailSx: SxProps<Theme> = {
        width: innerWidth,
        height: detailHeight,
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        overflow: "hidden",
    }
    const detailProps: BlogShortTextTypographyProps= {
        width: innerWidth,
        height: detailHeight,
        blogId: Blog.BlogId,
        rowCount: 2,
        color: Blog.Thumbnail.FontColor
    }
    return (
        <Box sx={outerSx}>
            <Grid container sx={containerSx}>
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
            </Grid>
        </Box>
    );
}