import { v4 as uuid } from 'uuid';

export class Uuid {
    private uuid: string;
    constructor() {
        this.uuid = uuid();
    }

    static new(): string {
        return uuid();
    }

    public create(): string {
        return this.uuid;
    }
}