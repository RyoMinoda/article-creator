import { Grid, SxProps, Theme } from "@mui/material"
import { useContext } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { MousePosition } from "../../../../models/utils/MousePosition/type";

export type BlogEditorComponentArrangementMainForegroundProps = {
    width: number,
    height: number,
    rowCount: number,
    columnCount: number,
    activeStartRow: number,
    activeEndRow: number,
    activeStartColumn: number,
    activeEndColumn: number,
    selectable: boolean,
    isPositionMode: boolean,
    mousePosition: MousePosition,
    updateActiveCell: (sr: number, er: number, sc: number, ec: number) => void,
}

export const BlogEditorComponentArrangementMainForeground = ({ props }: { props: BlogEditorComponentArrangementMainForegroundProps }) => {
    const { 
        rowCount, columnCount, width, height, updateActiveCell, isPositionMode,
        activeStartColumn, activeEndRow, activeEndColumn, activeStartRow, selectable
    } = props;
    const { Palette } = useContext(UiParamsContext);
    const rows = new Array(rowCount).fill(0).map((x, i) => i);
    const columns = new Array(columnCount).fill(0).map((x, i) => i);
    const rowHeight = height / rowCount;
    const columnWidth = width / columnCount;
    const backcolor = isPositionMode ? "transparent" : Palette.Background.Light;
    const itemSx: SxProps<Theme> = {
        width: columnWidth,
        height: rowHeight,
        borderLeft: "solid 0.5px",
        borderBottom: "solid 0.5px",
        borderColor: Palette.Background.Dark,
        userSelect: "none",
        "&:hover": {
            bgcolor: Palette.Background.Light
        },
    }
    const containerSx: SxProps<Theme> = {
        width, height,
        overflow: "hidden",
    }
    const itemStyle: React.CSSProperties = {
        width: columnWidth,
        height: rowHeight,
        userSelect: "none",
        backgroundColor: "red"
    }
    const onMouseDownHandler = (row: number, col: number) => {
        updateActiveCell(row, row, col, col);
    }
    const onMouseEnterHandler = (row: number, col: number) => {
        updateActiveCell(activeStartRow, row, activeStartColumn, col);
    }
    const getBgColor = (r: number, c: number) => {
        const sr = activeStartRow <= activeEndRow ? activeStartRow : activeEndRow;
        const er = activeStartRow <= activeEndRow ? activeEndRow : activeStartRow;
        const sc = activeStartColumn <= activeEndColumn ? activeStartColumn : activeEndColumn;
        const ec = activeStartColumn <= activeEndColumn ? activeEndColumn : activeStartColumn;
        if (sr <= r && r <= er && sc <= c && c <= ec) {
            return Palette.Main.Bright
        }
        return "transparent"
    }
    return (
        <Grid container sx={containerSx}>
            {rows.map((r) => {
                return (
                    <Grid item key={"row" + r.toString()}>
                        <Grid container>
                            {columns.map((c) => {
                                const bgcolor = getBgColor(r, c);
                                return (
                                    <Grid item 
                                        sx={{ ...itemSx, bgcolor: backcolor }} 
                                        key={"row" + r.toString() + "col" + c.toString()}>
                                        {selectable ? (
                                            <div
                                                onMouseDown={() => onMouseDownHandler(r, c)} 
                                                onMouseEnter={() => onMouseEnterHandler(r, c)}
                                                style={itemStyle}>
                                            </div>
                                        ) : <div />}
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                )
            })}
        </Grid>
    )
}