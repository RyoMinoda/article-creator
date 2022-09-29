import { Box, SxProps, Theme } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { useScreenSize } from "../../models/utils/ScreenSize/func";
import CloseIcon from '@mui/icons-material/Close';
import DefaultButton, { DefaultButtonProps } from "../Button/DefaultButton";
import { Task } from "../../models/utils/Task/obj";


export type DialogLayoutProps = {
    minWidth: number,
    width: number,
    minHeight: number,
    height: number,
    hideDialog: () => void,
    updateDialogSize?: (width: number, height: number) => void,
    showDialog: boolean,
}

export const DialogLayout = ({ props, children }: { props: DialogLayoutProps, children: React.ReactNode }) => {
    const { width, height, minWidth, minHeight, hideDialog, updateDialogSize, showDialog } = props;
    const { screenHeight, screenWidth } = useScreenSize();
    const { Palette } = useContext(UiParamsContext);
    const [ windowWidth, setWindowWidth ] = useState(width);
    const [ windowHeight, setWindowHeight ] = useState(height);
    useEffect(() => {
        const maxWidth = screenWidth * 0.9;
        const maxHeight = screenHeight * 0.9;
        var targetWidth = 0;
        if (maxWidth < width) {
            targetWidth = maxWidth;
        } else {
            targetWidth = width;
        }
        var targetHeight = 0;
        if (maxHeight < height) {
            targetHeight = maxHeight;
        } else {
            targetHeight = height;
        } 
        if (updateDialogSize !== undefined) {
            setWindowWidth(targetWidth);
            setWindowHeight(targetHeight);
            updateDialogSize(targetWidth, targetHeight);
        }
    }, [screenWidth, screenHeight, showDialog]);

    const outerSx: SxProps<Theme> = {
        width: windowWidth,
        height: windowHeight,
        borderRadius: 2,
        bgcolor: Palette.Background.Light,
        overflow: "hidden",
        position: "relative"
    }
    const topHeight = windowHeight / 13;
    const topRowSx: SxProps<Theme> = {
        width: topHeight,
        height: topHeight,
        position: "absolute",
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
    const contentSx: SxProps<Theme> = {
        width: windowWidth,
        height: windowHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
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
        <Box sx={outerSx}>
            <Box sx={contentSx}>
                {children}
            </Box>
            <Box sx={topRowSx}>
                <DefaultButton props={buttonProps}>
                    <CloseIcon sx={iconSx} />
                </DefaultButton>
            </Box>
        </Box>
    )
}