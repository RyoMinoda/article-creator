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
    FontBackOpacity: number,
    ObjectFit: string,
    Background: string,
}

export const BlogPropertyKeyValues = {
    None: "none",
    FontColor: "font-color",
    FontBackColor: "font-back-color",
    Opacity: "opacity"
} as const;

export type BlogPropertyType = typeof BlogPropertyKeyValues[keyof typeof BlogPropertyKeyValues];