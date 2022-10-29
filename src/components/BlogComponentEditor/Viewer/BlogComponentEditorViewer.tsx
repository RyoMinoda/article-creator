import { Box, Grid, Paper, SxProps, Theme } from "@mui/material";

export type BlogComponentEditorViewerProps = {
    width: number,
    height: number,
    viewerWidth: number,
    viewerHeight: number,
}

export const BlogComponentEditorViewer = ({ props }: { props: BlogComponentEditorViewerProps }) => {
    const { width, height, viewerWidth, viewerHeight } = props;
    const outerSx: SxProps<Theme> = {
        width,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "scroll",
        position: "relative"
    }
    const boxSx: SxProps<Theme> = {
        position: "absolute",
        width: viewerWidth,
        height: viewerHeight,
    }
    const paperSx: SxProps<Theme> = {
        position: "absolute",
        width: viewerWidth,
        height: viewerHeight,
    }
    return (
        <Box sx={outerSx}>
            <Paper sx={paperSx}>

            </Paper>
            <Box sx={boxSx}>

            </Box>
        </Box>
    )
}