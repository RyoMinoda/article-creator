import { ClassNames } from "@emotion/react";

export const ClassNameKeyValues = {
    verticalTransfer: "vertical-transfer"
} as const;

export type ClassNameType = typeof ClassNameKeyValues[keyof typeof ClassNameKeyValues];

export const CusorKeyValues = {
    vertical: "",
}

export const getIsDisplayForeGround = (className: string): boolean => {
    return Object.values(ClassNameKeyValues)
        .filter(x => className.includes(x))
        .length > 0
}