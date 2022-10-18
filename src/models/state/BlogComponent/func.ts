import { X509Certificate } from "crypto";
import { BlogComponentKeyValues, BlogComponentStyleKeyValues, BlogComponentStyleType, BlogComponentType } from "./type";

export const getBlogComponentTypeName = (type: BlogComponentType): string => {
    return type;
}

export const getBlogComponentTypeList = (): Array<BlogComponentType> => {
    return Object.keys(BlogComponentKeyValues)
        .map((v) => v as BlogComponentType);
}

export const getBlogComponentTypeNameList = (): Array<string> => {
    return Object.keys(BlogComponentKeyValues);
}

export const getBlogComponentType = (str: string): BlogComponentType => {
    const names = getBlogComponentTypeNameList();
    const index = names.indexOf(str);
    if (index >= 0) return getBlogComponentTypeList()[index];
    throw new Error("error in getBlogComponentType");
}

export const getDefaultBlogComponentStyles = (componentType: BlogComponentType): BlogComponentStyleType[] => {
    switch (componentType) {
        case BlogComponentKeyValues.Headline:
            return [ BlogComponentStyleKeyValues.HeadlineH1 ];
        default:
            return []
    }
}

export const getBlogComponentStyles = (componentType?: BlogComponentType, styleTypes?: Array<BlogComponentStyleType>): BlogComponentStyleType[]  => {
    if (componentType === undefined) return Object.keys(BlogComponentStyleKeyValues);
    if (styleTypes === undefined) {
        return Object.keys(BlogComponentStyleKeyValues)
            .filter(x => x.startsWith(componentType))
    }
    return Object.keys(BlogComponentStyleKeyValues)
        .filter(x => styleTypes.includes(x))
        .filter(x => x.startsWith(componentType))
}

export const getBlogComponentStyleStrings = (componentType?: BlogComponentType, styleTypes?: Array<BlogComponentStyleType>): BlogComponentStyleType[]  => {
    if (componentType === undefined) return Object.keys(BlogComponentStyleKeyValues);
    if (styleTypes === undefined) {
        return Object.keys(BlogComponentStyleKeyValues)
            .filter(x => x.startsWith(componentType))
            .map(x => x.replace(componentType, ""))
    }
    return Object.keys(BlogComponentStyleKeyValues)
        .filter(x => styleTypes.includes(x))
        .filter(x => x.startsWith(componentType))
        .map(x => x.replace(componentType, ""))
}
