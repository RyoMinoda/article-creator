import { Box, Button, Grid, SxProps, Theme, Tooltip, Typography } from "@mui/material";
import { useContext, useState } from "react";
import ImageIcon from '@mui/icons-material/Image';
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import DefaultButton, { DefaultButtonProps } from "../../../Button/DefaultButton";
import { BlogEditorMenuPropertyComponentProps } from "./type"
import { BlogEditorPopupKeyValues } from "../../../../organizations/BlogEditor/type";

export const BlogEditorSubmenuThmubnailEditor = ({ props } : { props: BlogEditorMenuPropertyComponentProps }) => {
    const { width, height, Blog, showPopup } = props;
    const { Palette, FontSize } = useContext(UiParamsContext);
    const paddingTopBottom = 1;
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
    const sidePadding = 2;
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
        paddingRight: 4 / 8
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
        fontSize: FontSize.Small,
    }
    const imageProps: DefaultButtonProps = {
        sx: {
            height: hrefHeight,
            width: (innerWidth - hrefWidth)
        },
        onClick: () => showPopup(BlogEditorPopupKeyValues.Thumbnail)
    }
    const colorRowSx: SxProps<Theme> = {
        height: height - hrefHeight,
        width: innerWidth,
        bgcolor: "yellow"
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
                            <ImageIcon sx={{ color: Palette.Main.Dark }} />
                        </DefaultButton>
                    </Grid>
                </Grid>

            </Grid>
            <Grid item sx={colorRowSx}>

            </Grid>
        </Grid>
    );
}