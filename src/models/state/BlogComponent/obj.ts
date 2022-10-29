import { SxProps, Theme } from "@mui/material";
import { cp } from "fs";
import { Uuid } from "../../../utils/Uuid";
import { UiPalette } from "../../context/UiParams/type";
import { ListItemObj, ListObj } from "../../utils/List/obj";
import { Position } from "../../utils/Position/obj";
import { Span } from "../../utils/Span/obj";
import { getBlogComponentIcon } from "./components";
import { getBlogComponentTypeName, getDefaultBlogComponentStyles } from "./func";
import { BlogComponentListItem, BlogComponentKeyValues, BlogComponentType, BlogComponentStyleType, BlogComponentStyleKeyValues } from "./type";

export class BlogComponentListItemObj extends ListItemObj implements BlogComponentListItem {
    MenuTitle: string;
    Position: Position;
    ComponentType: BlogComponentType;
    Span: Span;
    StrContent: string;
    Styles: Array<BlogComponentStyleType>;
    
    constructor(id: string, componentType: BlogComponentType, menuTitle: string, position: Position, span: Span) {
        super(id);
        this.MenuTitle = menuTitle;
        this.Position = position;
        this.ComponentType = componentType;
        this.StrContent = "";
        this.Span = span;
        this.Styles = getDefaultBlogComponentStyles(componentType);
    }

    private setComponentProps = (id: string, component: BlogComponentListItem) => {
        this.Id = id;
        this.MenuTitle = component.MenuTitle;
        this.Span = component.Span;
        this.ComponentType = component.ComponentType;
        this.Position = component.Position;
        this.ComponentType = component.ComponentType;
        this.StrContent = component.StrContent;
    }

    public getComponentTypeName = () => getBlogComponentTypeName(this.ComponentType);

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

    public getTileColor = (palette: UiPalette) => {
        switch (this.ComponentType) {
            case BlogComponentKeyValues.Article:
                return palette.Pastel.Blue1;
            default:
                return "";
        }
    }

    public getIcon = (sx: SxProps<Theme>) => getBlogComponentIcon(this.ComponentType, sx);

    public getComponent = (): BlogComponentListItem => {
        var component: BlogComponentListItem = {
            ...this,
        }
        return component;
    }

    public getComponentStyleStrings = (): string => {
        var target = Object.values(BlogComponentStyleKeyValues)
        .filter((x) => x.startsWith(this.ComponentType))
        .filter((x) => this.Styles.includes(x))
        .map((x) => {
            return x.replace(this.ComponentType, "");
        })
        if (target.length === 0) return "";
        if (target.length === 1) return target[0];
        return target.reduce(x => x + ", ");
    }

    public getComponentStyles = (): Array<BlogComponentStyleType> => {
        return this.Styles.filter(x => x.includes(this.ComponentType));
    }

    public getIsPositionWarning = () => {
        if (Position.getIsUndefined(this.Position) || Span.getIsUndefined(this.Span)) {
            return true;
        }
        return false;
    }

    public getIsWarning = () => {
        if (Position.getIsUndefined(this.Position) || Span.getIsUndefined(this.Span)) {
            return true;
        }
        switch (this.ComponentType) {
            case BlogComponentKeyValues.Headline:
                if (this.StrContent === "") return true;
                break;
        }
        return false;
    }

    public static getEmpty = () => {
        return this.create(BlogComponentKeyValues.Article);
    }

    public static createObj = (component: BlogComponentListItem): BlogComponentListItemObj => {
        const target = this.getEmpty();
        const uuid = Uuid.new();
        target.setComponentProps(uuid, component);
        return target;
    }

    public static create = (componentType: BlogComponentType): BlogComponentListItemObj => {
        const uuid = Uuid.new();
        return new BlogComponentListItemObj(uuid, componentType, "Not Registered", Position.getUndefined(), Span.getUndefined());
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