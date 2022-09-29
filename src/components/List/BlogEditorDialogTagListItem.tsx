import { Button, Grid, SxProps, Theme, Typography } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { BlogTagItemObj } from "../../models/state/BlogTag/obj";
import DefaultButton, { DefaultButtonProps } from "../Button/DefaultButton";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export type BlogEditorDialogTagListItemProps = {
    width: number,
    height: number,
    item: BlogTagItemObj,
    isActive: boolean,
    updateIsActive: () => void,
}

export const BlogEditorDialogTagListItem = ({ props }: { props: BlogEditorDialogTagListItemProps }) => {
    const { width, height, isActive, updateIsActive, item } = props;
    const { Palette } = useContext(UiParamsContext);
    const defaultColor = Palette.Background.Lightest;
    const buttonPadding = 2;
    const buttonProps: DefaultButtonProps = {
        sx: {
            width,
            height,
            bgcolor: isActive ? Palette.Background.Lightest :  Palette.Background.Lighter,
            borderRadius: 0,
            padding: buttonPadding,
            margin: 0,
        },
        onClick: updateIsActive,
        hoverBackgroundColor: defaultColor
    }
    const buttonInnerWidth = width - 2 * 8 * buttonPadding;
    const innerBoxSx: SxProps<Theme> = {
        width: buttonInnerWidth, 
        height,
    }
    const iconSize = height / 2;
    const iconItemSx: SxProps<Theme> = {
        width: height, height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    }
    const textItemSx: SxProps<Theme> = {
        width: buttonInnerWidth - height,
        height, 
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        paddingLeft: 3
    }
    const color = isActive ? Palette.Main.Deep : Palette.Background.Dark;
    const iconSx: SxProps<Theme> = {
        width: iconSize,
        height: iconSize,
        color
    };
    const icon = isActive ? <CheckCircleOutlineIcon sx={iconSx} /> : <RadioButtonUncheckedIcon sx={iconSx} />;
    return (
        <DefaultButton props={buttonProps}>
            <Grid container sx={innerBoxSx}>
                <Grid item sx={iconItemSx}>
                    {icon}
                </Grid>
                <Grid item sx={textItemSx}>
                    <Typography color={color}>
                        {item.Tag}
                    </Typography>
                </Grid>
            </Grid>
        </DefaultButton>
    )
}