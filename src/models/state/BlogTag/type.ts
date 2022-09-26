export type BlogTagItem = {
    Id: string,
    Tag: string,
    IsFavorite: boolean,
    IsActive: boolean,
}

export type BlogTagList = {
    Items: Array<BlogTagItem>
}