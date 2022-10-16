import { BlogComponentListItemObj } from "../../../../models/state/BlogComponent/obj";
import { BlogComponentListItem } from "../../../../models/state/BlogComponent/type";
import { DateTime } from "../../../../models/utils/DateTime/obj";
import { BlogEditorComponentEditorComponentItemMeta } from "./type";

export class BlogEditorComponentEditorComponentItemMetaObj implements BlogEditorComponentEditorComponentItemMeta {
    componentId: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    isPlaced: boolean;
    isHidden: boolean;
    
    constructor(listItem: BlogComponentListItemObj) {
        this.componentId = listItem.Id;
        this.createdAt = DateTime.Now();
        this.updatedAt = DateTime.Now();
        this.isPlaced = false;
        this.isHidden = false;
    }
}