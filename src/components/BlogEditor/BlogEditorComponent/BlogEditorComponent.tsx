import { BlogEditorMainComponentProps } from "../type";
import { BlogEditorComponentArrangement, BlogEditorComponentArrangementProps } from "./Arrangement/BlogEditorComponentArrangement";

export const BlogEditorComponent = ({ props }: { props: BlogEditorMainComponentProps }) => {
    const { width, height, BlogPageList } = props;
    const arrangementProps: BlogEditorComponentArrangementProps = {
        ...props,
        width, 
        height, 
    }
    return <BlogEditorComponentArrangement props={arrangementProps} />;
}