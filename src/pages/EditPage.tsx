import { useEffect, useState } from "react";
import { PreviewWidthValues } from "../components/BlogEditor/EditorPreview/type";
import MainLayout, { LayoutProps } from "../components/Layout/MainLayout";
import { No1Blog } from "../models/state/Blog/lib";
import { BlogObj } from "../models/state/Blog/obj";
import { BlogPropertyKeyValues } from "../models/state/Blog/type";
import { BlogEditDetailObj } from "../models/state/BlogEditDetail/obj";
import { sampleBlogListObj } from "../models/state/BlogList/lib";
import { BlogListObj } from "../models/state/BlogList/obj";
import { sampleBlogTagListObj } from "../models/state/BlogTag/lib";
import { BlogTagListObj } from "../models/state/BlogTag/obj";
import { initialMousePosition } from "../models/utils/MousePosition/lib";
import { MousePosition } from "../models/utils/MousePosition/type";
import { BlogEditorProps, BlogEditor } from "../organizations/BlogEditor/BlogEditor";
import { BlogEditorColorSelectDialog } from "../organizations/BlogEditor/BlogEditorColorSelectDialog";
import { BlogEditorPreviewDialog } from "../organizations/BlogEditor/BlogEditorPreviewDialog";
import { BlogEditorTagsDialog } from "../organizations/BlogEditor/BlogEditorTagsDialog";
import { BlogEditorThumbnailSelectDialog } from "../organizations/BlogEditor/BlogEditorThumbnailSelectDialog";
import { BlogEditorDialogKeyValues, BlogEditorDialogType, BlogEditorDialogProps } from "../organizations/BlogEditor/type";

const EditPage = () => {
    const [ isShowDialog, setIsShowDialog ] = useState(false);
    const [ dialogType, setDialogType ] = useState<BlogEditorDialogType>(BlogEditorDialogKeyValues.Preview);
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
        setBlogTagList(sampleBlogTagListObj);
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
        showDialog: (type: BlogEditorDialogType) => {
            setDialogType(type);
            setIsShowDialog(!isShowDialog);
            setBlogPreview(blog);
        },
        updateBlog: (blog: BlogObj) => setBlog(blog),
    }
    const previewProps: BlogEditorDialogProps = {
        type: dialogType,
        Blog: blogPreview,
        windowWidth,
        color: "transparent",
        BlogTagList: blogTagList,
        showDialog: isShowDialog,
        updateWindowWidth: (width: number) => {
            setWindowWidth(width);
        },
        updateBlog: (blog: BlogObj) => setBlog(blog),
        blogPropertyType: BlogPropertyKeyValues.None,
        hideDialog: () => setIsShowDialog(false),
    }
    const layoutProps: LayoutProps = {
        isShowDialog,
        Dialog: <Dialog props={previewProps} />,
        hideDialog: () => setIsShowDialog(false),
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


const Dialog = ({ props }: { props: BlogEditorDialogProps }) => {
    const { type, Blog } = props;
    switch (type) {
        case BlogEditorDialogKeyValues.Preview:
            return <BlogEditorPreviewDialog props={props} />;
        case BlogEditorDialogKeyValues.Thumbnail:
            return <BlogEditorThumbnailSelectDialog props={props} />;
        case BlogEditorDialogKeyValues.ThumbnailBackColorEdit: {
            const targetProps: BlogEditorDialogProps = {
                ...props,
                color: Blog.Thumbnail.FontBackColor,
                blogPropertyType: BlogPropertyKeyValues.FontBackColor,
                opacity: Blog.Thumbnail.FontBackOpacity
            }
            return <BlogEditorColorSelectDialog props={targetProps} />;
        }
        case BlogEditorDialogKeyValues.ThumbnailFontColorEdit: {
            const targetProps: BlogEditorDialogProps = {
                ...props, 
                color: Blog.Thumbnail.FontColor,
                blogPropertyType: BlogPropertyKeyValues.FontColor
            }
            return <BlogEditorColorSelectDialog props={targetProps} />;
        }
        case BlogEditorDialogKeyValues.Tags:
            return <BlogEditorTagsDialog props={props} />
        default:
            return <></>;
    }
}