import { Uuid } from "../../../utils/Uuid";
import { BlogList, BlogListItem } from "./type";

export const initialBlog: BlogListItem = {
    Id: Uuid.NewUuid(),
    Title: "",
    UpdatedAt: new Date(),
    CreatedAt: new Date(),
}

export const blog1: BlogListItem = {
    Id: Uuid.NewUuid(),
    Title: "Title",
    UpdatedAt: new Date(),
    CreatedAt: new Date(),
}

export const blogs: BlogList = {
    Items: [
        blog1,
    ]
}