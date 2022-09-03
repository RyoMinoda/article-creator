export const ComponentEditorMenuTabType = {
    Creation: "Creation",
    Article: "Article",
} as const;

export type ComponentEditorMenuTabProps = {
    width: number,
    height: number,
    mapperProps: ComponentEditorMapperProps,
    updateMapperProps: (mapperProps: ComponentEditorMapperProps) => void,
    updateMenuCreationProps: (menuProps: ComponentEditorMapperProps) => void,
    addComponent: () => void,
}

export type ComponentEditorMapperProps = {
    row: number,
    col: number,
    rowSpan: number,
    colSpan: number,
    mapperValueChanged: number,
    menuValueChanged: number,
}