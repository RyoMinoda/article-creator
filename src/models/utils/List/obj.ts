import { SearchConditionKeyValues, SearchConditionType } from "./type";

export class ListObj<T extends ListItemObj> {
    Items: Array<T> = new Array<T>();
    length: number = this.Items.length; 

    constructor(Items: Array<T>) {
        this.Items = Items;
    }

    add(item: T): void {
        this.Items = [ ...this.Items, item ];
    }

    overlap(array: Array<string>): Array<T> {
        return this.Items.filter(x => array.includes(x.Id));
    }

    remove(id: string): void {
        this.Items = this.Items.filter(x => x.Id !== id);
    }

    toList(): Array<T> {
        return this.Items;
    }

    update(item: T): void {
        this.Items = this.Items.map(x => x.Id === item.Id ? item : x);
    }

    public isNotEmpty: boolean = this.Items.length > 0;
}

export class ListItemObj {
    Id: string;

    constructor(id: string) {
        this.Id = id;
    }
}