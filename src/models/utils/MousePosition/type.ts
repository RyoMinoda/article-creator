export type MousePosition = {
    x: number,
    y: number,
    className: string,
    id: string,
    action: MouseActionType,
    mode: MouseModeType
}

export const MouseActionKeyValues = {
    MouseMove: 1,
    MouseDown: 2,
    MouseUp: 3,
    DragStart: 11,
    DragMove: 12,
    DragEnd: 13,
} as const;

export type MouseActionType = typeof MouseActionKeyValues[keyof typeof MouseActionKeyValues];

export const MouseModeKeyValues = {
    Normal: 1,
    Slide: 2,
} as const;

export type MouseModeType = typeof MouseModeKeyValues[keyof typeof MouseModeKeyValues];