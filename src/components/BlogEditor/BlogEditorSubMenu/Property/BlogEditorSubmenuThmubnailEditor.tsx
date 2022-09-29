import { Box, Button, Grid, SxProps, Theme, Tooltip, Typography } from "@mui/material";
import { useContext, useState } from "react";
import ImageIcon from '@mui/icons-material/Image';
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import DefaultButton, { DefaultButtonProps } from "../../../Button/DefaultButton";
import { BlogEditorMenuPropertyComponentProps } from "./type"
import { BlogEditorDialogKeyValues } from "../../../../organizations/BlogEditor/type";
import { BlogEditorColorSelectButton, BlogEditorColorSelectButtonProps } from "../../../Button/BlogEditorColorSelectButton";

export const BlogEditorSubmenuThmubnailEditor = ({ props } : { props: BlogEditorMenuPropertyComponentProps }) => {
    const { width, height, Blog, showDialog } = props;
    const { Palette, FontSize } = useContext(UiParamsContext);
    const paddingTopBottom = 0;
    const targetHeight = height - paddingTopBottom * 2;
    const hrefHeight = targetHeight / 2;
    const outerBox: SxProps<Theme> = {
        width, height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: paddingTopBottom,
    }
    const sidePadding = 1;
    const textRowItemSx: SxProps<Theme> = {
        width,
        height: hrefHeight,
        paddingLeft: sidePadding,
        paddingRight: sidePadding
    }
    const innerWidth = width - 2 * 8 * sidePadding;
    const hrefWidth = innerWidth * 0.85;
    const textItemSx: SxProps<Theme> = {
        width: hrefWidth,
        height: hrefHeight - 4,
        display: "flex",
        alignItems: "center",
        marginBottom:  2 / 8,
        marginTop: 2 / 8,
        bgcolor: Palette.Background.Light,
        borderRadius: 1,
        paddingLeft: 4 / 8,
        paddingRight: 4 / 8,
        cursor: "default"
    }
    const thumbnailSelectButtonSx: SxProps<Theme> = {
        width: innerWidth - hrefWidth,
        height: hrefHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
    const typoSx: SxProps<Theme> = {
        width: hrefWidth,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        fontSize: FontSize.Main,
    }
    const imageProps: DefaultButtonProps = {
        sx: {
            height: hrefHeight,
            width: (innerWidth - hrefWidth)
        },
        onClick: () => showDialog(BlogEditorDialogKeyValues.Thumbnail)
    }
    const rowHeight = (height - hrefHeight) / 2;
    const rowSx: SxProps<Theme> = {
        height: rowHeight,
        width: innerWidth,
        paddingTop: 0.5,
        paddingBottom: 0.5
    }
    const widthUnit = innerWidth * 0.1;
    const bottomRowSx: SxProps<Theme> = {
        height: rowHeight - 8,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden"
    }
    const fontColorButtonProps: BlogEditorColorSelectButtonProps = {
        height: rowHeight * 1 / 2,
        width: widthUnit * 3 / 1.5,
        color: Blog.Thumbnail.FontColor,
        onClick: () => showDialog(BlogEditorDialogKeyValues.ThumbnailFontColorEdit),
        transparentRow: 2
    }
    const backColorButtonProps: BlogEditorColorSelectButtonProps = {
        ...fontColorButtonProps,
        color: Blog.Thumbnail.FontBackColor,
        onClick: () => showDialog(BlogEditorDialogKeyValues.ThumbnailBackColorEdit),
    }
    return (
        <Grid container sx={outerBox}>
            <Grid item>
                <Grid container sx={textRowItemSx}>
                    <Grid item sx={textItemSx}>
                        <Tooltip title={Blog.Thumbnail.Src}>
                            <Typography sx={typoSx}>
                                {Blog.Thumbnail.Src}
                            </Typography>
                        </Tooltip>
                    </Grid>
                    <Grid item sx={thumbnailSelectButtonSx}>
                        <DefaultButton props={imageProps}>
                            <ImageIcon sx={{ color: Palette.Main.Vivid }} />
                        </DefaultButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container sx={rowSx}>
                    <Grid item sx={{ ...bottomRowSx, width: widthUnit * 1.5 }}>
                        <Typography fontSize={FontSize.Small} color={Palette.FontColor.Dark}>
                            Font
                        </Typography>
                    </Grid>
                    <Grid item sx={{ ...bottomRowSx, width: widthUnit * 3 }}>
                        <BlogEditorColorSelectButton props={fontColorButtonProps} />
                    </Grid>
                    <Grid item sx={{ ...bottomRowSx, width: widthUnit * 2.5 }}>
                        <Typography fontSize={FontSize.Small} color={Palette.FontColor.Dark}>
                            TextBack
                        </Typography>
                    </Grid>
                    <Grid item sx={{ ...bottomRowSx, width: widthUnit * 3 }}>
                        <BlogEditorColorSelectButton  props={backColorButtonProps} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}