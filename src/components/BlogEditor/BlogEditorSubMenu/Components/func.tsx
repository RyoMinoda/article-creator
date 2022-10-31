import { BlogEditorSubmenuAccordionKeyValues, BlogEditorSubmenuAccordionType } from "../types";


export const GetSubmenuComponentItemHeight = (
    type: BlogEditorSubmenuAccordionType, 
    height: number, 
    accordions: Array<BlogEditorSubmenuAccordionType>, 
    activeAccordions: Array<BlogEditorSubmenuAccordionType>, 
    titleHeight: number
) => {
    const targetHeight = height - accordions.length * titleHeight - 10;
    const unit = targetHeight / 7;
    switch (type) {
        case BlogEditorSubmenuAccordionKeyValues.ComponentMenu:
            return unit * 2;
        case BlogEditorSubmenuAccordionKeyValues.ComponentList:
            if (activeAccordions.includes(BlogEditorSubmenuAccordionKeyValues.ComponentProperty)) {
                return unit * 2;
            }
            return unit * 5;
        case BlogEditorSubmenuAccordionKeyValues.ComponentProperty:
            return 0;
        default:
            return 0;
    }
}

export const GetSubmenuComponentTypes = () => {
    return [
        BlogEditorSubmenuAccordionKeyValues.ComponentMenu,
        BlogEditorSubmenuAccordionKeyValues.ComponentList,
        BlogEditorSubmenuAccordionKeyValues.ComponentProperty,
    ];
}
