import { Uuid } from "../../../utils/Uuid";
import { ListItemObj, ListObj } from "../../utils/List/obj";
import { BlogPage } from "./type";

export class BlogPageObj extends ListItemObj implements BlogPage {
    Index: number;
    ComponentIds: string[];
    RowCount: number;
    ColumnCount: number;
    PageHeight: number;
    PageWidth: number;

    private static defaultRowCount: number = 40;
    private static defaultColumnCount: number = 24;
    private static defaultPageHeight: number = 1200;
    private static defaultPageWidth: number = 1000;

    constructor(
        id: string, 
        index: number, 
        componentIds: Array<string>, 
        rowCount: number, 
        columnCount: number,
        pageHeight: number,
        pageWidth: number,
    ) {
        super(id);
        this.Index = index;
        this.ComponentIds = componentIds;
        this.RowCount = rowCount;
        this.ColumnCount = columnCount;
        this.PageHeight = pageHeight;
        this.PageWidth = pageWidth;
    }

    static create(index: number): BlogPageObj {
        const id = Uuid.new();
        return new BlogPageObj(
            id, index, [], this.defaultRowCount, this.defaultColumnCount, this.defaultPageHeight, this.defaultPageWidth
        )
    }

    static empty(): BlogPageObj {
        return new BlogPageObj("", 0, [], 0, 0, 0, 0);
    }
}

export class BlogPageListObj extends ListObj<BlogPageObj> {
    constructor(list: Array<BlogPageObj>) {
        super(list);
    }

    addPage() {
        const index = this.Items.length + 1;
        return BlogPageObj.create(index);
    }
    
    findPage(index: number): BlogPageObj | null {
        const target = this.Items.filter(x => x.Index === index);
        if (target.length > 0) return target[0];
        return null;
    }

    static create() {
        const page = BlogPageObj.create(1);
        return new BlogPageListObj([page]);
    }
}