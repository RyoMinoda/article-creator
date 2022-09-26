
import { Uuid } from "../../../utils/Uuid";
import { ListItemObj, ListObj } from "../../utils/List/obj";
import { BlogTagListObj } from "../BlogTag/obj";
import { BlogTagList } from "../BlogTag/type";
import { BlogList, BlogListItem } from "./type";

export class BlogListObj extends ListObj<BlogListItemObj> implements BlogList {
    constructor(BlogList: BlogList) {
        super(BlogList.Items);
    }

    public static create() {
        const list: BlogList = { Items: [] };
        return new BlogListObj(list);
    }
    
    public static createByType(list: BlogList) {
        return new BlogListObj(list);
    }
}

export class BlogListItemObj extends ListItemObj implements BlogListItem {
    Title: string;
    UpdatedAt: Date;
    CreatedAt: Date;
    Tags: BlogTagListObj;
    
    constructor(Id: string, Title: string, CreatedAt: Date, UpdatedAt: Date, tags: BlogTagList) {
        super(Id);
        this.Title = Title;
        this.CreatedAt = CreatedAt;
        this.UpdatedAt = UpdatedAt;
        this.Tags = BlogTagListObj.create();
    }

}