import { Box, Grid, Paper, SxProps, Theme } from "@mui/material";
import { borderBottom } from "@mui/system";
import { useContext } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { BlogPageObj } from "../../../models/state/BlogPage/obj";

export type BlogComponentEditorViewerProps = {
    width: number,
    height: number,
    BlogPage: BlogPageObj,
}

export const BlogComponentEditorViewer = ({ props }: { props: BlogComponentEditorViewerProps }) => {
    const { width, height, BlogPage } = props;
    const { Palette } = useContext(UiParamsContext);
    const outerSx: SxProps<Theme> = {
        width,
        height,
        display: "flex",
        justifyContent: "center",
        overflow: "scroll",
    }
    const paperSx: SxProps<Theme> = {
        width: BlogPage.PageWidth,
        height: BlogPage.PageHeight - 1,
        marginTop: 2,
        marginBottom: 2,
    }
    const columns = new Array(BlogPage.ColumnCount).fill(0).map((_, i) => i);
    const rows = new Array(BlogPage.RowCount).fill(0).map((_, i) => i);
    const borderColor = Palette.FontColor.Lighter;
    const cellSx: SxProps<Theme> = {
        width: BlogPage.PageWidth / BlogPage.ColumnCount,
        height: BlogPage.PageHeight / BlogPage.RowCount,
        borderBottomColor: borderColor,
        borderBottomStyle: "solid",
        borderBottomWidth: 0.5,
        borderRightColor: borderColor,
        borderRightStyle: "solid",
        borderRightWidth: 0.5,
        userSelect: "none",
        "&:hover": {
            bgcolor: Palette.Background.Lighter
        },
    }
    return (
        <Box sx={outerSx}>
            <Paper sx={paperSx}>
                <Grid container>
                    {rows.map((r) => {
                        return columns.map((c) => {
                            const key = BlogPage.ColumnCount * r + c;
                            return <Grid item key={key} sx={cellSx}></Grid>
                        })
                    })}
                </Grid>
            </Paper>
        </Box>
    )
}