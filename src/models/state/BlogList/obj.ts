
import { ListItemObj, ListObj } from "../../utils/List/obj";
import { BlogList, BlogListItem } from "./type";

export class BlogListObj extends ListObj<BlogListItemObj> {}

export class BlogListItemObj extends ListItemObj implements BlogListItem {
    Title: string;
    UpdatedAt: Date;
    CreatedAt: Date;
    
    constructor(Id: string, Title: string, CreatedAt: Date, UpdatedAt: Date) {
        super(Id);
        this.Title = Title;
        this.CreatedAt = CreatedAt;
        this.UpdatedAt = UpdatedAt;
    }
}