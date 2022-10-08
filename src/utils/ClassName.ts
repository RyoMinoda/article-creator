export const ClassNameKeyValues = {
    verticalTransfer: "vertical-transfer",
} as const;

export type ClassNameType = typeof ClassNameKeyValues[keyof typeof ClassNameKeyValues];

export const CusorKeyValues = {
    vertical: "",
}

export const getIsDisplayForeGround = (className: string): boolean => {
    if (className == undefined || className == null || typeof className === "object" ) return false;
    return Object.values(ClassNameKeyValues)
        .filter(x => className.includes(x))
        .length > 0
}