import { Box, Grid, SxProps, Theme } from "@mui/material";
import { BlogEditorComponentEditorMenuProps, BlogEditorComponentEditorMenu } from "./Menu/BlogEditorComponentEditorMenu";

import { BlogEditorComponentEditorComponentItemMeta, BlogEditorComponentEditorMenuType } from "./type";
import { BlogEditorComponentEditorMain, BlogEditorComponentEditorMainProps } from "./Main/BlogEditorComponentEditorMain";
import { BlogEditorComponentEditorComponentKeyValues, BlogEditorComponentEditorComponentType } from "./Menu/type";
import { useEffect, useState } from "react";
import { BlogObj } from "../../../../models/state/Blog/obj";
import { BlogComponentListItemObj, BlogComponentListObj } from "../../../../models/state/BlogComponent/obj";
import { StorageOperationType } from "../../../../utils/StorageOperation";
import { getBlogEditorComponentEditorNewComponentHeight } from "./func";

export type BlogEditorComponentEditorProps = {
    Blog: BlogObj,
    BlogComponentList: BlogComponentListObj,
    width: number,
    height: number,
    menuType: BlogEditorComponentEditorMenuType,
    canUpdateComponentWindowWidth: boolean,
    componentMetas: Array<BlogEditorComponentEditorComponentItemMeta>,
    activeComponentId: string,
    updateMenuType: (menuType: BlogEditorComponentEditorMenuType) => void,
    updateComponentMetas: (componentMeta: BlogEditorComponentEditorComponentItemMeta, operation: StorageOperationType) => void,
    updateActiveComponentId: (id: string) => void,
}

export const BlogEditorComponentEditor = ({ props }: { props: BlogEditorComponentEditorProps }) => {
    const { height, width, menuType, updateMenuType, canUpdateComponentWindowWidth, Blog, BlogComponentList, componentMetas } = props;
    const [ componentTypeSelected, setComponentTypeSelected ] = useState<BlogEditorComponentEditorComponentType>(BlogEditorComponentEditorComponentKeyValues.All);
    const all = "All";
    const [ menuTitleSelected, setMenuTitleSelected ] = useState(all);

    const outerSx: SxProps<Theme> = {
        width, height,
        overflow: "scroll"
    }
    const menuHeight = getBlogEditorComponentEditorNewComponentHeight(menuType, height);
    const menuItemSx: SxProps<Theme> = {
        width,
        height: menuHeight,
    }
    const menuTitlesWithoutEmpty = Blog.Components.map((x) => x.MenuTitle).filter(x => x !== "");
    const menuTitles = [ all, ...menuTitlesWithoutEmpty  ];
    const menuProps: BlogEditorComponentEditorMenuProps = {
        width, 
        height: menuHeight,
        menuType,
        componentTypeSelected, 
        menuTitleSelected,
        updateMenuType,
        menuTitles,
    }
    const mainProps: BlogEditorComponentEditorMainProps = {
        ...props,
        width, 
        height: height - menuHeight, 
    }
    const mainItemSx: SxProps<Theme> = {
        width,
        height: height - menuHeight,
        overflow: "hidden",
        overflowY: "scroll",
    }
    const skeltonSx: SxProps<Theme> = {
        width, height,
    }
    const Component = !canUpdateComponentWindowWidth ? (
        <Grid container>
            <Grid item sx={menuItemSx}>
                <BlogEditorComponentEditorMenu props={menuProps} />
            </Grid>
            <Grid item sx={mainItemSx}>
                <BlogEditorComponentEditorMain props={mainProps} />
            </Grid>
        </Grid>
    ) : <Box sx={skeltonSx} />;

    return (
        <Box sx={outerSx}>
            {Component}
        </Box>
    );
}