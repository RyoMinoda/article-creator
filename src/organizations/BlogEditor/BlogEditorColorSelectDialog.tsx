import { Box, Grid, Slider, SxProps, Theme, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { BlogEditorColorSelectButton, BlogEditorColorSelectButtonProps } from "../../components/Button/BlogEditorColorSelectButton";
import { DialogLayout, DialogLayoutProps } from "../../components/Layout/DialogLayout";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { BlogPropertyKeyValues } from "../../models/state/Blog/type";
import { BlogEditorDialogProps } from "./type";

export const BlogEditorColorSelectDialog = ({ props }: { props: BlogEditorDialogProps }) => {
    const {  hideDialog, color, updateBlog, Blog, blogPropertyType, opacity, showDialog } = props;
    const { Palette, FontSize } = useContext(UiParamsContext);
    const [ paletteColor, setPaletteColor ] = useState(color);
    const [ paletteOpacity, setPaletteOpacity ] = useState(opacity);
    useEffect(() => {
        var newBlog = Blog.setProperty(blogPropertyType, paletteColor);
        updateBlog(newBlog);
    }, [paletteColor]);

    useEffect(() => {
        if (paletteOpacity !== undefined) {
            const newBlog = Blog.setProperty(BlogPropertyKeyValues.Opacity, paletteOpacity.toString());
            updateBlog(newBlog);
        }
    }, [paletteOpacity])

    const minWidth = 340;
    var colorsWidth = minWidth;
    var gaugeWidth = 0;
    if (opacity !== undefined) {
        colorsWidth = 280;
        gaugeWidth = minWidth - colorsWidth;
    }
    const minHeight = 380;
    const dialogProps: DialogLayoutProps = {
        minWidth,
        width: 400,
        minHeight: 400,
        showDialog,
        height: 500,
        hideDialog
    }
    const outerContainer: SxProps<Theme> = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
    const colors = [
        Palette.FontColor.Darker, Palette.Main.Vivid, Palette.Second.Green, Palette.Second.Red,
        Palette.Second.Orange, Palette.Second.Yellow, Palette.Second.Purple, Palette.Second.Blue,
        Palette.Second.YellowGreen, Palette.Second.RedPurple, 
        Palette.Pastel.Gray, Palette.FontColor.Main,
        Palette.Pastel.Purple, Palette.Pastel.Red, 
        Palette.Pastel.Yellow, Palette.Pastel.Green1, 
        Palette.Pastel.Green2, Palette.Pastel.Blue1, 
        Palette.Pastel.Blue2, Palette.Background.Lightest, "transparent"
    ];
    const columnCount = 4;
    const rowSize = colorsWidth / columnCount;
    const row = Math.ceil(colors.length / columnCount);
    const colorsScrollerSx: SxProps<Theme> = {
        width: colorsWidth,
        height: minHeight,
        overflow: "hidden",
        overflowY: "scroll",
        display: "flex",
        justifyContent: "start"
    }
    const colorsContent: SxProps<Theme> = {
        width: colorsWidth,
        height: row * rowSize,
        marginTop: 1,
        marginBottom: 3,
    }
    const gaugeContent: SxProps<Theme> = {
        width: gaugeWidth,
        height: minHeight,
    }
    const gaugeTitleHeight = 20;
    const gaugeContentSx: SxProps<Theme> = {
        width: gaugeWidth,
        height: minHeight - gaugeTitleHeight * 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 2,
        paddingBottom: 2,
    }
    const gaugeTitleContent: SxProps<Theme> = {
        width: gaugeWidth,
        height: gaugeTitleHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const itemSx: SxProps<Theme> = {
        height: rowSize,
        width: rowSize,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderColor: Palette.Main.Bright,
        borderStyle: "solid"
    }
    const handleChange = (event: Event, value: number | number[], activeThumb: number) => {
        if (typeof value === "number") {
            setPaletteOpacity(value);
        }
    }
    const gaugeComponent = (
        <Grid item sx={gaugeContent}>
            <Grid container>
                <Grid item sx={gaugeTitleContent}></Grid>
                <Grid item sx={gaugeContentSx}>
                    <Slider 
                        value={paletteOpacity} 
                        orientation="vertical"
                        aria-label="Default" 
                        step={0.1}
                        max={1}
                        min={0}
                        onChange={handleChange}
                        valueLabelDisplay="auto" />
                </Grid>
                <Grid item sx={gaugeTitleContent}>
                    <Typography fontSize={FontSize.Smaller}>
                        Opacity
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
    return (
        <DialogLayout props={dialogProps}>
            <Grid container  sx={outerContainer}>
                <Grid item sx={colorsScrollerSx}>
                    <Grid container sx={colorsContent}>
                        {colors.map((x, i) => {
                            const colorButtonProps: BlogEditorColorSelectButtonProps = {
                                width: rowSize - 8,
                                height: rowSize - 8,
                                color: x,
                                onClick: () => setPaletteColor(x),
                                transparentRow: 3
                            }
                            const borderWidth = paletteColor === x ? "2px" : "0px";
                            return (
                                <Grid item key={"palette-color-" + i} sx={{ ...itemSx, borderWidth, }}>
                                    <BlogEditorColorSelectButton props={colorButtonProps} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
                {opacity === undefined ? <></> : gaugeComponent} 
            </Grid>
        </DialogLayout>
    );
}