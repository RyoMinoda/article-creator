export class Span {
    X: number;
    Y: number;

    constructor (spanX: number, spanY: number) {
        this.X = spanX;
        this.Y = spanY;
    }

    toString(): string {
        if (this.equal(Span.getUndefined())) return "undefined";
        return " ( " + this.X + " , " + this.Y + " ) ";
    }

    equal(span: Span) {
        return this.X === span.X && this.Y === span.Y;
    }

    static getDefault(): Span {
        return new Span(0, 0);
    }

    static getUndefined(): Span {
        return new Span(-1, -1);
    }
}