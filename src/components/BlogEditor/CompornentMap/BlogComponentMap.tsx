import { Box, Button, Grid, Stack, SxProps, Theme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { BlogComponentListItemObj } from "../../../models/state/BlogComponent/obj";
import { BlogEditorMapperProps } from "../BlogEditorMenu/types";
import { BlogComponentMapTiles, BlogComponentMapTileType } from "./BlogComponentMapTiles";

export type BlogComponentMapProps = {
    height: number,
    width: number,
    emptyRowCount: number,
    mapperProps: BlogEditorMapperProps,
    components: Array<BlogComponentListItemObj>,
    updateSpan: (rowSpan: number, colSpan: number) => void;
    updatePosition: (row: number, col: number) => void;
}

const getPosition = (str: string): { r: number, c: number } => {
    const arr = str.split("-");
    const row = parseInt(arr[0]);
    const column = parseInt(arr[1]);
    return { r: row, c: column };
}

export const BlogComponentMap = ({ props }: { props: BlogComponentMapProps }) => {
    const { height, width, components, emptyRowCount,
            updatePosition, updateSpan, mapperProps } = props;
    const { FontSize, Palette, Layout } = useContext(UiParamsContext);
    const [ hoverRow, setHoverRow ] = useState(-1);
    const [ hoverCol, setHoverCol ] = useState(-1);
    const [ clickRow, setClickRow ] = useState(-1);
    const [ clickCol, setClickCol ] = useState(-1);
    const [ clicked, setClicked ] = useState(false);
    const [ hovered, setHovered ] = useState(false);
    const [ decided, setDesided ] = useState(false);
    const [ decideRowS, setDesideRowS ] = useState(-1);
    const [ decideRowE, setDesideRowE ] = useState(-1);
    const [ decideColS, setDesideColS ] = useState(-1);
    const [ decideColE, setDesideColE ] = useState(-1);

    useEffect(() => {
        if (!decided) return;
        updatePosition(decideRowS, decideColS);
        updateSpan(decideRowE - decideRowS, decideColE - decideColS);
    }, [decided]);

    useEffect(() => {
        const { row, col, rowSpan, colSpan } = mapperProps;
        setDesideRowS(row);
        setDesideRowE(row + rowSpan);
        setDesideColS(col);
        setDesideColE(col + colSpan);
        setDesided(true);
    }, [mapperProps]);

    const columnCount = 12;
    const rowCount = emptyRowCount;
    const innerStyle: SxProps<Theme> = {
        position: "relative",
        width: width,
        height: Layout.BlogComponentRowHeight * rowCount,
        marginTop: 5, 
        borderRadius: 1,
    };
    const colSx: SxProps<Theme> = {
        width: width / columnCount,
        height: Layout.BlogComponentRowHeight,
        border: "solid 1px",
        borderColor: "transparent",
        borderRadius: 0,
    }
    const borderStyle = "solid 1px";
    const borderColor = Palette.Background.Darker;
    const inactiveColor = "transparent";
    const activeColor = Palette.Main.Light;
    const hoverColor = Palette.Background.Light;
    const componentColor = Palette.Background.Lightest;
    const cellSx: SxProps<Theme> = {
        borderRadius: 0,
        bgcolor: inactiveColor,
        "&:hover": {
            bgcolor: hoverColor,
        },
        "&:active": {
            bgcolor: activeColor
        }
    }
    const onMouseDown: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const { r, c } = getPosition(e.currentTarget.value);
        setClickRow(r);
        setClickCol(c);
        setClicked(true);
        setHovered(true);
        setDesided(false);
    }
    const onMouseUp: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const { r, c } = getPosition(e.currentTarget.value);
        setDesided(true);
        if (r <= clickRow) {
            setDesideRowS(r);
            setDesideRowE(clickRow);
        } else {
            setDesideRowE(r);
            setDesideRowS(clickRow);
        }
        if (c <= clickCol) {
            setDesideColS(c);
            setDesideColE(clickCol);
        } else {
            setDesideColE(c);
            setDesideColS(clickCol);
        }
        setClickRow(-1);
        setClickCol(-1);
        setClicked(false);
        setHovered(true);
        setDesided(true);
    }
    const onMouseMove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const { r, c } = getPosition(e.currentTarget.value);
        setHoverRow(r);
        setHoverCol(c);
        if (!clicked) return;
        setHovered(true);
    }
    const onMouseLeave: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        setHovered(false);
    }
    const columns = new Array(columnCount).fill(1).map((x, i) => i);
    const rows = new Array(rowCount).fill(1).map((x, i) => i);
    const getColor = (r: number, c: number): string => {
        const includes = components.filter(component => component.include(r, c));
        if (includes.length > 0) {
            return componentColor;
        }
        if (!hovered || !clicked) return inactiveColor;
        const plusMinus1 = [ 1, -1 ];
        const plusMinus2 = [ 1, -1 ];
        var color = inactiveColor;
        plusMinus1.forEach(x => {
            plusMinus2.forEach((y) => {
                if (clickRow * x <= r * x && r * x <= hoverRow * x && clickCol * y <= c * y && c * y <= hoverCol * y) {
                    color = activeColor;
                }
            });
        })
        return color;
    }
    const divWidth = width / columnCount;
    const Component = rows.map(r => {
        return columns.map(c => {
            const key = r * columnCount + c;
            const color = getColor(r, c);
            const includes = components.filter(component => component.include(r, c));
            var innerComponent = <></>;
            if (includes.length == 0) {
                innerComponent = (
                    <Button 
                        value={r + "-" + c}
                        sx={{ ...colSx, ...cellSx, bgcolor: color }}
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                        onMouseMove={onMouseMove}
                        onMouseLeave={onMouseLeave}
                    >
                    </Button>
                )
            }
            var borderTop = "none";
            var borderBottom = "none";
            var borderLeft = "none";
            var borderRight = "none";
            if (r == 0) {
                borderTop = borderStyle;
                borderBottom = borderStyle;
            } else  {
                borderBottom = borderStyle;
            } 
            if (c == 0) {
                borderLeft = borderStyle;
                borderRight = borderStyle;
            } else {
                borderRight = borderStyle;
            }
            
            const cellDivProps: CellProps = {
                color,
                height: Layout.BlogComponentRowHeight,
                width: divWidth,
                left: c * divWidth,
                top: r * Layout.BlogComponentRowHeight,
                borderBottom,
                borderLeft,
                borderTop,
                borderRight,
                borderColor,
            }
            return (
                <CellDiv key={key} {...cellDivProps}>
                    {innerComponent}
                </CellDiv>
            );
        });
    })
    const tilesProps: BlogComponentMapTileType = {
        cellWidth: divWidth,
        cellHeight: Layout.BlogComponentRowHeight,
        rowCount: emptyRowCount,
        colCount: 12,
        components,
    }
    return (
        <Box sx={{ height: rowCount * Layout.BlogComponentRowHeight, width }}>
            <Box sx={innerStyle}>

                
            </Box>
        </Box>
    );
}


export type CellProps = {
    left: number, 
    top: number,
    color: string,
    height: number,
    width: number,
    borderLeft: string,
    borderRight: string,
    borderTop: string,
    borderBottom: string,
    borderColor: string,
}

const CellDiv = styled.div.attrs<CellProps>(( props: CellProps ) => (
    {
        style: {
            top: props.top,
            left: props.left,
            height: props.height,
            width: props.width,
            borderTop: props.borderTop,
            borderBottom: props.borderBottom,
            borderRight: props.borderRight,
            borderLeft: props.borderLeft,
            borderColor: props.borderColor,
            backgroundColor: props.color,
        }
    }))<CellProps>`
    position: absolute;
  `