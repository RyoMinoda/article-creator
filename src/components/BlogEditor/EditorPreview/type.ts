export const PreviewWidthType = {
    "Mobile M": 375,
    "Mobile L": 425,
    "Tablet": 768,
    "Laptop": 1024,
} as const;


export type PreviewWidthType = typeof PreviewWidthType[keyof typeof PreviewWidthType];

export const PreviewWidthKeys = Object.entries(PreviewWidthType).map(x => x[0]);

export const PreviewWidthValues = Object.entries(PreviewWidthType)
            .map(x => x[1].toString())
            .map(x => parseInt(x));

export const PreviewWidthKeyValues = Object.entries(PreviewWidthType).map(x => x);