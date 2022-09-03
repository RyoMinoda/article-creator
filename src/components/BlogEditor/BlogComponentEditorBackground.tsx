import { Grid, SxProps, Theme } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import styled from 'styled-components';

export type BlogComponentEditorBackgroundProps = {
    width: number,
    height: number,
    marginTopBottom: number,
    marginSide: number,
    rowCount: number,
}

export const BlogComponentEditorBackground = ({ props } : { props: BlogComponentEditorBackgroundProps }) => {
    const { width, height, marginTopBottom, marginSide, rowCount } = props;
    const { Layout } = useContext(UiParamsContext);
    const containerWidth = width - 2 * marginSide * 8;
    const outerSx: SxProps<Theme> = {
        position: "relative",
        width: containerWidth + 2 * marginSide * 8, 
        height: height + marginTopBottom * 8 * 2, 
        paddingTop: marginTopBottom,
        paddingLeft: marginSide,
        borderRadius: Layout.BorderRadius,
        zIndex: 1,
        overflow: "hidden"
    }
    const columnCount = 14;
    const cellWidth = containerWidth / (columnCount - 2);
    const borderStyle = "dotted 1px gray";
    const cells = new Array(columnCount).fill("").map((x, i) => i);
    const rows = new Array(rowCount).fill("").map((x, i) => i)
    return (
        <Grid container sx={outerSx}>
            {cells.map(x => {
                const key = "top-cell-" + x;
                const cellProps: CellProps = {
                    top: 0, i: x, marginSide, borderStyle, cellWidth, marginTopBottom,
                    height: marginTopBottom * 8 - 1
                }
                return <Cell props={cellProps} key={key} />
            })}
            {rows.map(row => {
                return cells.map(col => {
                    const top = marginTopBottom * 8 + row * Layout.BlogComponentRowHeight;
                    const key = "center-cell-" + row + "-" + col;
                    const cellProps: CellProps = {
                        top, i: col, marginSide, borderStyle, cellWidth, marginTopBottom,
                        height: Layout.BlogComponentRowHeight
                    }
                    return <Cell key={key} props={cellProps} />
                })
            })}
            {cells.map(x => {
                const top = rowCount * Layout.BlogComponentRowHeight + marginTopBottom * 8;
                const key = "bottom-cell-" + x;
                const cellProps: CellProps = {
                    top, i: x, marginSide, borderStyle, cellWidth, marginTopBottom,
                    height: marginTopBottom * 8
                }
                return <Cell props={cellProps} key={key} />
            })}
        </Grid>
    );
}

type CellProps = {
    i: number,
    marginTopBottom: number,
    cellWidth: number,
    marginSide: number,
    borderStyle: string,
    top: number,
    height: number,
}

const Cell = ({ props }: { props: CellProps }) => {
    const { i, cellWidth, marginSide, borderStyle, top, height } = props;
    const cellDivProps: CellDivProps = {
        width: cellWidth,
        height,
        top, 
        left: cellWidth * (i - 1) + marginSide * 8,
        borderBottom: borderStyle,
        borderRight: borderStyle,
        bgcolor: "white",
    }
    if (i == 0) {
        cellDivProps.left = 0;
        cellDivProps.width = marginSide * 8;
    }
    if (i == 13) {
        cellDivProps.left = cellWidth * 12 + marginSide * 8;
        cellDivProps.width = marginSide * 8;
        cellDivProps.borderRight = "none";
    }
    return (
        <CellDiv {...cellDivProps} />
    );
}

type CellDivProps = {
    top: number,
    left: number,
    width: number,
    height: number,
    borderRight: string,
    borderBottom: string,
    bgcolor: string,
}

const CellDiv = styled.div.attrs<CellDivProps>(( props: CellDivProps ) => (
    {
        style: {
            top: props.top,
            left: props.left,
            height: props.height,
            width: props.width,
            borderBottom: props.borderBottom,
            borderRight: props.borderRight,
            backgroundColor: props.bgcolor,
        }
    }))<CellDivProps>`
    position: absolute;
  `