import { Box, Grid, Paper, Skeleton, Stack, SxProps, Theme } from "@mui/material"
import { useContext, useState } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { BlogObj } from "../../../../models/state/Blog/obj";
import { MousePosition } from "../../../../models/utils/MousePosition/type";
import { BlogEditorComponentArrangementMainForeground, BlogEditorComponentArrangementMainForegroundProps } from "./BlogEditorComponentArrangementMainForeground";

export type BlogEditorComponentArrangementMainProps = {
    width: number,
    height: number,
    Blog: BlogObj,
    isActiveArrangementBackground: boolean,
    isPositionMode: boolean,
    mousePosition: MousePosition,
}

export const BlogEditorComponentArrangementMain = ({ props }: { props: BlogEditorComponentArrangementMainProps }) => {
    const { width, height, Blog, isActiveArrangementBackground } = props;
    const { Palette } = useContext(UiParamsContext);
    const [ selectable, setSelectable ] = useState(false);
    const [ activeStartRow, setActiveStartRow ] = useState(-1);
    const [ activeStartColumn, setActiveStartColumn ] = useState(-1);
    const [ activeEndRow, setActiveEndRow ] = useState(-1);
    const [ activeEndColumn, setActiveEndColumn ] = useState(-1);
    const minRowCount = 20;
    const blogRowCount = 5;
    const rowCount = blogRowCount < minRowCount ? minRowCount : blogRowCount;
    const columnCount = 12;
    const outerSx: SxProps<Theme> = {
        width, height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const paperSx: SxProps<Theme> = {
        width,
        height,
        overflow: "scroll",
        bgcolor: Palette.Background.Lighter
    }
    const stackBoxSx: SxProps<Theme> = {
        position: "absolute",
        left: 0,
        top: 0,
        width,
        height,
    }

    const updateActiveCell = (sr: number, er: number, sc: number, ec: number) => {
        setActiveStartRow(sr);
        setActiveStartColumn(sc);
        setActiveEndRow(er);
        setActiveEndColumn(ec);
    }
    const foregroundProps: BlogEditorComponentArrangementMainForegroundProps = {
        ...props,
        width, height, rowCount, columnCount, updateActiveCell,
        activeEndColumn, activeEndRow, activeStartColumn, activeStartRow,
        selectable,
    }
    const backComponent = isActiveArrangementBackground ? (
        <Box sx={stackBoxSx}>
            <BlogEditorComponentArrangementMainForeground props={foregroundProps} />
        </Box>
    ) : <Skeleton sx={stackBoxSx} variant="rounded" />
    return (
        <Box sx={outerSx}>
            <Paper sx={paperSx}>
                <Stack position="relative">
                    {backComponent}
                </Stack>
            </Paper>
        </Box>
    )
}