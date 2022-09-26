import { BlogObj } from "../../models/state/Blog/obj";

export type BlogEditorPopupProps = {
    type: BlogEditorPopupType,
    Blog: BlogObj,
    windowWidth: number,
    updateThumbnail: (src: string) => void,
    updateWindowWidth: (width: number) => void,
    updateThumbnailFontColor: (color: string) => void,
}

export const BlogEditorPopupKeyValues = {
    Preview: "Preview",
    Thumbnail: "Thumbnail",
    ThumbnailFontColorEdit: "ThumbnailFontColorEdit",
    ThumbnailBackColorEdit: "ThumbnailBackColorEdit",
} as const;

export type BlogEditorPopupType = typeof BlogEditorPopupKeyValues[keyof typeof BlogEditorPopupKeyValues];