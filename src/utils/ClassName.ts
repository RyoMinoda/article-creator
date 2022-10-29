import { MousePosition } from "../models/utils/MousePosition/type";

export const ClassNameKeyValues = {
    verticalTransfer: "vertical-transfer",
    componentEditorPanel: "component-editor-panel"
} as const;

export type ClassNameType = typeof ClassNameKeyValues[keyof typeof ClassNameKeyValues];

export const CusorKeyValues = {
    vertical: "",
}

export const getIsIncludeClassName = (className: string): boolean => {
    if (className === undefined || className === null || typeof className !== "string" ) return false;
    return Object.values(ClassNameKeyValues)
        .filter(x => className.includes(x))
        .length > 0
}

export const getIsMouseIncludeClassName = (mousePosition: MousePosition, className: string): boolean => {
    if (className === undefined || className === null || typeof mousePosition.className !== "string" ) return false;
    return mousePosition.className.includes(className);
}