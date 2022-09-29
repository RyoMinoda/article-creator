
import { Uuid } from "../../../utils/Uuid";
import { DateTime } from "../../utils/DateTime/obj";
import { BlogTagListObj } from "../BlogTag/obj";
import { Blog, BlogThumbnail } from "./type";


export const defaultBlogThumbnail: BlogThumbnail = {
    Src: "",
    FontColor: "transparent",
    FontBackColor: "",
    ObjectFit: "contain",
    Background: "transparent",
    FontBackOpacity: 0
}

export const defaultBlog: Blog = {
    BlogId: Uuid.NewUuid(),
    Title: "",
    Detail: "",
    Components: [],
    Tags: BlogTagListObj.create(),
    Thumbnail: defaultBlogThumbnail,
    UpdatedAt: new Date(),
    CreatedAt: new Date(),
}


// https://img.freepik.com/premium-photo/simple-white-background-with-smooth-lines-light-colors_476363-5558.jpg?w=1060

export const No1Blog: Blog = {
    BlogId: "1",
    Title: "Sample Blog for mock",
    Detail: "This is the description of blog. We should confirm that the long text can be displayed.",
    Components: [],
    Tags: BlogTagListObj.create(),
    Thumbnail: {
        Src: "https://images.pexels.com/photos/13495232/pexels-photo-13495232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        FontColor: "black",
        ObjectFit: "contain",
        Background: "transparent",
        FontBackColor: "transparent",
        FontBackOpacity: 0
    },
    UpdatedAt: new Date(),
    CreatedAt: new Date(),
}

export const No2Blog: Blog = {
    BlogId: "2",
    Title: "Tech Article1: About Html5",
    Detail: "",
    Components: [],
    Tags: BlogTagListObj.create(),
    Thumbnail: {
        Src: "https://images.pexels.com/photos/13495232/pexels-photo-13495232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        FontColor: "black",
        ObjectFit: "contain",
        Background: "white",
        FontBackColor: "transparent",
        FontBackOpacity: 0
    },
    UpdatedAt: DateTime.Now().addDay(2).getDate(),
    CreatedAt: new Date(),
}
