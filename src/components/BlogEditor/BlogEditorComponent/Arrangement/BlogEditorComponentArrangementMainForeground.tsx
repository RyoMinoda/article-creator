import { Grid, SxProps, Theme } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { BlogPageObj } from "../../../../models/state/BlogPage/obj";
import { MousePosition } from "../../../../models/utils/MousePosition/type";
import { Position } from "../../../../models/utils/Position/obj";
import { Span } from "../../../../models/utils/Span/obj";
import { ClassNameKeyValues } from "../../../../utils/ClassName";

export type BlogEditorComponentArrangementMainForegroundProps = {
    BlogPage: BlogPageObj,
    span: Span,
    startPosition: Position,
    endPosition: Position,
    mousePosition: MousePosition,
    updateStartPosition: (x: number, y: number) => void, 
    updateEndPosition: (x: number, y: number) => void, 
    updateSpan: (x: number, y: number) => void,
}

export const BlogEditorComponentArrangementMainForeground = ({ props }: { props: BlogEditorComponentArrangementMainForegroundProps }) => {
    const { BlogPage, span, updateEndPosition, endPosition, startPosition, updateSpan, updateStartPosition } = props;
    const { Palette } = useContext(UiParamsContext);
    const rows = new Array(BlogPage.RowCount).fill(0).map((x, i) => i);
    const columns = new Array(BlogPage.ColumnCount).fill(0).map((x, i) => i);
    const rowHeight = BlogPage.PageHeight / BlogPage.RowCount;
    const columnWidth = BlogPage.PageWidth / BlogPage.ColumnCount;
    const activeColor = Palette.Background.Light;
    const hoverColor = Palette.Background.Light;

    const itemSx: SxProps<Theme> = {
        width: columnWidth,
        height: rowHeight,
        borderLeft: "solid 0.5px",
        borderBottom: "solid 0.5px",
        borderColor: activeColor,
        userSelect: "element",
        "&:hover": {
            bgcolor: Palette.Background.Lighter
        },
    }
    const containerSx: SxProps<Theme> = {
        width: BlogPage.PageWidth, 
        height: BlogPage.PageHeight,
        overflow: "scroll",
        position: "absolute",
    }
    const itemStyle: React.CSSProperties = {
        width: columnWidth,
        height: rowHeight,
        userSelect: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const onMouseDownHandler = (col: number, row: number) => {
        updateStartPosition(col, row);
    }
    const onMouseEnterHandler = (col: number, row: number) => {
        updateSpan(col, row);
    }
    const onMouseUpHandler = (col: number, row: number) => {
        updateEndPosition(col, row);
    }
    const getBgcolor = (col: number, row: number): string => {
        if (Position.getIsUndefined(startPosition) || Span.getIsUndefined(span)) return "";
        if (startPosition.X <= col && col <= startPosition.X + span.X && startPosition.Y <= row && row <= startPosition.Y + span.Y) {
            return hoverColor;
        } else if (startPosition.X + span.X <= col && col <= startPosition.X && startPosition.Y <= row && row <= startPosition.Y + span.Y) {
            return hoverColor;
        } else if (startPosition.X <= col && col <= startPosition.X + span.X && startPosition.Y + span.Y <= row && row <= startPosition.Y) {
            return hoverColor;
        } else if (startPosition.X + span.X <= col && col <= startPosition.X && startPosition.Y + span.Y <= row && row <= startPosition.Y) {
            return hoverColor;
        }
        return "";
    }
    return (
        <Grid container sx={containerSx}>
            {rows.map((r) => {
                return (
                    <Grid item key={"row" + r.toString()}>
                        <Grid container>
                            {columns.map((c) => {
                                const bgcolor = getBgcolor(c, r);
                                var sx = itemSx;
                                if (bgcolor !== "") {
                                    sx = { ...sx, bgcolor, }
                                }
                                return (
                                    <Grid item 
                                        className={ClassNameKeyValues.componentEditorPanel}
                                        sx={sx} 
                                        key={"row" + r.toString() + "col" + c.toString()}>
                                         <div 
                                            className={ClassNameKeyValues.componentEditorPanel}
                                            onMouseDown={() => onMouseDownHandler(c, r)} 
                                            onMouseEnter={() => onMouseEnterHandler(c, r)}
                                            onMouseUp={() => onMouseUpHandler(c, r)}
                                            style={itemStyle}>
                                        </div>
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