import { ClassNames } from "@emotion/react";

export const ClassNameKeyValues = {
    verticalTransfer: "vertical-transfer"
} as const;

export type ClassNameType = typeof ClassNameKeyValues[keyof typeof ClassNameKeyValues];

export const CusorKeyValues = {
    vertical: "",
}

export const getIsDisplayForeGround = (className: string): boolean => {
    console.log(className);
    if (className == undefined || className == null) return false;
    return Object.values(ClassNameKeyValues)
        .filter(x => className.includes(x))
        .length > 0
}