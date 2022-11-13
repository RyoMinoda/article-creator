import { Box, Grid, SxProps, Theme, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { BlogComponentListItemObj, BlogComponentListObj } from "../../models/state/BlogComponent/obj";
import { BlogComponentContentListItemObj, BlogComponentContentListObj } from "../../models/state/BlogComponentContent/obj";
import { BlogComponentContentListItem } from "../../models/state/BlogComponentContent/types";
import { BlogComponentContentStyleListItemObj } from "../../models/state/BlogComponentContentStyle/obj";
import { BlogComponentContentStyleType } from "../../models/state/BlogComponentContentStyle/type";
import { BlogPageObj } from "../../models/state/BlogPage/obj";
import { useScreenSize } from "../../models/utils/ScreenSize/func";
import { initialSelectionRange } from "../../models/utils/SelectionRange/lib";
import { SelectionRange } from "../../models/utils/SelectionRange/type";
import { StorageOperationKeyValues, StorageOperationType } from "../../utils/StorageOperation";
import { BlogComponentEditorMain, BlogComponentEditorMainProps } from "./Main/BlogComponentEditorMain";
import { BlogComponentEditorMenu, BlogComponentEditorMenuProps } from "./Menu/BlogComponentEditorMenu";
import { BlogComponentEditorViewer, BlogComponentEditorViewerProps } from "./Viewer/BlogComponentEditorViewer";

export type BlogEditorDialogProps = {
    BlogPage: BlogPageObj,
    BlogComponentContentList: BlogComponentContentListObj;
    BlogComponent: BlogComponentListItemObj,
    BlogComponentList: BlogComponentListObj,
    updateBlogComponentList: (blogComponent: BlogComponentListItemObj, operation: StorageOperationType) => void,
    updateBlogComponent: (blogComponent: BlogComponentListItemObj, operation: StorageOperationType) => void,
}

export const BlogEditorDialog = ({ props }: { props: BlogEditorDialogProps }) => {
    const { BlogPage, BlogComponent, BlogComponentList } = props;
    const { Layout, Palette } = useContext(UiParamsContext);
    const { screenWidth, screenHeight } = useScreenSize();
    const initialViewerHeight = 220;
    const [ viewerHeight, setViewerHeight ] = useState(initialViewerHeight);
    const [ blogComponent, setBlogComponent ] = useState(BlogComponent);
    const [ blogComponentContentList, setBlogComponentContentList ] = useState<Array<BlogComponentContentListItemObj>>([]);
    const [ blogComponentContentStyleList, setBlogComponentContentStyleList ] = useState<Array<BlogComponentContentStyleListItemObj>>([]);
    const [ selectionRange, setSelectionRange ] = useState<SelectionRange>(initialSelectionRange);
    const innerHeight = screenHeight - Layout.FullDialogTitleHeight;
    const outerSx: SxProps<Theme> = {
        width: screenWidth,
        height: innerHeight
    }
    const dividerHeight = 2;
    const menuHeight = 45;
    const mainHeight = innerHeight - viewerHeight - dividerHeight - menuHeight;
    const menuItemSx: SxProps<Theme> = {
        height: menuHeight,
        width: screenWidth
    }
    const updateComponentContentList = (contentList: BlogComponentContentListItemObj[]) => {
        setBlogComponentContentList(contentList);
    }
    const updateBlogComponent = (blogComponent: BlogComponentListItemObj) => {
        setBlogComponent(blogComponent);
    }
    const updateSelectRange = (range: SelectionRange) => setSelectionRange(range);
    const menuProps: BlogComponentEditorMenuProps = {
        ...props,
        height: menuHeight,
        width: screenWidth,
        BlogComponent: blogComponent,
        BlogComponentContentStyleList: blogComponentContentStyleList.filter(x => x.Start <= selectionRange.Start && selectionRange.End <= x.End),
        selectionRange,
        updateComponentContentList,
        updateBlogComponent,
        updateContentStyle: (style: BlogComponentContentStyleType) => {
            const styles = blogComponentContentStyleList.map(x => x.Style);
            if (styles.includes(style)) {
                const newStyles = blogComponentContentStyleList.filter(x => x.Style !== style);
                setBlogComponentContentStyleList(newStyles);
            } else {
                const styleItem = BlogComponentContentStyleListItemObj.create(selectionRange.Start, selectionRange.End, style);
                const newStyles = [ ...blogComponentContentStyleList, styleItem ];
                setBlogComponentContentStyleList(newStyles);
            }
            
        }
    }
    const editorSx: SxProps<Theme> = {
        width: screenWidth,
        height: mainHeight,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const editorMainProps: BlogComponentEditorMainProps = {
        width: screenWidth,
        height: mainHeight,
        BlogComponent: blogComponent,
        BlogComponentContentStyleList: blogComponentContentStyleList,
        updateComponentContentList,
        updateSelectRange,
        updateComponentContentStyleList: (blogComponentContentStyleList: BlogComponentContentStyleListItemObj[]) => {
            setBlogComponentContentStyleList(blogComponentContentStyleList);
        },
    }
    const dividerItemSx: SxProps<Theme> = {
        width: screenWidth,
        height: dividerHeight,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const dividerSx: SxProps<Theme> = {
        width: screenWidth,
        height: dividerHeight,
        bgcolor: Palette.Background.Dark
    }
    const viewerItemSx: SxProps<Theme> = {
        width: screenWidth,
        height: viewerHeight,
        overflow: "hidden",
        bgcolor: Palette.Background.Lighter
    }
    const viewerProps: BlogComponentEditorViewerProps = {
        width: screenWidth,
        height: viewerHeight,
        BlogPage, 
        BlogComponent: blogComponent,
        BlogComponentContentList: blogComponentContentList,
        BlogComponentContentStyleList: blogComponentContentStyleList
    }
    return (
        <Grid container sx={outerSx}>
            <Grid item sx={menuItemSx}>
                <BlogComponentEditorMenu props={menuProps} />
            </Grid>
            <Grid item sx={editorSx}>
                <BlogComponentEditorMain props={editorMainProps} />
            </Grid>
            <Grid item sx={dividerItemSx}>
                <Box sx={dividerSx} />
            </Grid>
            <Grid item sx={viewerItemSx}>
                <BlogComponentEditorViewer props={viewerProps} />
            </Grid>
        </Grid>
    );
}