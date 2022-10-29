import { Box, Dialog, Divider, Grid, SxProps, Theme, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { useScreenSize } from "../../models/utils/ScreenSize/func";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import DefaultButton, { DefaultButtonProps } from "../Button/DefaultButton";
import { BlogEditorDialogType } from "../../organizations/BlogEditor/type";

export type FullDialogLayoutProps = {
    title: string,
    type: BlogEditorDialogType;
    hideDialog: () => void,
    updateDialogSize?: (width: number, height: number) => void,
    showDialog: boolean,
}

export const FullDialogLayout = ({ props, children }: { props: FullDialogLayoutProps, children: React.ReactNode }) => {
    const { hideDialog, updateDialogSize, showDialog, title } = props;
    const { Palette, FontSize, Layout } = useContext(UiParamsContext);
    const { screenHeight, screenWidth } = useScreenSize();

    const dialogSx: SxProps<Theme> = {
        borderRadius: 2,
    }
    const outerSx: SxProps<Theme> = {
        width: screenWidth, 
        height: screenHeight,
        overflow: "hidden"
    }
    const iconsWidth = 120;
    const topRowSx: SxProps<Theme> = {
        width: screenWidth,
        height: Layout.FullDialogTitleHeight,
        bgcolor: Palette.Main.Bright,
    }
    const titleItemSx: SxProps<Theme> = {
        width: screenWidth - iconsWidth,
        height: Layout.FullDialogTitleHeight,
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
    }
    const iconItemSx: SxProps<Theme> = {
        width: iconsWidth / 2,
        height: Layout.FullDialogTitleHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
    const titleSx: SxProps<Theme> = {
        color: Palette.FontColor.Lightest,
        fontSize: FontSize.Large,
        marginLeft: 3,
    }
    const contentSx: SxProps<Theme> = {
        width: screenWidth,
        height: screenHeight - Layout.FullDialogTitleHeight,
        bgcolor: Palette.Background.Light,
    }
    const buttonSx: SxProps<Theme> = {
        width: iconsWidth / 2,
        height: Layout.FullDialogTitleHeight,
    }
    const buttonProps: DefaultButtonProps = {
        sx: buttonSx,
        onClick: () => hideDialog()
    }
    return (
        <Dialog open={showDialog} sx={dialogSx} fullScreen >
            <Grid container sx={outerSx}>
                <Grid item sx={topRowSx}>
                    <Grid container>
                        <Grid item sx={titleItemSx}>
                            <Typography sx={titleSx}>
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item sx={iconItemSx}>
                            <DefaultButton props={buttonProps}>
                                <CheckIcon sx={{ color: Palette.FontColor.Lightest }} />
                            </DefaultButton>
                        </Grid>
                        <Grid item sx={iconItemSx}>
                            <DefaultButton props={buttonProps}>
                                <CloseIcon sx={{ color: Palette.FontColor.Lightest }} />
                            </DefaultButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={contentSx}>
                    {children}
                </Grid>
            </Grid>
        </Dialog>
    );
}