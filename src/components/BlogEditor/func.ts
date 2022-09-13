import { BlogEditorModeKeyValues, BlogEditorModeType } from "./type";

export const getSubWindowDefaultWidth = (mode: BlogEditorModeType, subWindowWidth: number) => {
    var width = 300;
    switch (mode) {
        case BlogEditorModeKeyValues.Files:
            break;
        case BlogEditorModeKeyValues.Flow:
            break;
        case BlogEditorModeKeyValues.Map:
            break;
        case BlogEditorModeKeyValues.Property:
            break;
    }
    if (width === 0) return 0;
    if (subWindowWidth < width) return width;
    return subWindowWidth;
}