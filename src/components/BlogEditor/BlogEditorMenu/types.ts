export type BlogEditorMenuTabProps = {
    width: number,
    height: number,
    mapperProps: BlogEditorMapperProps,
    margin: number,
    updateMapperProps: (mapperProps: BlogEditorMapperProps) => void,
    updateMenuInsertProps: (menuProps: BlogEditorMapperProps) => void,
    addComponent: () => void,
}

export type BlogEditorMapperProps = {
    row: number,
    col: number,
    rowSpan: number,
    colSpan: number,
    mapperValueChanged: number,
    menuValueChanged: number,
}