import { Box, Grid, SxProps, Theme } from "@mui/material";
import { BlogObj } from "../../../../../models/state/Blog/obj";
import { BlogComponentListItemObj, BlogComponentListObj } from "../../../../../models/state/BlogComponent/obj";
import { BlogComponentKeyValues } from "../../../../../models/state/BlogComponent/type";
import { MousePosition } from "../../../../../models/utils/MousePosition/type";
import { StorageOperationKeyValues, StorageOperationType } from "../../../../../utils/StorageOperation";
import { getMetaDisplayHeight } from "../func";
import { BlogEditorComponentEditorComponentItemMeta } from "../type";
import { BlogEditorComponentEditorMainLayout, BlogEditorComponentEditorMainLayoutProps } from "./BlogEditorComponentEditorMainLayout";
import { BlogEditorComponentEditorMainHeadline } from "./Components/Headline/BlogEditorComponentEditorMainHeadline";
import { BlogEditorComponentEditorMainComponentProps } from "./Components/type";

export type BlogEditorComponentEditorMainProps = {
    width: number,
    height: number,
    Blog: BlogObj,
    BlogComponentList: BlogComponentListObj,
    componentMetas: Array<BlogEditorComponentEditorComponentItemMeta>,
    activeComponentId: string,
    mousePosition: MousePosition,
    isPositionMode: boolean,
    updateComponentMetas: (componentMeta: BlogEditorComponentEditorComponentItemMeta, operation: StorageOperationType) => void,
    updateBlogComponentList: (componentItem: BlogComponentListItemObj, operation: StorageOperationType) => void,
    updateActiveBlogComponentId: (id: string) => void,
    updateIsPositionMode: (bool: boolean) => void,
}

export const BlogEditorComponentEditorMain = ({ props }: { props: BlogEditorComponentEditorMainProps }) => {
    const { width, height, BlogComponentList, componentMetas, updateActiveBlogComponentId, activeComponentId, updateComponentMetas } = props;
    if (height === 0) return <></>;
    const outerSx: SxProps<Theme> = {
        width, height
    }
    const paddingLR = 0.5;
    const paddingTB = 0.5;
    const topMenuHeight = 32;
    return (
        <Box sx={outerSx}>
            <Grid container>
                {BlogComponentList.Items
                .map((x, i) => {
                    const key = "component-" + i;
                    const metas = componentMetas.filter(y => x.Id === y.componentId);
                    if (metas.length === 0) return <Box key={key}></Box>;
                    if (metas[0].isHidden) return <Box key={key}></Box>;
                    const meta: BlogEditorComponentEditorComponentItemMeta = metas[0];
                    const componentHeight = getMetaDisplayHeight(x, meta, activeComponentId);
                    const layoutProps: BlogEditorComponentEditorMainLayoutProps = {
                        height: componentHeight,
                        width, 
                        componentMeta: meta,
                        component: x, 
                        paddingLR,
                        paddingTB,
                        menuHeight: topMenuHeight,
                        activeComponentId,
                        updateComponentMeta: (componentMeta: BlogEditorComponentEditorComponentItemMeta) => {
                            updateComponentMetas(componentMeta, StorageOperationKeyValues.Update);
                        },
                        updateActiveBlogComponentId: () => updateActiveBlogComponentId(x.Id),
                    }
                    const contentProps: BlogEditorComponentEditorMainComponentProps = {
                        ...props,
                        BlogComponentItem: x,
                        BlogComponentItemMeta: meta,
                        isActive: x.Id === activeComponentId,
                        width: width - 2 * paddingLR * 8,
                        height: componentHeight - topMenuHeight - 2 * 8 * paddingTB
                    }
                    var Component = <></>;
                    switch (x.ComponentType) {
                        case BlogComponentKeyValues.Headline:
                            Component = <BlogEditorComponentEditorMainHeadline props={contentProps} />;
                            break;
                    }
                    return (
                        <BlogEditorComponentEditorMainLayout props={layoutProps} key={x.Id}>
                            {Component}
                        </BlogEditorComponentEditorMainLayout>
                    );
                })}
            </Grid>
        </Box>
    );
}