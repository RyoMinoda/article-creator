
export const BlogEditorSubmenuSearchGenreKeyValues = {
    Title: "Title",
    Tag: "Tag",
    Article: "Article"
} as const;

export type BlogEditorSubmenuSearchGenreType = typeof BlogEditorSubmenuSearchGenreKeyValues[keyof typeof BlogEditorSubmenuSearchGenreKeyValues];

export const BlogEditorSubmenuAccordionKeyValues = {
    FilesSearch: "Search",
    FilesTags: "Tags",
    FilesHistory: "History",
    FilesBlogs: "Blogs",
    PropertyTitle: "Title",
    PropertyDetail: "Detail",
    PropertyThumbnail: "Thumbnail",
    PropertyTags: "Tags",
    PropertyOthers: "Others",
    ComponentCreate: "Create",
    ComponentEdit: "Edit",
    ComponentProperty: "Property"
} as const;

export type BlogEditorSubmenuAccordionType = typeof BlogEditorSubmenuAccordionKeyValues[keyof typeof BlogEditorSubmenuAccordionKeyValues];