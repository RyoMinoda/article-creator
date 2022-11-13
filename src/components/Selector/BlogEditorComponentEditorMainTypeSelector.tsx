import { useEffect, useState } from "react";
import { BlogComponentListItemObj } from "../../models/state/BlogComponent/obj";
import { getBlogComponentContentTypeList } from "../../models/state/BlogComponentContent/func";
import { BlogComponentContentListItemObj, BlogComponentContentListObj } from "../../models/state/BlogComponentContent/obj";
import { BlogComponentContentKeyValues, BlogComponentContentType } from "../../models/state/BlogComponentContent/types";
import { StorageOperationKeyValues, StorageOperationType } from "../../utils/StorageOperation";
import { DefaultSelector, DefaultSelectorProps } from "./DefaultSelector";

export type BlogEditorComponentEditorMainTypeSelectorProps = {
    width: number,
    height: number,
    BlogComponentContent: BlogComponentContentListItemObj;
    updateComponentContentList: (blogComponentContentList: BlogComponentContentListObj) => void,
}

export const BlogEditorComponentEditorMainTypeSelector = ({ props }: { props: BlogEditorComponentEditorMainTypeSelectorProps }) => {
    const { height, BlogComponentContent, width, updateComponentContentList } = props;
    const initialContentType = BlogComponentContentKeyValues.Text;
    const [ contentType, setContentType ] = useState<BlogComponentContentType>(initialContentType);

    useEffect(() => {
        BlogComponentContent.Type = contentType;
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