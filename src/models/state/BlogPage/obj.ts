import { Uuid } from "../../../utils/Uuid";
import { ListItemObj, ListObj } from "../../utils/List/obj";
import { BlogPage } from "./type";

export class BlogPageObj extends ListItemObj implements BlogPage {
    Index: number;
    ComponentIds: string[];
    RowCount: number;
    ColumnCount: number;

    private static defaultRowCount: number = 20;
    private static defaultColumnCount: number = 24;

    constructor(id: string, index: number, componentIds: Array<string>, rowCount: number, columnCount: number) {
        super(id);
        this.Index = index;
        this.ComponentIds = componentIds;
        this.RowCount = rowCount;
        this.ColumnCount = columnCount;
    }

    static create(index: number): BlogPageObj {
        const id = Uuid.new();
        return new BlogPageObj(
            id, index, [], this.defaultRowCount, this.defaultColumnCount
        )
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