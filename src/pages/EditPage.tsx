import { useState } from "react";
import MainLayout from "../components/MainLayout/MainLayout";
import { defaultBlog } from "../models/state/Blog/lib";
import { Blog } from "../models/state/Blog/type";
import { BlogEditorProps, BlogEditor } from "../organizations/edit/BlogEditor";

const EditPage = () => {
    const [ blog, setBlog ] = useState<Blog>(defaultBlog);
    const layoutProps = {};
    const contentProps: BlogEditorProps = {
        Blog: blog,
    }
    return (
        <MainLayout props={layoutProps}>
            <BlogEditor props={contentProps} />
        </MainLayout>
    );
}

export default EditPage;