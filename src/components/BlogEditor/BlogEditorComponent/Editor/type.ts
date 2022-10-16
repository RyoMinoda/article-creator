import { BlogComponentListItem } from "../../../../models/state/BlogComponent/type";
import { DateTime } from "../../../../models/utils/DateTime/obj";

export const BlogEditorComponentEditorMenuKeyValues = {
    Hidden: "hidden",
    Short: "short",
    Medium: "medium",
    Max: "max"
} as const;

export type BlogEditorComponentEditorMenuType = typeof BlogEditorComponentEditorMenuKeyValues[keyof typeof BlogEditorComponentEditorMenuKeyValues];

export type BlogEditorComponentEditorComponentItemMeta = {
    componentId: string,
    createdAt: DateTime,
    updatedAt: DateTime,
    isPlaced: boolean,
    isHidden: boolean,
}

