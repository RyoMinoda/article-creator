import { Uuid } from "../../../utils/Uuid";
import { BlogComponent, BlogComponentKeyValues, BlogComponentType } from "./type";

export const initialBlogComponent: BlogComponent = {
    ComponentTitle: "",
    StrContent: "",
    BlogComponentId: Uuid.NewUuid(),
    X: 0,
    Y: 0,
    ComponentType: BlogComponentKeyValues.Article,
    ColumnSpan: 0,
    RowSpan: 0,
}

export const no1BlocComponent: BlogComponent = {
    BlogComponentId: Uuid.NewUuid(),
    ComponentTitle: "",
    StrContent: "",
    X: 0,
    Y: 10,
    ComponentType: BlogComponentKeyValues.Article,
    ColumnSpan: 0,
    RowSpan: 0,
}