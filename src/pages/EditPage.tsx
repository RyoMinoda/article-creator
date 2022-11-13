import { useEffect, useState } from "react";
import { PreviewWidthValues } from "../components/BlogEditor/EditorPreview/type";
import MainLayout, { LayoutProps } from "../components/Layout/MainLayout";
import { No1Blog } from "../models/state/Blog/lib";
import { BlogObj } from "../models/state/Blog/obj";
import { BlogPropertyKeyValues } from "../models/state/Blog/type";
import { BlogComponentListItemObj, BlogComponentListObj } from "../models/state/BlogComponent/obj";
import { BlogEditDetailObj } from "../models/state/BlogEditDetail/obj";
import { sampleBlogListObj } from "../models/state/BlogList/lib";
import { BlogListObj } from "../models/state/BlogList/obj";
import { BlogPageListObj, BlogPageObj } from "../models/state/BlogPage/obj";
import { sampleBlogTagListObj } from "../models/state/BlogTag/lib";
import { BlogTagListObj } from "../models/state/BlogTag/obj";
import { initialMousePosition } from "../models/utils/MousePosition/lib";
import { MousePosition, MouseActionKeyValues } from "../models/utils/MousePosition/type";
import { BlogEditorProps, BlogEditor } from "../organizations/BlogEditor/BlogEditor";
import { BlogEditorColorSelectDialog } from "../organizations/BlogEditor/BlogEditorColorSelectDialog";
import { BlogEditorPreviewDialog } from "../organizations/BlogEditor/BlogEditorPreviewDialog";
import { BlogEditorTagsDialog } from "../organizations/BlogEditor/BlogEditorTagsDialog";
import { BlogEditorThumbnailSelectDialog } from "../organizations/BlogEditor/BlogEditorThumbnailSelectDialog";
import { BlogEditorDialogKeyValues, BlogEditorDialogType, BlogEditorDialogProps } from "../organizations/BlogEditor/type";
import { StorageOperationKeyValues, StorageOperationType } from "../utils/StorageOperation";
import { FullDialogLayout, FullDialogLayoutProps } from "../components/Layout/FullDialogLayout";
import { BlogEditorDialog } from "../components/BlogEditorDialog/BlogComponentEditor";
import { BlogComponentContentListItemObj, BlogComponentContentListObj } from "../models/state/BlogComponentContent/obj";

const EditPage = () => {
    const [ isShowDialog, setIsShowDialog ] = useState(false);
    const [ dialogType, setDialogType ] = useState<BlogEditorDialogType>(BlogEditorDialogKeyValues.Preview);
    const [ blog, setBlog ] = useState(BlogObj.create());
    const [ blogEditDetail, setBlogEditDetail ] = useState(BlogEditDetailObj.create());
    const [ blogList, setBlogList ] = useState(BlogListObj.create());
    const [ blogPageList, setBlogPageList ] = useState(BlogPageListObj.create());
    const [ blogPage, setBlogPage ] = useState(BlogPageObj.empty());
    const [ blogTagList, setBlogTagList ] = useState(BlogTagListObj.create());
    const [ blogPreview, setBlogPreview ] = useState(BlogObj.create());
    const [ blogComponent, setBlogComponent ] = useState(BlogComponentListItemObj.create());
    const [ blogComponentList, setBlogComponentList ] = useState(new BlogComponentListObj([]));
    const [ blogComponentContentList, setBlogComponentContentList ] = useState(BlogComponentContentListObj.create());
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
        const target = blogPageList.findPage(1);
        if (target !== null) {
            setBlogPage(target);
        }
    }, []);

    const updateBlogComponentContentList = (blogComponentContentItem: BlogComponentContentListItemObj, operation: StorageOperationType) => {
        
    }

    const updateBlogComponent = (component: BlogComponentListItemObj, operation: StorageOperationType) => {
        switch (operation) {
            case StorageOperationKeyValues.Update:
                setBlogComponent(component);
                break;
            case StorageOperationKeyValues.Delete:
                setBlogComponent(BlogComponentListItemObj.create());
                break;
        }
    };

    const updateBlogComponentList = (component: BlogComponentListItemObj, operation: StorageOperationType) => {
        switch (operation) {
            case StorageOperationKeyValues.Update:
                blogComponentList.update(component);
                setBlogComponentList(blogComponentList);
                break;
            case StorageOperationKeyValues.Create:
                blogComponentList.add(component);
                setBlogComponentList(blogComponentList);
                break;
            case StorageOperationKeyValues.Delete:
                blogComponentList.remove(component.Id);
                setBlogComponentList(blogComponentList);
        }
    }

    const contentProps: BlogEditorProps = {
        Blog: blog, 
        BlogEditDetail: blogEditDetail,
        BlogList: blogList,
        BlogTagList: blogTagList,
        BlogEditHistoryList: blogEditHistoryList,
        BlogComponentList: blogComponentList,
        BlogPageList: blogPageList,
        BlogPage: blogPage,
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
        updateBlogPageList: (page: BlogPageObj, operation: StorageOperationType) => {
            switch (operation) {
                case StorageOperationKeyValues.Update:
                    blogPageList.update(page);
                    setBlogPageList(blogPageList);
                    break;
                case StorageOperationKeyValues.Create:
                    blogPageList.add(page);
                    setBlogPageList(blogPageList);
                    break;
                case StorageOperationKeyValues.Delete:
                    blogPageList.remove(page.Id);
                    setBlogPageList(blogPageList);
                    break;
            }
        },
        updateBlogPage: (page: number, operation: StorageOperationType) => {
            switch (operation) {
                case StorageOperationKeyValues.Update:
                    const targetPage = blogPageList.findPage(page);
                    if (targetPage !== null) {
                        setBlogPage(targetPage);
                    }
                    break;
            }
        },
        updateBlogComponentList,
        updateBlogComponent
    }
    const previewProps: BlogEditorDialogProps = {
        type: dialogType,
        Blog: blogPreview,
        BlogPage: blogPage,
        BlogComponent: blogComponent,
        BlogComponentList: blogComponentList,
        BlogComponentContentList: blogComponentContentList,
        windowWidth,
        color: "transparent",
        BlogTagList: blogTagList,
        showDialog: isShowDialog,
        updateWindowWidth: (width: number) => {
            setWindowWidth(width);
        },
        updateBlogComponent,
        updateBlogComponentList,
        updateBlogComponentContentList,
        updateBlog: (blog: BlogObj) => setBlog(blog),
        blogPropertyType: BlogPropertyKeyValues.None,
        hideDialog: () => setIsShowDialog(false),
    }
    const layoutProps: LayoutProps = {
        isShowDialog,
        Dialog: <Dialog props={previewProps} />,
        hideDialog: () => setIsShowDialog(false),
        mousePosition,
        updatePosition: (position: MousePosition) => {
            if (position.action !== MouseActionKeyValues.MouseMove) {
                setMousePosition(position);
                return;
            }
            if (position.x % 50 === 0) {
                setMousePosition(position);
            }
        },
    };
    return (
        <MainLayout props={layoutProps}>
            <BlogEditor props={contentProps} />
        </MainLayout>
    );
}

export default EditPage;


const Dialog = ({ props }: { props: BlogEditorDialogProps }) => {
    const { type, Blog, BlogComponent } = props;
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
            return <BlogEditorTagsDialog props={props} />;
        case BlogEditorDialogKeyValues.BlogTheme: {
            const targetProps: BlogEditorDialogProps = {
                ...props,
                color: Blog.Setting.Theme,
                blogPropertyType: BlogPropertyKeyValues.BlogTheme,
                opacity: Blog.Setting.ThemeOpacity
            }
            return <BlogEditorColorSelectDialog props={targetProps} />;
        }
        case BlogEditorDialogKeyValues.ArticleEditor: {
            const layoutProps: FullDialogLayoutProps = {
                ...props,
                isLoading: BlogComponent.getIsUndefined(),
                title: "Article Editor",
            }
            return (
                <FullDialogLayout props={layoutProps}>
                    <BlogEditorDialog props={props} />
                </FullDialogLayout>
            );
        }
        default:
            return <></>;
    }
}