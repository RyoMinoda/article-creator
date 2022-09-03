
import { Uuid } from "../../../utils/Uuid";
import { Blog } from "./type";

export const defaultBlog: Blog = {
    BlogId: Uuid.NewUuid(),
    Title: "",
    Components: [],
    Thumbnail: ""
}

export const No1Blog: Blog = {
    BlogId: "1",
    Title: "Sample Blog for mock.",
    Components: [],
    Thumbnail: ""
}