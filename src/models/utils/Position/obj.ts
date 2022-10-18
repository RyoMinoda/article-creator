export class Position {
    X: number;
    Y: number;

    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
    }

    toString(): string {
        if (this.equal(Position.getUndefined())) return "undefined";
        return " ( " + this.X + " , " + this.Y + " ) ";
    }

    equal(position: Position): boolean {
        return this.X === position.X && this.Y === position.Y;
    }

    static getDefault() : Position {
        return new Position(0, 0);
    }

    static getUndefined(): Position {
        return new Position(-1, -1);
    }
}