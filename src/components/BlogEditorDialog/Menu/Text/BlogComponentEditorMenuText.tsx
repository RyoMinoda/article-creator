import { Grid, SxProps, Theme } from "@mui/material";
import DefaultButton, { DefaultButtonProps } from "../../../Button/DefaultButton";
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
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
import { BlogComponentListItemObj } from "../../../../models/state/BlogComponent/obj";
import { BlogComponentListItemAlignKeyValues, BlogComponentListItemAlignType, BlogComponentListItemOverflowKeyValues, BlogComponentListItemOverflowType } from "../../../../models/state/BlogComponent/type";
import { SelectionRange } from "../../../../models/utils/SelectionRange/type";
import { BlogComponentContentStyleListItemObj } from "../../../../models/state/BlogComponentContentStyle/obj";
import { BlogComponentContentStyleKeyValues, BlogComponentContentStyleType } from "../../../../models/state/BlogComponentContentStyle/type";
import { initialSelectionRange } from "../../../../models/utils/SelectionRange/lib";

export type BlogComponentEditorMenuTextProps = {
    width: number,
    height: number,
    BlogComponent: BlogComponentListItemObj,
    BlogComponentContentStyleList: BlogComponentContentStyleListItemObj[],
    selectionRange: SelectionRange,
    updateBlogComponent: (blogComponent: BlogComponentListItemObj) => void,
    updateContentStyle: (style: BlogComponentContentStyleType) => void,
}

export const BlogComponentEditorMenuText = ({ props }: { props: BlogComponentEditorMenuTextProps }) => {
    const { width, height, BlogComponentContentStyleList, BlogComponent, updateBlogComponent, updateContentStyle, selectionRange } = props;
    const { Palette } = useContext(UiParamsContext);
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
    
    const styles = BlogComponentContentStyleList.map(x => x.Style);
    const updateStyles = (style: BlogComponentContentStyleType) => updateContentStyle(style);

    const contentAny = selectionRange.Start !== initialSelectionRange.Start;
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
        onClick: () => updateStyles(BlogComponentContentStyleKeyValues.Italic),
    }
    const boldButtonProps: DefaultButtonProps = {
        ...buttonProps,
        onClick: () => updateStyles(BlogComponentContentStyleKeyValues.Bold),
    }
    const underlineButtonProps: DefaultButtonProps = {
        ...buttonProps,
        onClick: () => updateStyles(BlogComponentContentStyleKeyValues.Underline),
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
                <DefaultButton props={italicButtonProps}>
                    <FormatItalicIcon sx={getIconSx(contentAny)} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={boldButtonProps}>
                    <FormatBoldIcon sx={getIconSx(contentAny)} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={underlineButtonProps}>
                    <FormatUnderlinedIcon sx={getIconSx(contentAny)} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <FormatColorTextIcon sx={getIconSx(contentAny)} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <FormatColorFillIcon sx={getIconSx(contentAny)} />
                </DefaultButton>
            </Grid>
            <Grid item sx={menuButtonItemSx}>
                <DefaultButton props={buttonProps}>
                    <AddLinkIcon sx={getIconSx(contentAny)} />
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