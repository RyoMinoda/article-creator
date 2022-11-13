import { BlogComponentContentStyleType } from "../BlogComponentContentStyle/type";

export const getContentStyleTagString = (type: BlogComponentContentStyleType): string => {
    const initTag = "#$[{<";
    const finTag = ">}]$#";
    return initTag + type + finTag;
}