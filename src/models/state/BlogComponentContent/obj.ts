import { isEditable } from "@testing-library/user-event/dist/utils";
import { Uuid } from "../../../utils/Uuid";
import { ListItemObj, ListObj } from "../../utils/List/obj";
import { BlogComponentContentListItem } from "./types";

export class BlogComponentContentListItemObj extends ListItemObj implements BlogComponentContentListItem {
    Text: string;

    constructor(id: string, text: string, start: number, end: number, isEntered: boolean) {
        super(id);
        this.Text = text;
    }
    
    public static create = (): BlogComponentContentListItemObj => {
        const id = Uuid.new();
        return new BlogComponentContentListItemObj(id, "", 0, 0, false);
    }

    public static createFromText(text: string, start: number, end: number, isEntered: boolean) {
        const id = Uuid.new();
        return new BlogComponentContentListItemObj(id, text, start, end, isEntered);
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