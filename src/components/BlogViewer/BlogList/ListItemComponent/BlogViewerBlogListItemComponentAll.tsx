import { Grid, SxProps, Theme } from "@mui/material";
import { BlogImageBox, BlogImageBoxProps } from "../../../ImageBox/BlogImageBox";
import { BlogViewerBlogListItemProps } from "../BlogViewerBlogListItem"

export const BlogViewerBlogListItemComponentAll = ({ props }: { props: BlogViewerBlogListItemProps }) => {
    const { width, height, Blog } = props;
    const containerSx: SxProps<Theme> = {
        width, height,
        background: "white"

    }
    const imageItemSx: SxProps<Theme> = {
        height,
    }
    const imageBoxProps: BlogImageBoxProps = {
        width: height,
        height,
        alt: "image",
        Blog,
        background: "transparent"
    }
    const mainItemSx: SxProps<Theme> = {

    }
    return (
        <Grid container sx={containerSx}>
            <Grid item sx={imageItemSx}>
                <BlogImageBox props={imageBoxProps} />
            </Grid>
            <Grid item sx={mainItemSx}>

            </Grid>
        </Grid>
    );
}