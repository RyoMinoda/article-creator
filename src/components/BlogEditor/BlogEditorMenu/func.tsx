import { BlogEditorMenuInsertTab } from "./BlogEditorMenuInsertTab"
import { BlogEditorMenuArticleTab } from "./BlogEditorMenuArticleTab"
import { BlogEditorMenuHomeTab } from "./BlogEditorMenuHomeTab"
import { BlogEditorMenuTabProps } from "./types"
import { BlogEditorMenuTabKeyValues, BlogEditorMenuTabType } from "../type"

export const getBlogEditorMenuTab = (type: string, props: BlogEditorMenuTabProps) => {
    switch (type) {
        case BlogEditorMenuTabKeyValues.Article:
            return <BlogEditorMenuArticleTab props={props} />
        case BlogEditorMenuTabKeyValues.Insert:
            return <BlogEditorMenuInsertTab props={props} />
        case BlogEditorMenuTabKeyValues.Home:
            return <BlogEditorMenuHomeTab props={props} />
        default:
            return <></>
    }
}