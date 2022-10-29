import { useEffect, useState } from "react";
import { getBlogComponentStyles, getBlogComponentStyleStrings } from "../../models/state/BlogComponent/func";
import { BlogComponentListItemObj } from "../../models/state/BlogComponent/obj";
import { BlogComponentStyleType, BlogComponentType } from "../../models/state/BlogComponent/type";
import { StorageOperationKeyValues, StorageOperationType } from "../../utils/StorageOperation";
import { DefaultSelector, DefaultSelectorProps } from "./DefaultSelector";

export type BlogEditorComponentEditorMainTypeSelectorProps = {
    width: number,
    rowHeightUnit: number,
    titleHeight: number,
    titleWidth: number,
    BlogComponentItem: BlogComponentListItemObj;
    updateBlogComponentList: (componentItem: BlogComponentListItemObj, operation: StorageOperationType) => void,
}

export const BlogEditorComponentEditorMainTypeSelector = ({ props }: { props: BlogEditorComponentEditorMainTypeSelectorProps }) => {
    const { rowHeightUnit, BlogComponentItem, width, updateBlogComponentList } = props;
    const initialStyle = BlogComponentItem.getComponentStyles()[0];
    const [ style, setStyle ] = useState<BlogComponentStyleType>(initialStyle);

    useEffect(() => {
        BlogComponentItem.Styles = [ style ];
        updateBlogComponentList(BlogComponentItem, StorageOperationKeyValues.Update);
    }, [style]);

    const typeArray = getBlogComponentStyleStrings(BlogComponentItem.ComponentType);
    const typeSelectorProps: DefaultSelectorProps = {
        label: BlogComponentItem.ComponentType,
        array: typeArray,
        item: style.replace(BlogComponentItem.ComponentType, ""),
        width: width / 3,
        height: rowHeightUnit - 20,
        onChangeHandler: (index: number) => {
            const target = getBlogComponentStyles(BlogComponentItem.ComponentType)[index];
            setStyle(target);
        }
    }
    
    return (
        <DefaultSelector props={typeSelectorProps} />
    );
}