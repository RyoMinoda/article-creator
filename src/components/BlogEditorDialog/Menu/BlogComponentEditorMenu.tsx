import { Box, Divider, Grid, SxProps, Theme } from "@mui/material";
import { BlogComponentContentListItemObj, BlogComponentContentListObj } from "../../../models/state/BlogComponentContent/obj";
import { BlogComponentContentKeyValues } from "../../../models/state/BlogComponentContent/types";
import { StorageOperationType } from "../../../utils/StorageOperation";
import { BlogEditorComponentEditorMainTypeSelector, BlogEditorComponentEditorMainTypeSelectorProps } from "../../Selector/BlogEditorComponentEditorMainTypeSelector";
import { BlogComponentEditorMenuText, BlogComponentEditorMenuTextProps } from "./Text/BlogComponentEditorMenuText";

export type BlogComponentEditorMenuProps = {
    width: number,
    height: number,
    BlogComponentContentList: BlogComponentContentListObj;
    BlogComponentContent: BlogComponentContentListItemObj;
    updateBlogComponentContentList: (blogComponentContentItem: BlogComponentContentListItemObj, operation: StorageOperationType) => void,
}

export const BlogComponentEditorMenu = ({ props }: { props: BlogComponentEditorMenuProps }) => {
    const { width, height, BlogComponentContent } = props;
    const menuWidth = width - 20;
    const outerSx: SxProps<Theme> = {
        width, 
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const innerSx: SxProps<Theme> = {
        width: menuWidth,
        height,
    }
    const inputTypeWidth = 150;
    const dividerWidth = 15;
    const mainMenuWidth = menuWidth - inputTypeWidth - dividerWidth;
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
        width: mainMenuWidth,
        height, BlogComponentContent
    }
    const dividerItemSx: SxProps<Theme> = {
        width: dividerWidth,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    var ContentMenu = <></>;
    switch (BlogComponentContent.Type) {
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