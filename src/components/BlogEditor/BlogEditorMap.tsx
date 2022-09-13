import { Grid, SxProps } from "@mui/material";
import { useContext, useState } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { BlogComponentObj } from "../../models/state/BlogComponent/obj";
import { BlogComponentKeyValues, BlogComponentType } from "../../models/state/BlogComponent/type";
import { BlogComponentEditorComponentList, BlogComponentEditorComponentListProps } from "./ComponentEditor/BlogComponentEditorComponentList";
import { BlogComponentEditorContent, BlogComponentEditorContentProps } from "./ComponentEditor/BlogComponentEditorContent";
import { BlogEditorFlow, BlogEditorFlowProps } from "./BlogEditorFlow/BlogEditorFlow";
import { BlogEditorMenu, BlogEditorMenuProps } from "./BlogEditorMenu/BlogEditorMenu";
import { BlogEditorMapperProps } from "./BlogEditorMenu/types";
import { BlogComponentMap, BlogComponentMapProps } from "./CompornentMap/BlogComponentMap";
import { BlogEditorMenuTabType, BlogEditorModeKeyValues, BlogEditorModeType } from "./type";

export type BlogEditorMapProps = {
    width: number,
    height: number,
    menuHeight: number,
    menuBottomMargin: number,
    emptyRowCount: number,
    components: Array<BlogComponentObj>,
    tabType: string,
    modeType: string,
    addComponent: (component: BlogComponentObj) => void,
    updateComponent: (component: BlogComponentObj) => void,
    updateTabType: (tabType: BlogEditorMenuTabType) => void,
    updateModeType: (modeType: BlogEditorModeType) => void,
}

export const BlogEditorMap = ({ props }: { props: BlogEditorMapProps }) => {
    const { menuHeight, components, width, height, tabType, emptyRowCount, modeType,
        menuBottomMargin, addComponent, updateComponent, updateTabType } = props;
    const [ row, setRow ] = useState(0);
    const [ col, setCol ] = useState(0);
    const [ rowSpan, setRowSpan ] = useState(1);
    const [ colSpan, setColSpan ] = useState(11);
    const [ mapperValueChanged, setMapperValueChanged ] = useState(-1);
    const [ menuValueChanged, setMenuValueChanged ] = useState(-1);
    const [ componentType, setComponentType ] = useState<BlogComponentType>(BlogComponentKeyValues.Article);
    const [ activeComponentIndex, setActiveComponentIndex ] = useState(0);
    const { Layout } = useContext(UiParamsContext);
    const mapperProps: BlogEditorMapperProps = { row, col, rowSpan, colSpan, mapperValueChanged, menuValueChanged };

    const componentMapperProps: BlogComponentMapProps = {
        ...props, mapperProps,
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
    const componentsHeight = components.length > 0 ? components.map((x) => x.RowSpan)
        .reduce((a, b) => a + b) * Layout.BlogComponentRowHeight : 0;
    const listWidth = width * 0.3;
    const contentWidth = width - listWidth;
    const flowProps: BlogEditorFlowProps = {

    }
    const listProps: BlogComponentEditorComponentListProps = {
        components, activeComponentIndex,
        width: listWidth, 
        height: componentsHeight,
        onClickListItem: (index: number) => setActiveComponentIndex(index)
    }
    const contentProps: BlogComponentEditorContentProps = {
        components, 
        rowCount: emptyRowCount,
        width: contentWidth,
        height,
        updateComponent,
        updateActiveComponentIndex: (index: number) => {
            setActiveComponentIndex(index);
        }
    }
    var Component = <></>;
    switch (modeType) {
        case  BlogEditorModeKeyValues.Flow:
            Component = <BlogEditorFlow props={componentMapperProps} />;
            break;
        case BlogEditorModeKeyValues.Property:
            Component = (    
                <Grid container sx={{ marginTop: menuBottomMargin }}>
                    <Grid item width={listWidth}>
                        <BlogComponentEditorComponentList props={listProps} />
                    </Grid>
                    <Grid item width={contentWidth}>
                        <BlogComponentEditorContent props={contentProps} />
                    </Grid>
                </Grid>
            );
            break;
        case BlogEditorModeKeyValues.Map:
            Component = <BlogComponentMap props={componentMapperProps} />;
            break;
        default:
            break;
    }
    return (
        <Grid container>
            <Grid item>
                
            </Grid>
            <Grid item>
                {Component}
            </Grid>
        </Grid>
    );
}