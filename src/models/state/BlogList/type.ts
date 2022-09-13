export type BlogListItem = {
    Id: string,
    Title: string,
    UpdatedAt: Date,
    CreatedAt: Date,
}

export type BlogList = {
    Items: Array<BlogListItem>
}