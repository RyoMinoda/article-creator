import { Grid, SxProps } from "@mui/material";
import { useContext, useState } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { BlogComponentObj } from "../../models/state/BlogComponent/obj";
import { BlogComponentType } from "../../models/state/BlogComponent/type";
import { BlogComponentEditorComponentList, BlogComponentEditorComponentListProps } from "./BlogComponentEditorComponentList";
import { BlogComponentEditorContent, BlogComponentEditorContentProps } from "./BlogComponentEditorContent";
import { ComponentEditorMenu, ComponentEditorMenuProps } from "./ComponentEditorMenu/ComponentEditorMenu";
import { ComponentEditorMapperProps, ComponentEditorMenuTabType } from "./ComponentEditorMenu/types";
import { BlogComponentMap, BlogComponentMapProps } from "./CompornentMap/BlogComponentMap";

export type BlogComponentEditorProps = {
    width: number,
    height: number,
    menuHeight: number,
    sideMargin: number,
    menuBottomMargin: number,
    emptyRowCount: number,
    components: Array<BlogComponentObj>,
    tabType: string,
    addComponent: (component: BlogComponentObj) => void,
    updateComponent: (component: BlogComponentObj) => void,
    updateTabType: (tabType: string) => void,
}

export const BlogComponentEditor = ({ props }: { props: BlogComponentEditorProps }) => {
    const { menuHeight, components, width, sideMargin, height, tabType, emptyRowCount,
        menuBottomMargin, addComponent, updateComponent, updateTabType } = props;
    const [ row, setRow ] = useState(0);
    const [ col, setCol ] = useState(0);
    const [ rowSpan, setRowSpan ] = useState(1);
    const [ colSpan, setColSpan ] = useState(11);
    const [ mapperValueChanged, setMapperValueChanged ] = useState(-1);
    const [ menuValueChanged, setMenuValueChanged ] = useState(-1);
    const [ componentType, setComponentType ] = useState<BlogComponentType>(BlogComponentType.Article);
    const [ activeComponentIndex, setActiveComponentIndex ] = useState(0);
    const { Layout } = useContext(UiParamsContext);
    const mapperProps: ComponentEditorMapperProps = { row, col, rowSpan, colSpan, mapperValueChanged, menuValueChanged };
    const editorMenuProps: ComponentEditorMenuProps = {
        width, sideMargin, mapperProps,
        height: menuHeight,
        componentType,
        tabType, 
        addComponent: () => {
            const newComponent = new BlogComponentObj(
                componentType, col, row, rowSpan + 1, colSpan + 1, components
            );
            setActiveComponentIndex(newComponent.getComponentIndex());
            addComponent(newComponent);
            const target = [ ...components, newComponent ];
            const { X, Y, ColumnSpan, RowSpan } = BlogComponentObj.create(componentType, target);
            setCol(X);
            setRow(Y);
            setRowSpan(RowSpan);
            setColSpan(ColumnSpan);
            setMapperValueChanged(mapperValueChanged + 1);
        },
        updateComponentType: (componentType: BlogComponentType) => {
            setComponentType(componentType);
        },
        updateTabType: (tabType: string) => updateTabType(tabType),
        updateMapperProps: (mapProps: ComponentEditorMapperProps) => {
            setCol(mapProps.col);
            setRow(mapProps.row);
            setColSpan(mapProps.colSpan);
            setRowSpan(mapProps.rowSpan);
            setMapperValueChanged(mapProps.mapperValueChanged);
        },
        updateMenuCreationProps: (menuProps: ComponentEditorMapperProps) => {
            setCol(menuProps.col);
            setRow(menuProps.row);
            setColSpan(menuProps.colSpan);
            setRowSpan(menuProps.rowSpan);
            setMenuValueChanged(menuProps.menuValueChanged);
        },
    }
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
    const contentsWidth = width - 2 * sideMargin;
    const listWidth = contentsWidth * 0.3;
    const contentWidth = contentsWidth - listWidth;
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
    switch (tabType) {
        case  ComponentEditorMenuTabType.Creation:
            Component = <BlogComponentMap props={componentMapperProps} />;
            break;
        default:
            Component = (    
                <Grid container sx={{ marginLeft: sideMargin / 8, marginTop: menuBottomMargin }}>
                    <Grid item width={listWidth}>
                        <BlogComponentEditorComponentList props={listProps} />
                    </Grid>
                    <Grid item width={contentWidth}>
                        <BlogComponentEditorContent props={contentProps} />
                    </Grid>
                </Grid>
            );
            break;
    }
    return (
        <Grid container>
            <Grid item>
                <ComponentEditorMenu props={editorMenuProps} />
            </Grid>
            <Grid item>
                {Component}
            </Grid>
        </Grid>
    );
}