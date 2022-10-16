import { Box, Grid, SxProps, Theme } from "@mui/material";
import DefaultButton, { DefaultButtonProps } from "../../../../Button/DefaultButton";
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { UiParamsContext } from "../../../../../models/context/UiParams/lib";
import { useContext, useState } from "react";
import { BlogEditorComponentEditorMenuKeyValues, BlogEditorComponentEditorMenuType } from "../type";
import { getNextEditorMenuType } from "../func";
import { BlogEditorComponentEditorMenuMap, BlogEditorComponentEditorMenuMapProps } from "./BlogEditorComponentEditorMenuMap";
import { BlogEditorComponentEditorComponentKeyValues, BlogEditorComponentEditorComponentType } from "./type";

export type BlogEditorComponentEditorMenuProps = {
    width: number,
    height: number,
    menuType: BlogEditorComponentEditorMenuType,
    updateMenuType: (menuType: BlogEditorComponentEditorMenuType) => void,
    componentTypeSelected: BlogEditorComponentEditorComponentType,
    menuTitles: Array<string>,
    menuTitleSelected: string
}

export const BlogEditorComponentEditorMenu = ({ props }: { props: BlogEditorComponentEditorMenuProps }) => {
    const { width, height, menuType, updateMenuType, componentTypeSelected, menuTitles, menuTitleSelected } = props;
    const { Palette } = useContext(UiParamsContext);
    const borderBottomWidth = 5;
    const outerSx: SxProps<Theme> = {
        width, height: height - borderBottomWidth,
        overflow: "hidden",
        bgcolor: Palette.Background.Lighter,
        transition: 'all .3s ease',
        position: "relative",
        borderBottomStyle: "solid",
        borderBottomWidth,
        borderBottomColor: Palette.Background.Main,
    }
    const buttonSize = 30;
    const menuSx: SxProps<Theme> = {
        position: "absolute",
        right: 0,
        top: 0,
        width: buttonSize * 2,
        height: buttonSize,
    }
    const buttonSx: SxProps<Theme> = {
        width: buttonSize,
        heigh: buttonSize,
        bgcolor: Palette.Background.Lighter,
        borderRadius: 1,
        padding: 0,
        margin: 0,
    }
    const expandButtonProps: DefaultButtonProps = {
        sx: buttonSx,
        onClick: () => {
            const target = getNextEditorMenuType(menuType, true);
            updateMenuType(target);
        },
        hoverBackgroundColor: Palette.Background.Lighter
    }
    const compactButtonProps: DefaultButtonProps = {
        sx: buttonSx,
        onClick: () => {
            const target = getNextEditorMenuType(menuType, false);
            updateMenuType(target);
        },
        hoverBackgroundColor: Palette.Background.Lighter
    }
    const iconSx: SxProps<Theme> = {
        width: buttonSize - 8,
        height: buttonSize - 8,
        paddingTop: 1 / 2,
        paddingBottom: 1 / 2,
        bgcolor: Palette.Background.Lighter,
    }
    const expandIconSx: SxProps<Theme> = {
        ...iconSx, 
        color: menuType === BlogEditorComponentEditorMenuKeyValues.Max ? 
            Palette.Background.Dark : Palette.Main.Vivid
    };
    const compactSx: SxProps<Theme> = {
        ...iconSx,
        color: menuType === BlogEditorComponentEditorMenuKeyValues.Short ? 
            Palette.Background.Dark : Palette.Main.Vivid
    }
    const mainContainerSx: SxProps<Theme> = {
        position: "absolute",
        width, height,
    }
    const mapProps: BlogEditorComponentEditorMenuMapProps = {
        width, height, menuType, 
        componentTypeSelected,
        menuTitles, menuTitleSelected,
    }
    return (
        <Box sx={outerSx}>
            <Grid container sx={mainContainerSx}>
                <BlogEditorComponentEditorMenuMap props={mapProps} />
            </Grid>
            <Grid container sx={menuSx}>
                <Grid item>
                    <DefaultButton  props={expandButtonProps}>
                        <UnfoldMoreIcon sx={expandIconSx} />
                    </DefaultButton>
                </Grid>
                <Grid item>
                    <DefaultButton props={compactButtonProps}>
                        <UnfoldLessIcon sx={compactSx} />
                    </DefaultButton>
                </Grid>
            </Grid>
        </Box>
    )
}