import { BlogComponent } from "../BlogComponent/type"

export type Blog = {
    BlogId: string,
    Title: string,
    Components: Array<BlogComponent>,
    Thumbnail: string;
}