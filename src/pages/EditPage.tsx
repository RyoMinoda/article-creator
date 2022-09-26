import { useEffect, useState } from "react";
import { PreviewWidthValues } from "../components/BlogEditor/EditorPreview/type";
import MainLayout, { LayoutProps } from "../components/MainLayout/MainLayout";
import { No1Blog } from "../models/state/Blog/lib";
import { BlogObj } from "../models/state/Blog/obj";
import { BlogEditDetailObj } from "../models/state/BlogEditDetail/obj";
import { sampleBlogListObj } from "../models/state/BlogList/lib";
import { BlogListObj } from "../models/state/BlogList/obj";
import { sampleBlogTagListObj } from "../models/state/BlogTag/lib";
import { BlogTagListObj } from "../models/state/BlogTag/obj";
import { initialMousePosition } from "../models/utils/MousePosition/lib";
import { MousePosition } from "../models/utils/MousePosition/type";
import { BlogEditorProps, BlogEditor } from "../organizations/BlogEditor/BlogEditor";
import { BlogEditorPreview } from "../organizations/BlogEditor/BlogEditorPreview";
import { BlogEditorThumbnailViewer } from "../organizations/BlogEditor/BlogEditorThumbnailViewer";
import { BlogEditorPopupKeyValues, BlogEditorPopupType, BlogEditorPopupProps } from "../organizations/BlogEditor/type";

const EditPage = () => {
    const [ isShowPopup, setIsShowPopup ] = useState(false);
    const [ popupType, setPopupType ] = useState<BlogEditorPopupType>(BlogEditorPopupKeyValues.Preview);
    const [ blog, setBlog ] = useState(BlogObj.create());
    const [ blogEditDetail, setBlogEditDetail ] = useState(BlogEditDetailObj.create());
    const [ blogList, setBlogList ] = useState(BlogListObj.create());
    const [ blogTagList, setBlogTagList ] = useState(BlogTagListObj.create());
    const [ blogPreview, setBlogPreview ] = useState(BlogObj.create());
    const [ blogEditHistoryList, setBlogEditHistoryList ] = useState(BlogListObj.create());
    const initialWindowWidth = PreviewWidthValues[0];
    const [ windowWidth, setWindowWidth ] = useState(initialWindowWidth);
    const [ mousePosition, setMousePosition ] = useState(initialMousePosition);
    const [ isSaved, setIsSaved ] = useState(false);

    useEffect(() => {
        const newBlog = BlogObj.create();
        newBlog.setObj(No1Blog);
        setBlog(newBlog);
        setBlogList(sampleBlogListObj);
        setBlogTagList(sampleBlogTagListObj);
        setBlogEditHistoryList(sampleBlogListObj);
        setBlogPreview(newBlog);
    }, [])

    const contentProps: BlogEditorProps = {
        Blog: blog, 
        BlogEditDetail: blogEditDetail,
        BlogList: blogList,
        BlogTagList: blogTagList,
        BlogEditHistoryList: blogEditHistoryList,
        mousePosition,
        save: () => {
            setBlogPreview(blog);
            setBlog(blog);
        },
        showPopup: (type: BlogEditorPopupType) => {
            setPopupType(type);
            setIsShowPopup(!isShowPopup);
            setBlogPreview(blog);
        },
        updateBlog: (blog: BlogObj) => setBlog(blog),
    }
    const previewProps: BlogEditorPopupProps = {
        type: popupType,
        Blog: blogPreview,
        windowWidth,
        updateThumbnail: (src: string) => {

        },
        updateWindowWidth: (width: number) => {
            setWindowWidth(width);
        },
        updateThumbnailFontColor: (color: string) => {

        },
    }
    const layoutProps: LayoutProps = {
        isShowPopup,
        Popup: <Popup props={previewProps} />,
        hidePopup: () => setIsShowPopup(false),
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


const Popup = ({ props }: { props: BlogEditorPopupProps }) => {
    switch (props.type) {
        case BlogEditorPopupKeyValues.Preview:
            return <BlogEditorPreview props={props} />;
        case BlogEditorPopupKeyValues.Thumbnail:
            return <BlogEditorThumbnailViewer props={props} />
        default:
            return <></>;
    }
}