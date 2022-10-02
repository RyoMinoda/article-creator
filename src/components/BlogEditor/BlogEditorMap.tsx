import { useState } from "react";
import { BlogComponentListItemObj } from "../../models/state/BlogComponent/obj";
import { BlogEditorMapperProps } from "./BlogEditorMenu/types";
import { BlogComponentMap, BlogComponentMapProps } from "./CompornentMap/BlogComponentMap";
import { BlogEditorMainComponentProps, BlogEditorMenuTabType, BlogEditorModeKeyValues, BlogEditorModeType } from "./type";
import { BlogObj } from "../../models/state/Blog/obj";
import { BlogListItemObj } from "../../models/state/BlogList/obj";
import { BlogEditorFlow } from "./BlogEditorFlow/BlogEditorFlow";
import { BlogEditorBlogListItemViewer } from "./BlogEditorBlogListItemVeiwer/BlogEditorBlogListItemViewer";
import { Box, SxProps, Theme } from "@mui/material";
import { BlogEditorDialogType } from "../../organizations/BlogEditor/type";

export type BlogEditorMapProps = {
    width: number,
    height: number,
    menuHeight: number,
    menuBottomMargin: number,
    emptyRowCount: number,
    tabType: string,
    modeType: string,
    addComponent: (component: BlogComponentListItemObj) => void,
    updateComponent: (component: BlogComponentListItemObj) => void,
    updateTabType: (tabType: BlogEditorMenuTabType) => void,
    updateModeType: (modeType: BlogEditorModeType) => void,
    showDialog: (type: BlogEditorDialogType) => void,
    Blog: BlogObj
}

export const BlogEditorMap = ({ props }: { props: BlogEditorMapProps }) => {
    const { modeType, Blog, width, height } = props;
    const [ row, setRow ] = useState(0);
    const [ col, setCol ] = useState(0);
    const [ rowSpan, setRowSpan ] = useState(1);
    const [ colSpan, setColSpan ] = useState(11);
    const [ mapperValueChanged, setMapperValueChanged ] = useState(-1);
    const [ menuValueChanged, setMenuValueChanged ] = useState(-1);
    const mapperProps: BlogEditorMapperProps = { row, col, rowSpan, colSpan, mapperValueChanged, menuValueChanged };

    const componentMapperProps: BlogComponentMapProps = {
        ...props, mapperProps,
        components: Blog.Components,
        updatePosition: (r: number, c: number) => {
            setRow(r);
            setCol(c);
            setMapperValueChanged(mapperValueChanged+1);
        },
        updateSpan: (rs: number, cs: number) => {
            setRowSpan(rs);
            setColSpan(cs);
            setMapperValueChanged(mapperValueChanged+1);
        } 
    }
    const componentProps: BlogEditorMainComponentProps = {
        ...props
    }
    var Component = <></>;
    switch (modeType) {
        case  BlogEditorModeKeyValues.Flow:
            Component = <BlogEditorFlow props={componentMapperProps} />;
            break;
        case BlogEditorModeKeyValues.Property:
            Component = <BlogEditorBlogListItemViewer props={componentProps} />;
            break;
        case BlogEditorModeKeyValues.Component:
            Component = <BlogComponentMap props={componentMapperProps} />;
            break;
    }
    const boxSx: SxProps<Theme> = {
        width,
        height,
        overflow: "scroll"
    }
    return (
        <Box sx={boxSx}>
            {Component}
        </Box>
    )
}