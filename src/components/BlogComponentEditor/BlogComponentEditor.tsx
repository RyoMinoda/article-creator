import { Grid } from "@mui/material";
import { useContext, useState } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { BlogComponentObj } from "../../models/state/BlogComponent/obj";
import { BlogComponentType } from "../../models/state/BlogComponent/type";
import { BlogComponentEditorComponentList, BlogComponentEditorComponentListProps } from "./BlogComponentEditorComponentList";
import { BlogComponentEditorContent, BlogComponentEditorContentProps } from "./BlogComponentEditorContent";
import { ComponentMainEditorMenu, ComponentMainEditorMenuProps } from "./BlogComponentEditorMenu";
import { BlogEmptyComponent, BlogEmptyComponentProps } from "./BlogEmptyComponent";

export type BlogComponentEditorProps = {
    width: number,
    height: number,
    menuHeight: number,
    sideMargin: number,
    menuBottomMargin: number,
    emptyAreaHeight: number,
    components: Array<BlogComponentObj>,
    addComponent: (component: BlogComponentObj) => void,
    updateComponent: (component: BlogComponentObj) => void,
}

export const BlogComponentEditor = ({ props }: { props: BlogComponentEditorProps }) => {
    const { menuHeight, components, width, emptyAreaHeight, sideMargin, 
        menuBottomMargin, addComponent, updateComponent } = props;
    const [ componentType, setComponentType ] = useState<BlogComponentType>(BlogComponentType.Document);
    const [ activeComponentIndex, setActiveComponentIndex ] = useState(0);
    const { Layout } = useContext(UiParamsContext);
    const editorMenuProps: ComponentMainEditorMenuProps = {
        width, sideMargin,
        height: menuHeight,
        componentType, setComponentType,
        addComponent: () => {
            const row = components.length;
            const newComponent = new BlogComponentObj(componentType, components);
            setActiveComponentIndex(newComponent.getComponentIndex());
            addComponent(newComponent);
        }
    }
    const emptyComponentProps: BlogEmptyComponentProps = {
        ...props, height: emptyAreaHeight
    }
    const componentsHeight = components.length > 0 ? components.map((x) => x.RowSpan).reduce((a, b) => a + b) * Layout.BlogComponentRowHeight : 0;
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
        width: contentWidth,
        height: componentsHeight,
        updateComponent,
        updateActiveComponentIndex: (index: number) => {
            setActiveComponentIndex(index);
        }
    }
    const Components = (
        <Grid container sx={{ marginLeft: sideMargin / 8, marginTop: menuBottomMargin }}>
            <Grid item width={listWidth}>
                <BlogComponentEditorComponentList props={listProps} />
            </Grid>
            <Grid item width={contentWidth}>
                <BlogComponentEditorContent props={contentProps} />
            </Grid>
        </Grid>
    );
    return (
        <Grid container>
            <Grid item>
                <ComponentMainEditorMenu props={editorMenuProps} />
            </Grid>
            <Grid item>
                {components.length > 0 ? Components : <BlogEmptyComponent props={emptyComponentProps} />}
            </Grid>
        </Grid>
    );
}