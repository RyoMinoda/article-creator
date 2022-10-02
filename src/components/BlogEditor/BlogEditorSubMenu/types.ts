import { BlogObj } from "../../../models/state/Blog/obj";
import { BlogListObj } from "../../../models/state/BlogList/obj";
import { BlogTagListObj } from "../../../models/state/BlogTag/obj";
import { MousePosition } from "../../../models/utils/MousePosition/type";
import { BlogEditorDialogType } from "../../../organizations/BlogEditor/type";
import { BlogEditorModeType } from "../type";

export type BlogEditorSubmenuFileAccordionApperance = {
    isShown: boolean,
    type: BlogEditorSubmenuFileAccordionType,
    height: number,
}

export type BlogEditorSubmenuItemProps = {
    Blog: BlogObj,
    BlogList: BlogListObj,
    BlogTagList: BlogTagListObj,
    BlogEditHistoryList: BlogListObj,
    width: number,
    height: number,
    modeType: BlogEditorModeType,
    mousePosition: MousePosition,
    searchInput: string,
    activeSearchGenre: BlogEditorSubmenuSearchGenreType,
    activeAccordions: Array<BlogEditorSubmenuFileAccordionType>,
    activeTagIdList: Array<string>,
    accordionTitleHeight: number,
    updateSubWindowWidth: () => void,
    updateActiveTagIdList: (tags: Array<string>) => void,
    updateActiveSearchGenre: (genre: BlogEditorSubmenuSearchGenreType) => void,
    updateSearchInput: (input: string) => void,
    updateBlog: (blog: BlogObj) => void,
    showDialog: (type: BlogEditorDialogType) => void,

}

export const BlogEditorSubmenuFileAccordionKeyValues = {
    Search: "Search",
    Tags: "Tags",
    History: "History",
    Blogs: "Blogs",
} as const;

export type BlogEditorSubmenuFileAccordionType = typeof BlogEditorSubmenuFileAccordionKeyValues[keyof typeof BlogEditorSubmenuFileAccordionKeyValues];

export const BlogEditorSubmenuSearchGenreKeyValues = {
    Title: "Title",
    Tag: "Tag",
    Article: "Article"
} as const;

export type BlogEditorSubmenuSearchGenreType = typeof BlogEditorSubmenuSearchGenreKeyValues[keyof typeof BlogEditorSubmenuSearchGenreKeyValues];