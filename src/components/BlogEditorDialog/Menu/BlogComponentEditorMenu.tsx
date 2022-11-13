import { Box, Divider, Grid, SxProps, Theme } from "@mui/material";
import { BlogComponentListItemObj } from "../../../models/state/BlogComponent/obj";
import { BlogComponentContentKeyValues } from "../../../models/state/BlogComponent/type";
import { BlogComponentContentListItemObj, BlogComponentContentListObj } from "../../../models/state/BlogComponentContent/obj";
import { BlogComponentContentStyleListItemObj } from "../../../models/state/BlogComponentContentStyle/obj";
import { BlogComponentContentStyleType } from "../../../models/state/BlogComponentContentStyle/type";
import { SelectionRange } from "../../../models/utils/SelectionRange/type";
import { BlogEditorComponentEditorMainTypeSelector, BlogEditorComponentEditorMainTypeSelectorProps } from "../../Selector/BlogEditorComponentEditorMainTypeSelector";
import { BlogComponentEditorMenuText, BlogComponentEditorMenuTextProps } from "./Text/BlogComponentEditorMenuText";

export type BlogComponentEditorMenuProps = {
    width: number,
    height: number,
    BlogComponentContentStyleList: BlogComponentContentStyleListItemObj[];
    BlogComponent: BlogComponentListItemObj;
    selectionRange: SelectionRange,
    updateComponentContentList: (blogComponentContentList: BlogComponentContentListItemObj[]) => void,
    updateBlogComponent: (blogComponent: BlogComponentListItemObj) => void,
    updateContentStyle: (style: BlogComponentContentStyleType) => void;
}

export const BlogComponentEditorMenu = ({ props }: { props: BlogComponentEditorMenuProps }) => {
    const { width, height, BlogComponent, updateComponentContentList, 
        updateBlogComponent, updateContentStyle } = props;
    const menuWidth = width - 20;
    const outerSx: SxProps<Theme> = {
        width, 
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    }
    const innerSx: SxProps<Theme> = {
        width: menuWidth,
        height,
    }
    const inputTypeWidth = 150;
    const dividerWidth = 15;
    const mainMenuWidth = menuWidth - inputTypeWidth - dividerWidth * 2;
    const selectorProps: BlogEditorComponentEditorMainTypeSelectorProps = {
        ...props,
        width: inputTypeWidth,
        height: height,
    }
    const selectorSx: SxProps<Theme> = {
        width: inputTypeWidth,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const mainSx: SxProps<Theme> = {
        width: mainMenuWidth,
        height,
    }
    const textProps: BlogComponentEditorMenuTextProps = {
        ...props,
        width: mainMenuWidth,
        height, 
        updateBlogComponent,
        updateContentStyle
    }
    const dividerItemSx: SxProps<Theme> = {
        width: dividerWidth,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    var ContentMenu = <></>;
    switch (BlogComponent.ContentType) {
        case BlogComponentContentKeyValues.Text:
            ContentMenu = <BlogComponentEditorMenuText props={textProps} />;
            break;
        case BlogComponentContentKeyValues.Table:
            break;
    }
    return (
        <Box sx={outerSx}>
            <Grid container sx={innerSx}>
                <Grid item sx={selectorSx}>
                    <BlogEditorComponentEditorMainTypeSelector props={selectorProps} />
                </Grid>
                <Grid item sx={dividerItemSx}>
                    <Divider orientation="vertical" />
                </Grid>
                <Grid item sx={mainSx}>
                    {ContentMenu}
                </Grid>
            </Grid>
        </Box>
    );
}