import { BlogComponentListItemObj } from "../BlogComponent/obj";
import { BlogComponentListItem } from "../BlogComponent/type"
import { BlogTagListObj } from "../BlogTag/obj";
import { BlogTagList } from "../BlogTag/type";

export type Blog = {
    BlogId: string,
    Title: string,
    Detail: string,
    Tags: BlogTagListObj,
    Components: Array<BlogComponentListItemObj>,
    Thumbnail: BlogThumbnail;
    UpdatedAt: Date,
    CreatedAt: Date,
}

export type BlogThumbnail = {
    Src: string,
    FontColor: string,
    FontBackColor: string,
    ObjectFit: string,
    Background: string,
}