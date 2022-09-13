import { Box, Grid, SxProps, Theme, Typography } from "@mui/material"
import { useContext } from "react";
import { UiParamsContext } from "../models/context/UiParams/lib";
import { Blog } from "../models/state/Blog/type"

export type BlogViewerProps = {
    Blog: Blog,
    width: number,
    height: number,
}

export const BlogViewer = ({ props }: { props: BlogViewerProps }) => {
    const { Blog, width, height } = props;
    const { Layout, FontSize } = useContext(UiParamsContext);
    const titleSx: SxProps<Theme> = {
        width, height: Layout.BlogTitleHeight,
        display: "flex", justifyContent: "flex-start", alignItems: "center",
        paddingLeft: 2
    }
    return (
        <Box width={width} height={height}>
            <Grid container>
                <Grid item sx={titleSx}>
                    <Typography fontSize={FontSize.Larger}>
                        {Blog.Title}
                    </Typography>
                </Grid>
                <Grid item>

                </Grid>
            </Grid>
        </Box>
    )
}