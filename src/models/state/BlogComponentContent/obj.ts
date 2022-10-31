import { Uuid } from "../../../utils/Uuid";
import { ListItemObj, ListObj } from "../../utils/List/obj";
import { BlogComponentContentKeyValues, BlogComponentContentListItem, BlogComponentContentStyleType, BlogComponentContentType } from "./types";

export class BlogComponentContentListItemObj extends ListItemObj implements BlogComponentContentListItem {
    Type: BlogComponentContentType;
    Text: string;
    Styles: BlogComponentContentStyleType[];
    FontSize: number;

    constructor(id: string, type: BlogComponentContentType, text: string) {
        super(id);
        this.Type = type;
        this.Text = text;
        this.Styles = [
            
        ];
        this.FontSize = 16;
    }
    
    public static create = (): BlogComponentContentListItemObj => {
        const id = Uuid.new();
        const type = BlogComponentContentKeyValues.Text;
        return new BlogComponentContentListItemObj(id, type, "");
    }
}

export class BlogComponentContentListObj extends ListObj<BlogComponentContentListItemObj> {
    constructor () {
        super([]);
    }

    public static create = (): BlogComponentContentListObj => new BlogComponentContentListObj();
}