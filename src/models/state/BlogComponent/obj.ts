import { ComponentType } from "react";
import { Uuid } from "../../../utils/Uuid";
import { getBlogComponentTypeName } from "./func";
import { BlogComponent, BlogComponentType } from "./type";

export class BlogComponentObj implements BlogComponent {
    BlogComponentId: string;
    X: number;
    Y: number;
    ComponentType: BlogComponentType;
    RowSpan: number;
    ColumnSpan: number;
    StrContent: string;
    
    constructor(componentType: BlogComponentType, components: Array<BlogComponentObj>) {
        this.BlogComponentId = Uuid.NewUuid();
        const { x, y } = this.getXY(componentType, components);
        this.X = x;
        this.Y = y;
        this.ComponentType = componentType;
        this.StrContent = "";
        this.RowSpan = this.getComponentDefaultRowSpan(componentType);
        this.ColumnSpan = this.getComponentDefaultColumnSpan(componentType);
    }

    private getXY = (componentType: BlogComponentType, components: Array<BlogComponentObj>): { x: number, y: number } => {
        if (components.length == 0) return { x: 0, y: 0 };
        const array = new Array(12).fill(0);
        const arrayLength = components.map(x => x.RowSpan).reduce((a, b) => a + b);
        const rowSpan = this.getComponentDefaultRowSpan(componentType);
        console.log(rowSpan);
        const array2: number[][] = new Array(arrayLength + rowSpan).fill(0).map(_ => array.map(x => x));
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

    private getComponentDefaultRowSpan = (type: BlogComponentType): number => {
        switch(type) {
            case BlogComponentType.Document:
                return 2;
            case BlogComponentType.Line:
                return 1;
            case BlogComponentType.Picture:
                return 4;
            case BlogComponentType.Headline:
                return 1;
            case BlogComponentType.Table:
                return 2;
            default:
                throw new Error("getComponentDefaultRowSpan");
        }
    }

    private getComponentDefaultColumnSpan = (type: BlogComponentType): number => {
        switch(type) {
            case BlogComponentType.Document:
                return 12;
            case BlogComponentType.Line:
                return 12;
            case BlogComponentType.Picture:
                return 6;
            case BlogComponentType.Headline:
                return 12;
            case BlogComponentType.Table:
                return 12;
            default:
                throw new Error("getComponentDefaultColumnSpan");
        }
    }

    public getComponentTypeName = () => getBlogComponentTypeName(this.ComponentType);

    public getComponentIndex = () => this.X * 100 + this.Y;

    public setStrCountent = (value: string) => {
        this.StrContent = value;
    };
}