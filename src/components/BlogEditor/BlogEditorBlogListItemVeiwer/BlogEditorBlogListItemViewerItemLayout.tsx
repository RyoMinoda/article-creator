import { Box, Grid, SxProps, Theme, Typography } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";

export type BlogEditorBlogListItemViewerItemLayoutProps = {
    height: number,
    width: number,
    title: string,
    itemWidth: number,
    maxItemWidth: number,
    titleHeight: number,
    emptyHeight: number,
    minPadding: number,
}

export const BlogEditorBlogListItemViewerItemLayout = ({ props, children }: { props: BlogEditorBlogListItemViewerItemLayoutProps, children: React.ReactNode }) => {
    const { title, width, height, titleHeight, itemWidth, emptyHeight, maxItemWidth, minPadding } = props;
    const { FontSize } = useContext(UiParamsContext);
    const containerSx: SxProps<Theme> = {
        width, height
    }
    const paddingLeft = (width - maxItemWidth) / 2 / 8 + minPadding;
    const titleSx: SxProps<Theme> = {
        width, height: titleHeight,
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        paddingLeft: paddingLeft,
    }
    const contentSx: SxProps<Theme> = {
        width, 
        height: height - titleHeight - emptyHeight / 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        paddingLeft,
    }
    const emptySx: SxProps<Theme> = {
        width, height: emptyHeight / 2,
    }
    return (
        <Grid container sx={containerSx}>
            <Grid item sx={titleSx}>
                <Typography fontSize={FontSize.Main}>
                    {title}
                </Typography>
            </Grid>
            <Grid item sx={contentSx}>
                {children}
            </Grid>
            <Grid item sx={emptySx}></Grid>
        </Grid>
    );
}