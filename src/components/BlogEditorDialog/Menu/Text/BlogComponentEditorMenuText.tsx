import { Grid, SxProps, Theme } from "@mui/material";
import DefaultButton, { DefaultButtonProps } from "../../../Button/DefaultButton";
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import AddLinkIcon from '@mui/icons-material/AddLink';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';
import SettingsOverscanIcon from '@mui/icons-material/SettingsOverscan';
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { useContext } from "react";
import { DefaultSelector, DefaultSelectorProps } from "../../../Selector/DefaultSelector";
import { BlogComponentContentListItemObj } from "../../../../models/state/BlogComponentContent/obj";

export type BlogComponentEditorMenuTextProps = {
    width: number,
    height: number,
    BlogComponentContent: BlogComponentContentListItemObj
}

export const BlogComponentEditorMenuText = ({ props }: { props: BlogComponentEditorMenuTextProps }) => {
    const { width, height, BlogComponentContent } = props;
    const { Palette } = useContext(UiParamsContext);
    const outerSx: SxProps<Theme> = {
        width, height
    }
    const buttonSize = height * 0.95;
    const menuButtonItemSx: SxProps<Theme> = {
        width: height,
        height, 
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const iconSx: SxProps<Theme> = {
        color: Palette.FontColor.Dark
    }
    const buttonSx: SxProps<Theme> = {
        width: buttonSize,
        height: buttonSize,
    }
    const buttonProps: DefaultButtonProps = {
        sx: buttonSx,
        onClick: () => {

        }
    }
    const fontSizeSelectorWidth = 200;
    const selectorItemSx: SxProps<Theme> = {
        width: fontSizeSelectorWidth,
        height, 
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const selectorProps: DefaultSelectorProps = {
        label: "font-size",
        array: new Array(15).fill(1).map((_, i) => (8 + i).toString()),
        item: BlogComponentContent.FontSize.toString(),
        width: fontSizeSelectorWidth * 0.8,
        height,
        onChangeHandler: (index: number) => {

        }
    }
    return (
        <Grid container sx={outerSx}>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <FormatAlignJustifyIcon sx={iconSx} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <FormatAlignLeftIcon sx={iconSx} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <FormatAlignCenterIcon sx={iconSx} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <FormatAlignRightIcon sx={iconSx} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <FormatItalicIcon sx={iconSx} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <FormatBoldIcon sx={iconSx} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <FormatUnderlinedIcon sx={iconSx} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <FormatColorTextIcon sx={iconSx} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <FormatColorFillIcon sx={iconSx} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <AddLinkIcon sx={iconSx} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <BorderStyleIcon sx={iconSx} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <SettingsOverscanIcon sx={iconSx} />
                </DefaultButton>
            </Grid>
            <Grid item sx={selectorItemSx}>
                <DefaultSelector props={selectorProps} />
            </Grid>
        </Grid>
    );
}