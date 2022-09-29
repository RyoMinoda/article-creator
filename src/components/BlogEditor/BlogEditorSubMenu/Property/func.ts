import { BlogEditorSubmenuPropertyItemKeyValues, BlogEditorSubmenuPropertyItemType } from "./type";

export const getSubmenuPropertyItemHeight = (unit: number, type: BlogEditorSubmenuPropertyItemType) => {
    switch (type) {
        case BlogEditorSubmenuPropertyItemKeyValues.Title:
            return unit;
        case BlogEditorSubmenuPropertyItemKeyValues.Detail:
            return unit * 3;
        case BlogEditorSubmenuPropertyItemKeyValues.Thumbnail:
            return unit * 3;
        case BlogEditorSubmenuPropertyItemKeyValues.Tags:
            return unit * 3;
        case BlogEditorSubmenuPropertyItemKeyValues.Others:
            return unit * 3;
        default:
            return unit;
    }
}