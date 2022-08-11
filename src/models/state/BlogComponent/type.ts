export type BlogComponent = {
    BlogComponentId: string,
    X: number,
    Y: number,
    ComponentType: BlogComponentType,
}

export enum BlogComponentType {
    Document,
    Picture,
    Line
}