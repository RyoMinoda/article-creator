import { Blog } from "../models/state/Blog/type";
import { IBlogRepository } from "./interfaces/IBlogRepository";

export class BlogRepository implements IBlogRepository {
    async getBlogsAsync(): Promise<Blog[]> {
        throw new Error("Method not implemented.");
    }
}