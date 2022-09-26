import { BlogTagListObj } from "../BlogTag/obj"
import { BlogTagList } from "../BlogTag/type"

export type BlogListItem = {
    Id: string,
    Title: string,
    Tags: BlogTagListObj,
    UpdatedAt: Date,
    CreatedAt: Date,
}

export type BlogList = {
    Items: Array<BlogListItem>
}