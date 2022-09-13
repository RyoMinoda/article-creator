import { useState } from "react";
import { PreviewWidthValues } from "../components/BlogEditor/EditorPreview/type";
import MainLayout, { LayoutProps } from "../components/MainLayout/MainLayout";
import { Blog } from "../models/state/Blog/type";
import { BlogEditDetailObj } from "../models/state/BlogEditDetail/obj";
import { initialMousePosition } from "../models/utils/MousePosition/lib";
import { MousePosition } from "../models/utils/MousePosition/type";
import { BlogEditorProps, BlogEditor } from "../organizations/BlogEditor";
import { BlogEditorPreview, BlogEditorPreviewProps } from "../organizations/BlogEditorPreview";

const EditPage = () => {
    const [ isShowPreview, setIsShowPreview ] = useState(false);
    const targetBlog: Blog = { BlogId: "1234", Title: "Blog Title", Components: [], Thumbnail: "" };
    const [ blog, setBlog ] = useState(targetBlog);
    const [ blogEditDetail, setBlogEditDetail ] = useState(BlogEditDetailObj.create());
    const [ blogPreview, setBlogPreview ] = useState(targetBlog);
    const initialWindowWidth = PreviewWidthValues[0];
    const [ windowWidth, setWindowWidth ] = useState(initialWindowWidth);
    const [ mousePosition, setMousePosition ] = useState(initialMousePosition);

    const contentProps: BlogEditorProps = {
        Blog: blog, 
        BlogEditDetail: blogEditDetail,
        mousePosition,
        save: (blog: Blog) => {
            setBlogPreview(blog);
            setBlog(blog);
        },
        preview: (blog: Blog) => {
            setIsShowPreview(!isShowPreview);
            setBlogPreview(blog);
        },
    }
    const previewProps: BlogEditorPreviewProps = {
        Blog: blogPreview,
        windowWidth,
        updateWindowWidth: (width: number) => {
            setWindowWidth(width);
        }
    }
    const layoutProps: LayoutProps = {
        isShowPopup: isShowPreview,
        Popup: <BlogEditorPreview props={previewProps} />,
        hidePopup: () => setIsShowPreview(false),
        mousePosition,
        updatePosition: (position: MousePosition) => setMousePosition(position),
    };
    return (
        <MainLayout props={layoutProps}>
            <BlogEditor props={contentProps} />
        </MainLayout>
    );
}

export default EditPage;