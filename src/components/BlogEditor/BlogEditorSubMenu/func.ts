import { KeyValue } from "../../../models/utils/KeyValue/type";
import { BlogEditorSubmenuAccordionType } from "./types";

export const getNextActiveAccordions = (isShowns: Array<boolean>, accordionTypes: Array<BlogEditorSubmenuAccordionType>, activeAccordions: Array<BlogEditorSubmenuAccordionType>): Array<BlogEditorSubmenuAccordionType> => {
    const targetAccordions = isShowns.map((x, i) => { 
        const keyValue: KeyValue<boolean> = {
            Key: accordionTypes[i], Value: x
        }
        return keyValue;
     })
     .filter(x => x.Value)
     .map(x => x.Key);
    const exceptAccordions = activeAccordions.filter(x => !accordionTypes.includes(x));
    return [ ...exceptAccordions, ...targetAccordions ].map(x => x as BlogEditorSubmenuAccordionType);
}