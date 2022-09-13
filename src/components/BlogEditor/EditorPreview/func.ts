import { PreviewWidthKeys, PreviewWidthKeyValues, PreviewWidthType } from "./type";

export const getPreviousWidth = (key: string): number => {
    const keyValues = PreviewWidthKeyValues.filter((x, i) => x[0] == key);
    if (keyValues.length === 0) throw new Error("Error in getPreviousWidth"); 
    return keyValues[0][1];
}

export const getPreviousWidthKey = (value: number): string => {
    const keyValues = PreviewWidthKeyValues.filter((x, i) => x[1] == value);
    if (keyValues.length === 0) throw new Error("Error in getPreviousWidth"); 
    return keyValues[0][0];
}