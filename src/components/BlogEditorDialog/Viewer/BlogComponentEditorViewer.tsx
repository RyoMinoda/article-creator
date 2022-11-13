import { Box, Grid, Paper, SxProps, Theme } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { BlogComponentListItemObj, BlogComponentListObj } from "../../../models/state/BlogComponent/obj";
import { BlogComponentContentKeyValues } from "../../../models/state/BlogComponentContent/types";
import { BlogPageObj } from "../../../models/state/BlogPage/obj";
import { BlogComponentEditorViewerComponentText } from "./Components/BlogComponentEditorViewerComponentText";
import { BlogComponentEditorViewerComponentProps } from "./Components/type";

export type BlogComponentEditorViewerProps = {
    width: number,
    height: number,
    BlogPage: BlogPageObj,
    BlogComponent: BlogComponentListItemObj,
    BlogComponentList: BlogComponentListObj,
}

export const BlogComponentEditorViewer = ({ props }: { props: BlogComponentEditorViewerProps }) => {
    const { width, height, BlogPage, BlogComponent, BlogComponentList } = props;
    const { Palette } = useContext(UiParamsContext);
    const outerSx: SxProps<Theme> = {
        width,
        height,
        display: "flex",
        justifyContent: "center",
        overflow: "scroll",
        position: "relative"
    }
    const paperSx: SxProps<Theme> = {
        width: BlogPage.PageWidth,
        height: BlogPage.PageHeight - 1,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
        position: "relative"
    }
    const containerSx: SxProps<Theme> = {
        width: BlogPage.PageWidth,
        height: BlogPage.PageHeight,
        position: "absolute",
    }
    const columns = new Array(BlogPage.ColumnCount).fill(0).map((_, i) => i);
    const rows = new Array(BlogPage.RowCount).fill(0).map((_, i) => i);
    const borderColor = Palette.Background.Main;
    const cellWidth = BlogPage.PageWidth / BlogPage.ColumnCount;
    const cellHeight = BlogPage.PageHeight / BlogPage.RowCount;
    const cellSx: SxProps<Theme> = {
        width: cellWidth,
        height: cellHeight,
        borderBottomColor: borderColor,
        borderBottomStyle: "solid",
        borderBottomWidth: 0.5,
        borderRightColor: borderColor,
        borderRightStyle: "solid",
        borderRightWidth: 0.5,
        userSelect: "none",
        opacity: 0.5,
        "&:hover": {
            bgcolor: Palette.Background.Light,
        },
    }
    const getColor = (c: number, r: number): string => {
        if (BlogComponent.Position.X <= c && c <= BlogComponent.Position.X + BlogComponent.Span.X ) {
            if (BlogComponent.Position.Y <= r && r <= BlogComponent.Position.Y + BlogComponent.Span.Y) {
                return Palette.Background.Lighter;
            }
        }
        return "";
    }
    const contentMapProps: BlogComponentEditorViewerComponentProps = {
        cellWidth, cellHeight,
        BlogComponentListItem: BlogComponent,
        BlogPage,
    }
    var Component = <></>;
    switch (BlogComponent.ContentType) {
        case BlogComponentContentKeyValues.Text:
            Component = <BlogComponentEditorViewerComponentText props={contentMapProps} />;
            break;
        case BlogComponentContentKeyValues.Table:
            break;
        case BlogComponentContentKeyValues.Image:
            break;
    }
    return (
        <Box sx={outerSx}>
            <Paper sx={{ ...paperSx }}>
                <Box sx={containerSx}>
                    <Box sx={{ ...containerSx, position: "relative" }}>
                        {Component}
                    </Box>
                </Box>
                <Grid container sx={containerSx}>
                    {rows.map((r) => {
                        return columns.map((c) => {
                            const key = BlogPage.ColumnCount * r + c;
                            const bgcolor = getColor(c, r);
                            var sx = cellSx;
                            if (bgcolor !== "") {
                                sx = { ...cellSx, bgcolor };
                            }
                            return <Grid item key={key} sx={sx}></Grid>
                        })
                    })}
                </Grid>
            </Paper>
        </Box>
    )
}