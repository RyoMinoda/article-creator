import { Box, Dialog, Divider, Grid, SxProps, Theme, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { useScreenSize } from "../../models/utils/ScreenSize/func";
import CloseIcon from '@mui/icons-material/Close';
import DefaultButton, { DefaultButtonProps } from "../Button/DefaultButton";
import { BlogEditorDialogType } from "../../organizations/BlogEditor/type";

export type DialogLayoutProps = {
    title: string,
    type: BlogEditorDialogType;
    minWidth: number,
    width: number,
    minHeight: number,
    height: number,
    hideDialog: () => void,
    updateDialogSize?: (width: number, height: number) => void,
    showDialog: boolean,
}

export const DialogLayout = ({ props, children }: { props: DialogLayoutProps, children: React.ReactNode }) => {
    const { width, height, hideDialog, updateDialogSize, showDialog, title } = props;
    const { Palette } = useContext(UiParamsContext);
    const [ windowWidth, setWindowWidth ] = useState(width);
    const [ windowHeight, setWindowHeight ] = useState(height);

    const dialogSx: SxProps<Theme> = {
        width: windowWidth, 
        height: windowHeight,
        borderRadius: 2,
    }
    const outerSx: SxProps<Theme> = {
        width: windowWidth, 
        height: windowHeight,
    }
    const topHeight = 80;
    const iconWidth = 60;
    const topRowSx: SxProps<Theme> = {
        width: windowWidth,
        height: topHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: Palette.Main.Bright
    }
    const titleSx: SxProps<Theme> = {

    }
    const contentSx: SxProps<Theme> = {
        width: windowWidth,
        height: windowHeight - topHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
    const iconSx: SxProps<Theme> = {
        width: 30,
        height: 30,
        color: Palette.FontColor.Dark
    }
    const buttonProps: DefaultButtonProps = {
        sx: {
            ...iconSx
        },
        onClick: () => hideDialog()
    }
    return (
        <Dialog open={showDialog} sx={dialogSx}>
            <Grid container sx={outerSx}>
                <Grid item sx={topRowSx}>
                    <Grid container>
                        <Grid item sx={titleSx}>
                            <Typography>
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item></Grid>
                    </Grid>
                </Grid>
                <Grid item sx={contentSx}>
                    {children}
                </Grid>
            </Grid>
        </Dialog>
    )
}