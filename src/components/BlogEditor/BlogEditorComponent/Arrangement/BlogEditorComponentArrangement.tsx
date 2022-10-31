import { Box, Grid, Paper, Skeleton, SxProps, Theme, Typography } from "@mui/material"
import { useContext } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib"
import { BlogObj } from "../../../../models/state/Blog/obj";
import { BlogComponentListItemObj, BlogComponentListObj } from "../../../../models/state/BlogComponent/obj";
import { BlogPageListObj, BlogPageObj } from "../../../../models/state/BlogPage/obj";
import { MousePosition } from "../../../../models/utils/MousePosition/type";
import { BlogEditorDialogType } from "../../../../organizations/BlogEditor/type";
import { StorageOperationType } from "../../../../utils/StorageOperation";
import { BlogEditorComponentArrangementMain, BlogEditorComponentArrangementMainProps } from "./BlogEditorComponentArrangementMain";
import { BlogEditorComponentArrangementMenu, BlogEditorComponentArrangementMenuProps } from "./BlogEditorComponentArrangementMenu";

export type BlogEditorComponentArrangementProps = {
    width: number,
    height: number,
    Blog: BlogObj,
    mousePosition: MousePosition,
    activeBlogComponentId: string,
    BlogComponentList: BlogComponentListObj,
    BlogPage: BlogPageObj,
    showDialog: (type: BlogEditorDialogType) => void,
    updateBlogPage: (page: number, operation: StorageOperationType) => void,
    updateBlogComponent: (componentItem: BlogComponentListItemObj, operation: StorageOperationType) => void,
    updateBlogComponentList: (componentItem: BlogComponentListItemObj, operation: StorageOperationType) => void,
}

export const BlogEditorComponentArrangement = ({ props }: { props: BlogEditorComponentArrangementProps }) => {
    const { width, height, Blog, updateBlogPage } = props;
    const outerSx: SxProps<Theme> = {
        width, height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const menuHeight = 70;
    const mainHeight = height - menuHeight;
    const mainProps: BlogEditorComponentArrangementMainProps = {
        ...props,
        height: mainHeight,
    }
    const menuProps: BlogEditorComponentArrangementMenuProps = {
        ...props,
        height: menuHeight,
        width, Blog
    }
    return (
        <Box sx={outerSx}>
            <Grid container>
                <Grid item>
                    <BlogEditorComponentArrangementMain props={mainProps} />
                </Grid>
                <Grid item>
                    <BlogEditorComponentArrangementMenu props={menuProps} />
                </Grid>
            </Grid>
        </Box>
    );
}