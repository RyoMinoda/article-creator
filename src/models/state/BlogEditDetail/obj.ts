import { BlogEditDetail, BlogEditFlow } from "./type";

export class BlogEditDetailObj implements BlogEditDetail {
    Flows: BlogEditFlow[];

    constructor(flows: Array<BlogEditFlow>) {
        this.Flows = flows;
    }

    public toModel(): BlogEditDetail {
        return this;
    }

    public static create(): BlogEditDetailObj {
        return new BlogEditDetailObj(
            []
        );
    }
}