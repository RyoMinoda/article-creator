import { Uuid } from "../../../utils/Uuid";
import { No1Blog, No2Blog } from "../Blog/lib";
import { BlogTagListObj } from "../BlogTag/obj";
import { BlogListItemObj, BlogListObj } from "./obj";
import { BlogList, BlogListItem } from "./type";

export const initialBlog: BlogListItem = {
    Id: Uuid.NewUuid(),
    Title: "",
    Tags: BlogTagListObj.create(),
    UpdatedAt: new Date(),
    CreatedAt: new Date(),
}

export const blog1: BlogListItem = {
    ...No1Blog,
    Id: No1Blog.BlogId
}

export const blog2: BlogListItem = {
    ...No2Blog,
    Id: No2Blog.BlogId,
}

export const sampleBlogList: BlogList = {
    Items: [
        blog1, blog2
    ]
}

export const sampleBlogListObj: BlogListObj = BlogListObj.createByType(sampleBlogList);