export class ListObj<T extends ListItemObj> {
    Items: Array<T>;

    constructor(Items: Array<T>) {
        this.Items = Items;
    }

    add(item: T): void {
        this.Items = [ ...this.Items, item ];
    }

    remove(id: string): void {
        this.Items = this.Items.filter(x => x.Id !== id);
    }

    toList(): Array<T> {
        return this.Items;
    }
}

export class ListItemObj {
    Id: string;

    constructor(id: string) {
        this.Id = id;
    }
}