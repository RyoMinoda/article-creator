import { BlogComponent } from "../BlogComponent/type";
import { Blog } from "./type";

export class BlogObj implements Blog {
    BlogId: string;
    Title: string;
    Components: BlogComponent[];
    Thumbnail: string;

    constructor(id: string, title: string, components: Array<BlogComponent>, thumbnail: string) {
        this.BlogId = id;
        this.Title = title;
        this.Components = components;
        this.Thumbnail = thumbnail;
    }

}