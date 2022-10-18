import { Box, Grid, SxProps, Theme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UiParamsContext } from "../../../../../../../models/context/UiParams/lib";
import { getBlogComponentStyles, getBlogComponentStyleStrings } from "../../../../../../../models/state/BlogComponent/func";
import { BlogComponentKeyValues, BlogComponentStyleType } from "../../../../../../../models/state/BlogComponent/type";
import { StorageOperationKeyValues } from "../../../../../../../utils/StorageOperation";
import DefaultButton, { DefaultButtonProps } from "../../../../../../Button/DefaultButton";
import CurledButton from "../../../../../../Button/CurledButton";
import { DefaultSelector, DefaultSelectorProps } from "../../../../../../Selector/DefaultSelector";
import { DefaultTextField, DefaultTextFieldProps } from "../../../../../../TextField/DefaultTextField";
import { BlogEditorComponentEditorMainItemLayout, BlogEditorComponentEditorMainItemLayoutProps, BlogEditorComponentEditorMainOuterLayout } from "../BlogEditorComponentEditorMainLayouts";
import { BlogEditorComponentEditorMainComponentItemProps } from "../type";

export const BlogEditorComponentEditorMainHeadlineActive = ({ props }: { props: BlogEditorComponentEditorMainComponentItemProps }) => {
    const { activeWidth, activeHeight, titleHeight, BlogComponentItem,
        paddingLR, paddingTB, mousePosition, isPositionMode,
        updateBlogComponentList, updateIsPositionMode } = props;
    const { FontSize, Palette } = useContext(UiParamsContext);
    const [ style, setStyle ] = useState<BlogComponentStyleType>(BlogComponentItem.Styles[0]);

    const innerWidth = activeWidth - paddingLR * 2 * 8;

    useEffect(() => {
        BlogComponentItem.Styles = [ style ];
        updateBlogComponentList(BlogComponentItem, StorageOperationKeyValues.Update);
    }, [style]);

    const rowHeightUnit = activeHeight / 3;
    const rowItemSx: SxProps<Theme> = {
        width: innerWidth,
        height: rowHeightUnit,
        color: Palette.FontColor.Dark,
    }
    const titleWidth = 50;
    const halfProps: BlogEditorComponentEditorMainItemLayoutProps = {
        ...props,
        width: innerWidth / 2,
        height: rowHeightUnit,
        titleHeight, titleWidth
    }
    const fullProps: BlogEditorComponentEditorMainItemLayoutProps = {
        ...props,
        width: activeWidth,
        height: rowHeightUnit,
        titleHeight, titleWidth
    }
    const typeArray = getBlogComponentStyleStrings(BlogComponentKeyValues.Headline);
    const typeSelectorProps: DefaultSelectorProps = {
        label: "Headline Type",
        array: typeArray,
        item: style.replace(BlogComponentKeyValues.Headline, ""),
        width: activeWidth / 3,
        height: rowHeightUnit - 20,
        onChangeHandler: (index: number) => {
            const target = getBlogComponentStyles(BlogComponentKeyValues.Headline)[index];
            setStyle(target);
        }
    }
    const mapButtonProps: DefaultButtonProps = {
        sx: {
            borderWidth: 1,
            borderStyle: "solid",
            color: Palette.FontColor.Alert,
            width: activeWidth / 3,
            height: rowHeightUnit / 1.6,
        },
        onClick: () => updateIsPositionMode(true),
    }
    const borderBottomColor = BlogComponentItem.StrContent === "" ? Palette.FontColor.Alert : Palette.FontColor.Dark;
    const textFieldBgcolor = BlogComponentItem.StrContent === "" ?  Palette.Background.DarkAlert : "transparent";
    const textFieldProps: DefaultTextFieldProps = {
        width: innerWidth * 0.8,
        height: rowHeightUnit / 1.2,
        initialText: BlogComponentItem.StrContent,
        updateText: (text: string) => {
            BlogComponentItem.StrContent = text;
            updateBlogComponentList(BlogComponentItem, StorageOperationKeyValues.Update);
        },
        sx: {
            borderBottomStyle: "solid",
            borderBottomWidth: 1,
            borderBottomColor,
            paddingLeft: 1,
            bgcolor: textFieldBgcolor,
        }
    }
    return (
        <BlogEditorComponentEditorMainOuterLayout props={props}>
            <Grid item sx={rowItemSx}>
                <Grid container>
                    <Grid item>
                        <BlogEditorComponentEditorMainItemLayout props={halfProps} title="Type">
                            <DefaultSelector props={typeSelectorProps} />
                        </BlogEditorComponentEditorMainItemLayout>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sx={rowItemSx}>
                <Grid item>
                    <BlogEditorComponentEditorMainItemLayout props={halfProps} title="Map">
                        <CurledButton props={mapButtonProps}>
                            Set Position
                        </CurledButton>
                    </BlogEditorComponentEditorMainItemLayout>
                </Grid>
            </Grid>
            <Grid item sx={rowItemSx}>
                <Grid container>
                    <Grid item>
                        <BlogEditorComponentEditorMainItemLayout props={fullProps} title="Text">
                            <DefaultTextField props={textFieldProps} />
                        </BlogEditorComponentEditorMainItemLayout> 
                    </Grid>
                </Grid>
            </Grid>
        </BlogEditorComponentEditorMainOuterLayout>
    )
}