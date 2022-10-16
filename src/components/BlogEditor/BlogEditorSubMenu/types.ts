import { BlogObj } from "../../../models/state/Blog/obj";
import { BlogComponentListObj } from "../../../models/state/BlogComponent/obj";
import { BlogComponentType } from "../../../models/state/BlogComponent/type";
import { BlogListObj } from "../../../models/state/BlogList/obj";
import { BlogTagListObj } from "../../../models/state/BlogTag/obj";
import { MousePosition } from "../../../models/utils/MousePosition/type";
import { BlogEditorDialogType } from "../../../organizations/BlogEditor/type";
import { BlogEditorModeType } from "../type";

export const BlogEditorSubmenuSearchGenreKeyValues = {
    Title: "Title",
    Tag: "Tag",
    Article: "Article"
} as const;

export type BlogEditorSubmenuSearchGenreType = typeof BlogEditorSubmenuSearchGenreKeyValues[keyof typeof BlogEditorSubmenuSearchGenreKeyValues];

export const BlogEditorSubmenuAccordionKeyValues = {
    FilesSearch: "Search",
    FilesTags: "Tags",
    FilesHistory: "History",
    FilesBlogs: "Blogs",
    PropertyTitle: "Title",
    PropertyDetail: "Detail",
    PropertyThumbnail: "Thumbnail",
    PropertyTags: "Tags",
    PropertyOthers: "Others",
    ComponentCreate: "Create",
    ComponentList: "List",
    ComponentProperty: "Property"
} as const;

export type BlogEditorSubmenuAccordionType = typeof BlogEditorSubmenuAccordionKeyValues[keyof typeof BlogEditorSubmenuAccordionKeyValues];

export type BlogEditorSubmenuItemProps = {
    Blog: BlogObj,
    BlogList: BlogListObj,
    BlogTagList: BlogTagListObj,
    BlogEditHistoryList: BlogListObj,
    BlogComponentList: BlogComponentListObj,
    width: number,
    height: number,
    modeType: BlogEditorModeType,
    mousePosition: MousePosition,
    searchInput: string,
    activeSearchGenre: BlogEditorSubmenuSearchGenreType,
    activeAccordions: Array<BlogEditorSubmenuAccordionType>,
    activeTagIdList: Array<string>,
    accordionTitleHeight: number,
    updateSubWindowWidth: () => void,
    updateActiveTagIdList: (tags: Array<string>) => void,
    updateActiveSearchGenre: (genre: BlogEditorSubmenuSearchGenreType) => void,
    updateSearchInput: (input: string) => void,
    updateActiveAccordions: (accirdions: Array<BlogEditorSubmenuAccordionType>) => void,
    updateBlog: (blog: BlogObj) => void,
    createBlogEmptyComponent: (componentType: BlogComponentType) => void,
    showDialog: (type: BlogEditorDialogType) => void,
}

