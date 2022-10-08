import { BlogObj } from "../../../../models/state/Blog/obj";
import { BlogComponentType } from "../../../../models/state/BlogComponent/type";
import { BlogListObj } from "../../../../models/state/BlogList/obj";
import { BlogTagListObj } from "../../../../models/state/BlogTag/obj";
import { MousePosition } from "../../../../models/utils/MousePosition/type";
import { BlogEditorDialogType } from "../../../../organizations/BlogEditor/type";
import { BlogEditorModeType } from "../../type";
import { BlogEditorSubmenuAccordionType, BlogEditorSubmenuSearchGenreType } from "../types";

export type BlogEditorSubmenuFileAccordionApperance = {
    isShown: boolean,
    type: BlogEditorSubmenuAccordionType,
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
    activeAccordions: Array<BlogEditorSubmenuAccordionType>,
    activeTagIdList: Array<string>,
    accordionTitleHeight: number,
    activeComponentType: BlogComponentType | null,
    updateSubWindowWidth: () => void,
    updateActiveTagIdList: (tags: Array<string>) => void,
    updateActiveSearchGenre: (genre: BlogEditorSubmenuSearchGenreType) => void,
    updateSearchInput: (input: string) => void,
    updateActiveAccordions: (accirdions: Array<BlogEditorSubmenuAccordionType>) => void,
    updateActiveComponentType: (componentType: BlogComponentType | null) => void,
    updateBlog: (blog: BlogObj) => void,
    showDialog: (type: BlogEditorDialogType) => void,
}

