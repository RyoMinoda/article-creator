import { BlogComponentEditor, BlogComponentEditorProps } from "../../components/BlogComponentEditor/BlogComponentEditor";
import { DialogLayout, DialogLayoutProps } from "../../components/Layout/DialogLayout"
import { FullDialogLayout, FullDialogLayoutProps } from "../../components/Layout/FullDialogLayout";
import { BlogEditorDialogProps } from "./type"

export const BlogEditorDialog = ({ props }: { props: BlogEditorDialogProps }) => {
    const layoutProps: FullDialogLayoutProps = {
        ...props,
        title: "Article Editor",
    }
    const componentEditorProps: BlogComponentEditorProps = {
        ...props,
    }
    return (
        <FullDialogLayout props={layoutProps}>
            <BlogComponentEditor props={componentEditorProps} />
        </FullDialogLayout>
    )
}