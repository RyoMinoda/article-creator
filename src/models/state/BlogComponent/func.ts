import { BlogComponentType } from "./type";

export const getBlogComponentTypeName = (type: BlogComponentType): string => {
    return type;
}

export const getBlogComponentTypeList = (): Array<BlogComponentType> => {
    return Object.keys(BlogComponentType)
        .map((v) => v as BlogComponentType);
}

export const getBlogComponentTypeNameList = (): Array<string> => {
    return Object.keys(BlogComponentType);
}

export const getBlogComponentType = (str: string): BlogComponentType => {
    const names = getBlogComponentTypeNameList();
    const index = names.indexOf(str);
    if (index >= 0) return getBlogComponentTypeList()[index];
    throw new Error("error in getBlogComponentType");
}