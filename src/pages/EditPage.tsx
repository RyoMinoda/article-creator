import { useState } from "react";
import { EditorPreview, EditorPreviewProps } from "../components/BlogEditor/EditorPreview/EditorPreview";
import MainLayout, { LayoutProps } from "../components/MainLayout/MainLayout";
import { Blog } from "../models/state/Blog/type";
import { BlogEditorProps, BlogEditor } from "../organizations/BlogEditor";
import { BlogEditorPreview, BlogEditorPreviewProps } from "../organizations/BlogEditorPreview";

const EditPage = () => {
    const [ isShowPreview, setIsShowPreview ] = useState(false);
    const targetBlog: Blog = { BlogId: "1234", Title: "Blog Title", Components: [], Thumbnail: "" };
    const [ blog, setBlog ] = useState(targetBlog);
    const [ blogPreview, setBlogPreview ] = useState(targetBlog);

    const contentProps: BlogEditorProps = {
        Blog: blog,
        save: () => {},
        preview: () => {
            setIsShowPreview(!isShowPreview);
        },
    }
    const previewProps: BlogEditorPreviewProps = {
        Blog: blogPreview
    }
    const layoutProps: LayoutProps = {
        isShowPopup: isShowPreview,
        Popup: <BlogEditorPreview props={previewProps} />,
        hidePopup: () => setIsShowPreview(false),
    };
    return (
        <MainLayout props={layoutProps}>
            <BlogEditor props={contentProps} />
        </MainLayout>
    );
}

export default EditPage;