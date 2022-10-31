import { SxProps, Theme } from "@mui/material";
import { Uuid } from "../../../utils/Uuid";
import { UiPalette } from "../../context/UiParams/type";
import { ListItemObj, ListObj } from "../../utils/List/obj";
import { Position } from "../../utils/Position/obj";
import { Span } from "../../utils/Span/obj";
import { BlogComponentContentListItemObj } from "../BlogComponentContent/obj";
import { BlogComponentListItem } from "./type";

export class BlogComponentListItemObj extends ListItemObj implements BlogComponentListItem {
    MenuTitle: string;
    Position: Position;
    Span: Span;
    StrContent: string;
    ContentList: BlogComponentContentListItemObj[];
    
    constructor(id: string, menuTitle: string, position: Position, span: Span, contentList: BlogComponentContentListItemObj[]) {
        super(id);
        this.MenuTitle = menuTitle;
        this.Position = position;
        this.StrContent = "";
        this.Span = span;
        this.ContentList = contentList;
    }

    public getComponentIndex = () => this.Position.X * 100 + this.Position.Y;

    public setStrCountent = (value: string) => {
        this.StrContent = value;
    };

    public include = (r: number, c: number): boolean => {
        if (this.Position.X <= c && c <= this.Position.X + this.Span.X - 1  && this.Position.Y <= r && r <= this.Position.Y + this.Span.Y - 1) {
            return true;
        }
        return false;
    }

    public getComponent = (): BlogComponentListItem => {
        var component: BlogComponentListItem = {
            ...this,
        }
        return component;
    }

    public getIsPositionWarning = () => {
        if (Position.getIsUndefined(this.Position) || Span.getIsUndefined(this.Span)) {
            return true;
        }
        return false;
    }

    public static create = (): BlogComponentListItemObj => {
        const uuid = Uuid.new();
        return new BlogComponentListItemObj(uuid, "Not Registered", Position.getUndefined(), Span.getUndefined(), []);
    }
    
}

export class BlogComponentListObj extends ListObj<BlogComponentListItemObj> {
    constructor(list: Array<BlogComponentListItemObj>) {
        super(list);
    }
    
    distinctTitles(): Array<string> {
        const titles = this.Items.map(x => x.MenuTitle);
        const set = new Set(titles);
        return Array.from(set);
    }
}