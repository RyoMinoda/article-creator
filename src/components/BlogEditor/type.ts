export const BlogEditorModeKeyValues = {
    Files: "Files",
    Property: "Property",
    Map: "Map",
    Flow: "Flow",
} as const;

export type BlogEditorModeType = typeof BlogEditorModeKeyValues[keyof typeof BlogEditorModeKeyValues];

export const BlogEditorMenuTabKeyValues = {
    Home: "Home",
    Insert: "Insert",
    Article: "Article",
} as const;

export type BlogEditorMenuTabType = typeof BlogEditorMenuTabKeyValues[keyof typeof BlogEditorMenuTabKeyValues];