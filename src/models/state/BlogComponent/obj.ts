import { SxProps, Theme } from "@mui/material";
import { Component, ComponentType } from "react";
import { Uuid } from "../../../utils/Uuid";
import { UiPalette } from "../../context/UiParams/type";
import { getBlogComponentIcon } from "./components";
import { getBlogComponentTypeName } from "./func";
import { BlogComponent, BlogComponentKeyValues, BlogComponentType } from "./type";

export class BlogComponentObj implements BlogComponent {
    BlogComponentId: string;
    ComponentTitle: string;
    X: number;
    Y: number;
    ComponentType: BlogComponentType;
    RowSpan: number;
    ColumnSpan: number;
    StrContent: string;
    
    constructor(componentType: BlogComponentType, x: number, y: number, rowSpan: number, colSpan: number, components?: Array<BlogComponentObj>) {
        this.BlogComponentId = Uuid.NewUuid();
        this.ComponentTitle = "";
        if (components != undefined) {
            this.ComponentTitle = this.getComponentTitle(componentType, components);
        }
        this.X = x;
        this.Y = y;
        this.ComponentType = componentType;
        this.StrContent = "";
        this.RowSpan = rowSpan;
        this.ColumnSpan = colSpan;
    }

    private getComponentTitle = (componentType: BlogComponentType, components: Array<BlogComponentObj>): string => {
        const count = components.filter(x => x.ComponentType == componentType).length;
        return componentType + (count + 1).toString();
    }

    private setComponentProps = (component: BlogComponent) => {
        this.BlogComponentId = component.BlogComponentId;
        this.ComponentTitle = component.ComponentTitle;
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

    public getComponent = (): BlogComponent => {
        var component: BlogComponent = {
            ...this,
        }
        return component;
    }

    public static getEmpty = () => {
        return new BlogComponentObj(BlogComponentKeyValues.Article, 0, 0, 0, 0);
    }

    public static createObj = (component: BlogComponent): BlogComponentObj => {
        var target = this.getEmpty();
        target.setComponentProps(component);
        return target;
    }

    public static create = (componentType: BlogComponentType, components: Array<BlogComponentObj>): BlogComponentObj => {
        const { x, y } = this.getXY(componentType, components);
        const rowSpan = this.getComponentDefaultRowSpan(componentType);
        const columnSpan = this.getComponentDefaultColumnSpan(componentType);
        return new BlogComponentObj(componentType, x, y, rowSpan - 1, columnSpan - 1, components);
    }
    
    private static getXY = (componentType: BlogComponentType, components: Array<BlogComponentObj>): { x: number, y: number } => {
        if (components.length == 0) return { x: 0, y: 0 };
        const array = new Array(12).fill(0);
        const arrayLength = components.map(x => x.RowSpan).reduce((a, b) => a + b);
        const rowSpan = this.getComponentDefaultRowSpan(componentType);
        const array2: number[][] = new Array(arrayLength + rowSpan + 1 + 12).fill(0).map(_ => array.map(x => x));
        components.forEach((component) => {
            const columnCellArray = new Array(component.ColumnSpan).fill(1);
            const rowCellArray: Array<number[]> = new Array(component.RowSpan).fill(columnCellArray);
            rowCellArray.forEach((rowArray, i) => {
                const row = i + component.Y;
                rowArray.forEach((c, ii) => {
                    const col = ii + component.X;
                    array2[row][col] = 1;
                })
            })
        });
        var x = 0; var y = 0; var end = false;
        const columnSpan = this.getComponentDefaultColumnSpan(componentType);
        array2.forEach((row, i) => {
            if (end) return;
            const emptyLength = row.filter(x => x == 0).length;
            if (columnSpan <= emptyLength) {
                x = 12 - emptyLength;
                y = i;
                end = true;
            }
        })
        return { x, y }
    }

    private  static getComponentDefaultRowSpan = (type: BlogComponentType): number => {
        switch(type) {
            case BlogComponentKeyValues.Article:
                return 2;
            case BlogComponentKeyValues.Line:
                return 1;
            case BlogComponentKeyValues.Picture:
                return 4;
            case BlogComponentKeyValues.Headline:
                return 1;
            case BlogComponentKeyValues.Table:
                return 2;
            default:
                throw new Error("getComponentDefaultRowSpan");
        }
    }

    private static getComponentDefaultColumnSpan = (type: BlogComponentType): number => {
        switch(type) {
            case BlogComponentKeyValues.Article:
                return 12;
            case BlogComponentKeyValues.Line:
                return 12;
            case BlogComponentKeyValues.Picture:
                return 6;
            case BlogComponentKeyValues.Headline:
                return 12;
            case BlogComponentKeyValues.Table:
                return 12;
            default:
                throw new Error("getComponentDefaultColumnSpan");
        }
    }
}