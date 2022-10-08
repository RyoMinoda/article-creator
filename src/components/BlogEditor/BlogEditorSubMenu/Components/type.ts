import { BlogComponentType } from "../../../../models/state/BlogComponent/type"

export type BlogEditorSubmenuComponentsMapItemProps = {
    width: number,
    height: number,
    activeComponentType: BlogComponentType | null,
    updateActiveComponentType: (componentType: BlogComponentType | null) => void
}