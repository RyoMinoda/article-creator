import { useEffect, useState } from "react";
import { getBlogComponentContentTypeList } from "../../models/state/BlogComponent/func";
import { BlogComponentListItemObj } from "../../models/state/BlogComponent/obj";
import { BlogComponentContentKeyValues, BlogComponentContentType } from "../../models/state/BlogComponent/type";
import { DefaultSelector, DefaultSelectorProps } from "./DefaultSelector";

export type BlogEditorComponentEditorMainTypeSelectorProps = {
    width: number,
    height: number,
    BlogComponent: BlogComponentListItemObj;
    updateBlogComponent: (blogComponent: BlogComponentListItemObj) => void,
}

export const BlogEditorComponentEditorMainTypeSelector = ({ props }: { props: BlogEditorComponentEditorMainTypeSelectorProps }) => {
    const { height, BlogComponent, width, updateBlogComponent } = props;
    const initialContentType = BlogComponentContentKeyValues.Text;
    const [ contentType, setContentType ] = useState<BlogComponentContentType>(initialContentType);

    useEffect(() => {
        BlogComponent.ContentType = contentType;
        updateBlogComponent(BlogComponent);
    }, [ contentType ]);

    const typeArray = getBlogComponentContentTypeList();
    const typeSelectorProps: DefaultSelectorProps = {
        label: "",
        array: typeArray,
        item: contentType,
        width: width,
        height: height,
        onChangeHandler: (index: number) => {
            const target = typeArray[index];
            setContentType(target);
        }
    }
    
    return (
        <DefaultSelector props={typeSelectorProps} />
    );
}

