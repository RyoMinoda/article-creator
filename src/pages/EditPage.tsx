import { useState } from "react";
import MainLayout from "../components/MainLayout/MainLayout";
import { defaultBlog } from "../models/state/Blog/lib";
import { Blog } from "../models/state/Blog/type";
import { EditContent, EditContentProps } from "../organizations/EditContent";

const EditPage = () => {
    const [ blog, setBlog ] = useState<Blog>(defaultBlog);
    const layoutProps = {};
    const contentProps: EditContentProps = {
        Blog: blog,
    }
    return (
        <MainLayout props={layoutProps}>
            <EditContent props={contentProps} />
        </MainLayout>
    );
}

export default EditPage;