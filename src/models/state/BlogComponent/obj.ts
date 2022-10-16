import { SxProps, Theme } from "@mui/material";
import { Uuid } from "../../../utils/Uuid";
import { UiPalette } from "../../context/UiParams/type";
import { ListItemObj, ListObj } from "../../utils/List/obj";
import { getBlogComponentIcon } from "./components";
import { getBlogComponentTypeName } from "./func";
import { BlogComponentListItem, BlogComponentKeyValues, BlogComponentType } from "./type";

export class BlogComponentListItemObj extends ListItemObj  implements BlogComponentListItem {
    MenuTitle: string;
    X: number;
    Y: number;
    ComponentType: BlogComponentType;
    RowSpan: number;
    ColumnSpan: number;
    StrContent: string;
    
    constructor(id: string, componentType: BlogComponentType, menuTitle: string, x: number, y: number, rowSpan: number, colSpan: number) {
        super(id);
        this.MenuTitle = menuTitle;
        this.X = x;
        this.Y = y;
        this.ComponentType = componentType;
        this.StrContent = "";
        this.RowSpan = rowSpan;
        this.ColumnSpan = colSpan;
    }

    private setComponentProps = (id: string, component: BlogComponentListItem) => {
        this.Id = id;
        this.MenuTitle = component.MenuTitle;
        this.ColumnSpan = component.ColumnSpan;
        this.RowSpan = component.RowSpan;
        this.ComponentType = component.ComponentType;
        this.X = component.X;
        this.Y = component.Y;
        this.ComponentType = component.ComponentType;
        this.StrContent = component.StrContent;
    }

    public getComponentTypeName = () => getBlogComponentTypeName(this.ComponentType);

    public getComponentIndex = () => this.X * 100 + this.Y;

    public setStrCountent = (value: string) => {
        this.StrContent = value;
    };

    public include = (r: number, c: number): boolean => {
        if (this.X <= c && c <= this.X + this.ColumnSpan - 1  && this.Y <= r && r <= this.Y + this.RowSpan - 1) {
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
        return new BlogComponentListItemObj(uuid, componentType, "Not Registered", -1, -1, -1, -1);
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