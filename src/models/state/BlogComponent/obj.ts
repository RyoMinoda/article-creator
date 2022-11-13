import { Uuid } from "../../../utils/Uuid";
import { ListItemObj, ListObj } from "../../utils/List/obj";
import { Position } from "../../utils/Position/obj";
import { Span } from "../../utils/Span/obj";
import { BlogComponentContentListItemObj, BlogComponentContentListObj } from "../BlogComponentContent/obj";
import { BlogComponentContentKeyValues, BlogComponentContentType, BlogComponentListItem, BlogComponentListItemAlignKeyValues, BlogComponentListItemAlignType, BlogComponentListItemOverflowKeyValues, BlogComponentListItemOverflowType } from "./type";

export class BlogComponentListItemObj extends ListItemObj implements BlogComponentListItem {
    MenuTitle: string;
    Position: Position;
    Span: Span;
    AlignType: BlogComponentListItemAlignType;
    OverflowType: BlogComponentListItemOverflowType;
    ContentList: BlogComponentContentListItemObj[];
    ContentType: BlogComponentContentType;
    FontSize: number;
    Text: string;
    
    constructor(id: string, menuTitle: string, position: Position, span: Span, contentList: BlogComponentContentListItemObj[], contentType: BlogComponentContentType, fontSize: number, text: string) {
        super(id);
        this.MenuTitle = menuTitle;
        this.Position = position;
        this.Span = span;
        this.AlignType = BlogComponentListItemAlignKeyValues.Left;
        this.OverflowType = BlogComponentListItemOverflowKeyValues.Ignored;
        this.ContentList = contentList;
        this.ContentType = contentType;
        this.FontSize = fontSize;
        this.Text = text;
    }

    public getComponentIndex = () => this.Position.X * 100 + this.Position.Y;

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

    public getContentList = (): BlogComponentContentListObj => {
        return new BlogComponentContentListObj(this.ContentList);
    }

    public getIsUndefined = () => {
        if (Position.getIsUndefined(this.Position) || Span.getIsUndefined(this.Span)) {
            return true;
        }
        return false;
    }

    public updateText = (text: string) => {
        this.Text = text;
        
    }

    public static create = (): BlogComponentListItemObj => {
        const uuid = Uuid.new();
        return new BlogComponentListItemObj(
            uuid, 
            "Not Registered", 
            Position.getUndefined(), Span.getUndefined(), [],
            BlogComponentContentKeyValues.Text,
            16,
            ""
        );
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