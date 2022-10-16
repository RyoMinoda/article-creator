import { BlogComponentListItemObj } from "../../../../models/state/BlogComponent/obj";
import { BlogComponentKeyValues } from "../../../../models/state/BlogComponent/type";
import { BlogEditorComponentEditorComponentItemMeta, BlogEditorComponentEditorMenuKeyValues, BlogEditorComponentEditorMenuType } from "./type";

export const getBlogEditorComponentEditorNewComponentHeight = (menuType: BlogEditorComponentEditorMenuType, height: number): number => {
    switch (menuType) {
        case BlogEditorComponentEditorMenuKeyValues.Hidden:
            return 0;
        case BlogEditorComponentEditorMenuKeyValues.Short:
            return 80;
        case BlogEditorComponentEditorMenuKeyValues.Medium:
            return 200;
        case BlogEditorComponentEditorMenuKeyValues.Max:
            return height;
    }
}

export const getNextEditorMenuType = (menuType: BlogEditorComponentEditorMenuType, expand: boolean) => {
    if (menuType === BlogEditorComponentEditorMenuKeyValues.Max && expand) {
        return menuType;
    }
    if (menuType === BlogEditorComponentEditorMenuKeyValues.Short && !expand) {
        return menuType;
    }
    const array = Object.values(BlogEditorComponentEditorMenuKeyValues);
    const target = array.filter((x, i) =>  x === menuType)[0];
    const index = array.indexOf(target);
    return expand ? array[index + 1] : array[index - 1];
}

export const getMetaDisplayHeight = (component: BlogComponentListItemObj, meta: BlogEditorComponentEditorComponentItemMeta, activeId: string) => {
    if (meta.isHidden) return 0;
    switch (component.ComponentType) {
        case BlogComponentKeyValues.Headline:
            return component.Id === activeId ? 200 : 120;
    }
    return 100;
}