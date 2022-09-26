import { BlogTagItemObj, BlogTagListObj } from "./obj";
import { BlogTagItem, BlogTagList } from "./type";

export const blogTag1: BlogTagItem = BlogTagItemObj.createByName("Technology");
export const blogTag2: BlogTagItem = BlogTagItemObj.createByName("Memo");
export const blogTag3: BlogTagItem = BlogTagItemObj.createByName("Development");
export const blogTag4: BlogTagItem = BlogTagItemObj.createByName("Operation");

const blogTagList: BlogTagList = {
    Items: [ blogTag1, blogTag2, blogTag3, blogTag4 ]
}

export const sampleBlogTagListObj: BlogTagListObj = BlogTagListObj.createByType(blogTagList.Items);