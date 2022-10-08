import { BlogEditorSubmenuAccordionKeyValues, BlogEditorSubmenuAccordionType } from "../types";

export const GetSubmenuPropertyItemHeight = (unit: number, type: BlogEditorSubmenuAccordionType) => {
    switch (type) {
        case BlogEditorSubmenuAccordionKeyValues.PropertyTitle:
            return unit * 2;
        case BlogEditorSubmenuAccordionKeyValues.PropertyDetail:
            return unit * 3.5;
        case BlogEditorSubmenuAccordionKeyValues.PropertyThumbnail:
            return unit * 3.5;
        case BlogEditorSubmenuAccordionKeyValues.PropertyTags:
            return unit * 3.5;
        case BlogEditorSubmenuAccordionKeyValues.PropertyOthers:
            return unit * 3;
        default:
            return unit;
    }
}

export const GetSubmenuPropertyTypes = () => {
    return [
        BlogEditorSubmenuAccordionKeyValues.PropertyTitle,
        BlogEditorSubmenuAccordionKeyValues.PropertyDetail,
        BlogEditorSubmenuAccordionKeyValues.PropertyThumbnail,
        BlogEditorSubmenuAccordionKeyValues.PropertyTags,
        BlogEditorSubmenuAccordionKeyValues.PropertyOthers
    ];
}