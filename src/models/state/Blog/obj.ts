import { Uuid } from "../../../utils/Uuid";
import { BlogComponentListItemObj } from "../BlogComponent/obj";
import { BlogComponentListItem } from "../BlogComponent/type";
import { BlogTagListObj } from "../BlogTag/obj";
import { BlogTagItem } from "../BlogTag/type";
import { defaultBlogThumbnail } from "./lib";
import { Blog, BlogPropertyKeyValues, BlogPropertyType, BlogThumbnail } from "./type";

export class BlogObj implements Blog {
    BlogId: string;
    Title: string;
    Components: Array<BlogComponentListItemObj>;
    Tags: BlogTagListObj;
    Thumbnail: BlogThumbnail;
    UpdatedAt: Date;
    CreatedAt: Date;
    Detail: string;

    constructor(
        id: string, 
        title: string, 
        detail: string,
        tags: BlogTagListObj,
        components: Array<BlogComponentListItemObj>, 
        thumbnail: BlogThumbnail,
        updatedAt: Date,
        createdAt: Date
    ) {
        this.BlogId = id;
        this.Title = title;
        this.Detail = detail;
        this.Tags = tags;
        this.Components = components;
        this.Thumbnail = thumbnail;
        this.UpdatedAt = updatedAt;
        this.CreatedAt = createdAt;
    }

    public setObj(blog: Blog) {
        this.BlogId = blog.BlogId;
        this.Title = blog.Title;
        this.Detail = blog.Detail;
        this.Tags = blog.Tags;
        this.Components = blog.Components;
        this.Thumbnail = blog.Thumbnail;
        this.UpdatedAt = blog.UpdatedAt;
        this.CreatedAt = blog.CreatedAt;
    }

    public setProperty(type: BlogPropertyType, value: string): BlogObj {
        switch (type) {
            case BlogPropertyKeyValues.FontBackColor:
                this.Thumbnail.FontBackColor = value;
                break;
            case BlogPropertyKeyValues.FontColor:
                this.Thumbnail.FontColor = value;
                break;
            case BlogPropertyKeyValues.Opacity:
                const opacity = Number.parseFloat(value);
                this.Thumbnail.FontBackOpacity = opacity;
        }
        return this;
    }

    public setTitle(title: string): void {
        this.Title = title
    }

    public setTags(tags: BlogTagItem[]) {
        this.Tags = new BlogTagListObj(tags);
    }

    public static create(): BlogObj {
        const uuid = Uuid.NewUuid();
        return new BlogObj(
            uuid, "", "", BlogTagListObj.create(), [], defaultBlogThumbnail, new Date(), new Date(), 
        );
    }

    public static createObj(item: Blog) {
        return this.create();
    }
}