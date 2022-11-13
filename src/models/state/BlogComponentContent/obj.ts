import { Uuid } from "../../../utils/Uuid";
import { ListItemObj, ListObj } from "../../utils/List/obj";
import { BlogComponentContentKeyValues, BlogComponentContentListItem, BlogComponentContentStyleType, BlogComponentContentType } from "./types";

export class BlogComponentContentListItemObj extends ListItemObj implements BlogComponentContentListItem {
    Type: BlogComponentContentType;
    Text: string;
    Styles: BlogComponentContentStyleType[];
    IsDefault: boolean;
    

    private defaultStyles: BlogComponentContentStyleType[] = [];

    constructor(id: string, type: BlogComponentContentType, text: string) {
        super(id);
        this.Type = type;
        this.Text = text;
        this.Styles = this.defaultStyles;
        this.IsDefault = true;
    }
    
    public static create = (): BlogComponentContentListItemObj => {
        const id = Uuid.new();
        const type = BlogComponentContentKeyValues.Text;
        return new BlogComponentContentListItemObj(id, type, "");
    }

    public static createFromText(text: string) {
        const id = Uuid.new();
        const type = BlogComponentContentKeyValues.Text;
        return new BlogComponentContentListItemObj(id, type, text);
    }
}

export class BlogComponentContentListObj extends ListObj<BlogComponentContentListItemObj> {
    constructor (items: Array<BlogComponentContentListItemObj>) {
        super(items);
    }

    getText = () => {
        if (this.Items.length === 0) return "";
        return this.Items.map(x => x.Text).reduce((a, b) => a + b);
    }

    public static create = (): BlogComponentContentListObj => new BlogComponentContentListObj([]);
}