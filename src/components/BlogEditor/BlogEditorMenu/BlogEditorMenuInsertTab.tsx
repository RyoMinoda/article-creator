import { Button, Grid, SxProps, Theme, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { BlogComponentKeyValues, BlogComponentType } from "../../../models/state/BlogComponent/type";
import { BlogEditorMenuSelector, BlogEditorMenuSelectorProps } from "../../Selector/BlogEditorMenuSelector";
import { BlogEditorMenuItemLayout, BlogEditorMenuItemLayoutProps } from "./BlogEditorMenuItemLayout";
import { BlogEditorMapperProps, BlogEditorMenuTabProps } from "./types"

export const BlogEditorMenuInsertTab = ({ props }: { props: BlogEditorMenuTabProps }) => {
    const { width, height, mapperProps, updateMapperProps, updateMenuInsertProps, margin,
        addComponent } = props;
    const { col, row, colSpan, rowSpan, mapperValueChanged, menuValueChanged } = mapperProps;
    const { FontSize, Palette, Layout } = useContext(UiParamsContext);
    const [ rowSelected, setRowSelected ] = useState(row + 1);
    const [ colSelected, setColSelected ] = useState(col + 1);
    const [ rowSpanSelected, setRowSpanSelected ] = useState(rowSpan + 1);
    const [ colSpanSelected, setColSpanSelected ] = useState(colSpan + 1);
    const [ valueChanged, setValueChanged ] = useState(-1);
    const innerMargin = 1;
    const buttonAreaHeight = Layout.ButtonHeight + 8;
    const innerWidth = width - margin * 8 * 2;
    const columnCount = 5;
    const mainHeight = height - buttonAreaHeight - margin * 8 * 2;
    const cellWidth = (innerWidth / columnCount) - margin * 8;
    const titleHeight = mainHeight * 0.2;
    const contentHeight = mainHeight - titleHeight;
    const color = Palette.FontColor.Main;

    useEffect(() => {
        if (mapperValueChanged < 1) return;
        setRowSelected(row + 1);
        setColSelected(col + 1);
        setRowSpanSelected(rowSpan + 1);
        setColSpanSelected(colSpan + 1);
    }, [mapperValueChanged]);

    useEffect(() => {
        const f = async () => await new Promise(r => setTimeout(r, 1000));
        f();
        const menuProps: BlogEditorMapperProps = {
            row: rowSelected - 1, 
            col: colSelected - 1, 
            rowSpan: rowSpanSelected - 1, 
            colSpan: colSpanSelected - 1, 
            menuValueChanged: menuValueChanged + 1,
            mapperValueChanged
        }
        updateMenuInsertProps(menuProps);
    }, [valueChanged]);

    const contentWidth = cellWidth - innerMargin * 8;
    const contentSx: SxProps<Theme> = {
        width: contentWidth,
        height: contentHeight,
        display: "flex", 
        alignItems: "center", 
        justifyContent: "start"
    }
    const halfContentSx: SxProps<Theme> = {
        width: contentWidth / 2,
        height: contentHeight - 5,
        paddingLeft: innerMargin / 2,
        paddingRight: innerMargin / 2
    }
    const componentTypes = Object.values(BlogComponentKeyValues).map(x => x);
    const componentTypeProps: BlogEditorMenuSelectorProps = {
        label: "component-type",
        width: cellWidth - innerMargin * 2 * 8,
        height: contentHeight,
        array: componentTypes,
        item: componentTypes[0],
        onChangeHandler: (index: number) => {
            
        }
    }
    const subtitleWidth = contentWidth / 2 - 2;
    const subcontentHeight = contentHeight - titleHeight - 5;
    const subtitleSx : SxProps<Theme> = {
        height: titleHeight,
        width: subtitleWidth,
        paddingLeft: 1,

    }
    const subContentSx: SxProps<Theme> = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: subcontentHeight,
        width: subtitleWidth,
    }
    
    const rowSpanSelectorProps: BlogEditorMenuSelectorProps = {
        label: "rowSpan",
        width: subtitleWidth * 0.7,
        height: subcontentHeight,
        array: new Array(10).fill(1).map((x, i) => (i + 1).toString()),
        item: rowSpanSelected.toString(),
        onChangeHandler: (rowSpan: number) => {
            setRowSpanSelected(rowSpan+1);
            setValueChanged(valueChanged+1);
        }, 
    }
    const colSpanSelectorProps: BlogEditorMenuSelectorProps = {
        ...rowSpanSelectorProps,
        label: "colSpan",
        array: new Array(12).fill(1).map((x, i) => (i + 1).toString()),
        item: colSpanSelected.toString(),
        onChangeHandler: (colSpan: number) => {
            setColSpanSelected(colSpan + 1);
            setValueChanged(valueChanged + 1);
        }, 
    }
    const rowSelectorProps: BlogEditorMenuSelectorProps = {
        ...rowSpanSelectorProps,
        label: "row",
        array: new Array(20).fill(1).map((x, i) => (i + 1).toString()),
        item: rowSelected.toString(),
        onChangeHandler: (row: number) => {
            setRowSelected(row + 1);
            setValueChanged(valueChanged + 1);
        } 
    }
    const colSelectorProps: BlogEditorMenuSelectorProps = {
        ...rowSelectorProps,
        label: "col",
        array: new Array(20).fill(1).map((x, i) => (i + 1).toString()),
        item: colSelected.toString(),
        onChangeHandler: (col: number) => {
            setColSelected(col + 1);
            setValueChanged(valueChanged + 1);
        }, 
    }
    const createButtonSx: SxProps<Theme> = { 
        width: 100, 
        height: Layout.ButtonHeight, 
        textTransform: "none", 
        bgcolor: Palette.Main.Bright, 
        color: Palette.FontColor.Light,
        "&:active": {
            color: Palette.Main.Bright
        },
        "&:hover": {
            color: Palette.Main.Bright, 
            border: "solid 1px",
            borderColor: Palette.Main.Bright, 
        }
    }
    const onCreateClickHandler = () => {
        addComponent()
    }
    const itemLayoutProps: BlogEditorMenuItemLayoutProps = {
        width: cellWidth,
        height: mainHeight,
        title: "Type",
        splitUp: true
    }
    return (
        <Grid container>
            <Grid item>
                <Grid container sx={{ width: innerWidth, height: mainHeight, margin }}>
                    <BlogEditorMenuItemLayout props={{ ...itemLayoutProps, title: "Type" }}>
                        <BlogEditorMenuSelector props={componentTypeProps} />
                    </BlogEditorMenuItemLayout>
                    <BlogEditorMenuItemLayout props={{ ...itemLayoutProps, title: "Position" }}>
                        <Grid container sx={contentSx}>
                            <Grid item sx={halfContentSx}>
                                <Grid container>
                                    <Grid item sx={subtitleSx}>
                                        <Typography fontSize={FontSize.Small} color={color}>
                                            Row
                                        </Typography>
                                    </Grid>
                                    <Grid item sx={subContentSx}>
                                        <BlogEditorMenuSelector props={rowSelectorProps} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ ...halfContentSx, border: "none" }}>
                                <Grid container>
                                    <Grid item sx={subtitleSx}>
                                        <Typography fontSize={FontSize.Small} color={color}>
                                            Column
                                        </Typography>
                                    </Grid>
                                    <Grid item sx={subContentSx}>
                                        <BlogEditorMenuSelector props={colSelectorProps} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </BlogEditorMenuItemLayout>
                    <BlogEditorMenuItemLayout props={{ ...itemLayoutProps, title: "Size" }}>
                        <Grid container sx={contentSx}>
                            <Grid item sx={halfContentSx}>
                                <Grid container>
                                    <Grid item sx={subtitleSx}>
                                        <Typography fontSize={FontSize.Small} color={color}>
                                            RowSpan
                                        </Typography>
                                    </Grid>
                                    <Grid item sx={subContentSx}>
                                        <BlogEditorMenuSelector props={rowSpanSelectorProps} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ ...halfContentSx, border: "none" }}>
                                <Grid container>
                                    <Grid item sx={subtitleSx}>
                                        <Typography fontSize={FontSize.Small} color={color}>
                                            ColSpan
                                        </Typography>
                                    </Grid>
                                    <Grid item sx={subContentSx}>
                                        <BlogEditorMenuSelector props={colSpanSelectorProps} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </BlogEditorMenuItemLayout>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container sx={{ width, height: buttonAreaHeight, display: "flex", justifyContent: "center" }}>
                    <Button sx={createButtonSx} onClick={onCreateClickHandler}>
                        Insert
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}