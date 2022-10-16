import { DateTime } from "../../../../models/utils/DateTime/obj";
import { BlogEditorComponentEditorComponentItemMeta } from "./type";

export const initialEditorComponentItemMeta: BlogEditorComponentEditorComponentItemMeta = {
    componentId: "",
    createdAt: DateTime.Now(),
    updatedAt: DateTime.Now(),
    isPlaced: false,
    isHidden: false
}