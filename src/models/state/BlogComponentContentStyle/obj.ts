import { Uuid } from "../../../utils/Uuid";
import { ListItemObj } from "../../utils/List/obj";
import { SelectionRange } from "../../utils/SelectionRange/type";
import { BlogComponentContentStyleListItem, BlogComponentContentStyleType } from "./type";

export class BlogComponentContentStyleListItemObj extends ListItemObj implements BlogComponentContentStyleListItem {
    Start: number;
    End: number;
    Style: BlogComponentContentStyleType;
    
    constructor(id: string, start: number, end: number, style: BlogComponentContentStyleType) {
        super(id);
        this.Start = start;
        this.End = end;
        this.Style = style;
    }

    public static create(start: number, end: number, style: BlogComponentContentStyleType) {
        const id = Uuid.new();
        return new BlogComponentContentStyleListItemObj(
            id, start, end, style
        );
    }
}