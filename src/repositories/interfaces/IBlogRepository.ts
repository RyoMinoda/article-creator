import { Blog } from "../../models/state/Blog/type";


export interface IBlogRepository {
    getBlogsAsync(): Promise<Array<Blog>>;
}