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
import CropDinIcon from '@mui/icons-material/CropDin';
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { useContext, useEffect, useState } from "react";
import { DefaultSelector, DefaultSelectorProps } from "../../../Selector/DefaultSelector";
import { BlogComponentContentListItemObj } from "../../../../models/state/BlogComponentContent/obj";
import { BlogComponentListItemObj } from "../../../../models/state/BlogComponent/obj";
import { BlogComponentListItemAlignKeyValues, BlogComponentListItemAlignType, BlogComponentListItemOverflowKeyValues, BlogComponentListItemOverflowType } from "../../../../models/state/BlogComponent/type";
import { BlogComponentContentStyleKeyValues, BlogComponentContentStyleType } from "../../../../models/state/BlogComponentContent/types";

export type BlogComponentEditorMenuTextProps = {
    width: number,
    height: number,
    BlogComponent: BlogComponentListItemObj,
    BlogComponentContent: BlogComponentContentListItemObj,
    updateBlogComponent: (blogComponent: BlogComponentListItemObj) => void,
}

export const BlogComponentEditorMenuText = ({ props }: { props: BlogComponentEditorMenuTextProps }) => {
    const { width, height, BlogComponentContent, BlogComponent, updateBlogComponent } = props;
    const { Palette } = useContext(UiParamsContext);
    const [ styles, setStyles ] = useState<BlogComponentContentStyleType[]>(BlogComponentContent.Styles);
    const [ alignType, setAlignType ] = useState<BlogComponentListItemAlignType>(BlogComponent.AlignType);
    const [ overflowType, setOverflowType ] = useState<BlogComponentListItemOverflowType>(BlogComponent.OverflowType);
    
    useEffect(() => {
        BlogComponent.AlignType = alignType;
        updateBlogComponent(BlogComponent);
    }, [alignType])

    useEffect(() => {
        BlogComponent.OverflowType = overflowType;
        updateBlogComponent(BlogComponent);
    }, [overflowType]);

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
    const activeIconColor = Palette.FontColor.Dark;
    const inactiveIconColor = Palette.Background.Darker;
    const getIconSx = (isActive: boolean) : SxProps<Theme> => {
        return {
            color: isActive ? activeIconColor : inactiveIconColor,
        }
    }
    const buttonSx: SxProps<Theme> = {
        width: buttonSize,
        height: buttonSize,
    }
    const buttonProps: DefaultButtonProps = {
        sx: buttonSx,
        onClick: () => {
            
        },
        hoverBackgroundColor: Palette.FontColor.Lighter
    }
    const alignLeftButtonProps: DefaultButtonProps = {
        ...buttonProps,
        onClick: () => setAlignType(BlogComponentListItemAlignKeyValues.Left),
    }
    const alignCenterButtonProps: DefaultButtonProps = {
        ...buttonProps,
        onClick: () => setAlignType(BlogComponentListItemAlignKeyValues.Center),
    }
    const alignRightButtonProps: DefaultButtonProps = {
        ...buttonProps,
        onClick: () => setAlignType(BlogComponentListItemAlignKeyValues.Right),
    }
    const includeItalic = styles.indexOf(BlogComponentContentStyleKeyValues.Italic) > -1;
    const italicButtonProps: DefaultButtonProps = {
        ...buttonProps,
        onClick: () => {

        },
    }
    const isOverflowIgnored = overflowType === BlogComponentListItemOverflowKeyValues.Ignored;
    const overflowIgnoreButtonProps: DefaultButtonProps = {
        ...buttonProps,
        onClick: () => setOverflowType(BlogComponentListItemOverflowKeyValues.Ignored)
    }
    const overflowHiddenButtonProps: DefaultButtonProps = {
        ...buttonProps,
        onClick: () => setOverflowType(BlogComponentListItemOverflowKeyValues.Hidden)
    }
    const fontSizeSelectorWidth = 200;
    const selectorItemSx: SxProps<Theme> = {
        width: fontSizeSelectorWidth,
        height, 
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const fontSizes = new Array(15).fill(1).map((_, i) => (8 + i).toString());
    const selectorProps: DefaultSelectorProps = {
        label: "font-size",
        array: fontSizes,
        item: BlogComponent.FontSize.toString(),
        width: fontSizeSelectorWidth * 0.8,
        height,
        onChangeHandler: (index: number) => {
            BlogComponent.FontSize = Number.parseInt(fontSizes[index]);
            updateBlogComponent(BlogComponent);
        }
    }
    return (
        <Grid container sx={outerSx}>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={alignLeftButtonProps}>
                    <FormatAlignLeftIcon sx={getIconSx(alignType === BlogComponentListItemAlignKeyValues.Left)} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={alignCenterButtonProps}>
                    <FormatAlignCenterIcon sx={getIconSx(alignType === BlogComponentListItemAlignKeyValues.Center)} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={alignRightButtonProps}>
                    <FormatAlignRightIcon sx={getIconSx(alignType === BlogComponentListItemAlignKeyValues.Right)} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <FormatItalicIcon sx={getIconSx(includeItalic)} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <FormatBoldIcon sx={getIconSx(true)} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <FormatUnderlinedIcon sx={getIconSx(true)} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <FormatColorTextIcon sx={getIconSx(true)} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <FormatColorFillIcon sx={getIconSx(true)} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <AddLinkIcon sx={getIconSx(true)} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={overflowIgnoreButtonProps}>
                    <BorderStyleIcon sx={getIconSx(isOverflowIgnored)} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={overflowHiddenButtonProps}>
                    <CropDinIcon sx={getIconSx(!isOverflowIgnored)} />
                </DefaultButton>
            </Grid>
            <Grid item sx={selectorItemSx}>
                <DefaultSelector props={selectorProps} />
            </Grid>
        </Grid>
    );
}