export class Span {
    X: number;
    Y: number;
    private static Max: number = 10000;

    constructor (spanX: number, spanY: number) {
        this.X = spanX;
        this.Y = spanY;
    }

    toString(): string {
        if (this.equal(Span.getUndefined())) return "undefined";
        return (this.X + 1) + " , " + (this.Y + 1);
    }

    equal(span: Span) {
        return this.X === span.X && this.Y === span.Y;
    }

    static getDefault(): Span {
        return new Span(0, 0);
    }

    static getUndefined(): Span {
        return new Span(this.Max + 1, this.Max + 1);
    }

    static getIsUndefined(span: Span): boolean {
        return span.X === this.Max + 1 && span.Y === this.Max + 1;
    }
}