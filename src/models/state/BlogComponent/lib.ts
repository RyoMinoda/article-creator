import { Uuid } from "../../../utils/Uuid";
import { BlogComponent, BlogComponentType } from "./type";

export const initialBlogComponent: BlogComponent = {
    BlogComponentId: Uuid.NewUuid(),
    X: 0,
    Y: 0,
    ComponentType: BlogComponentType.Document,
    ColumnSpan: 0,
    RowSpan: 0,
}

export const no1BlocComponent: BlogComponent = {
    BlogComponentId: Uuid.NewUuid(),
    X: 0,
    Y: 10,
    ComponentType: BlogComponentType.Document,
    ColumnSpan: 0,
    RowSpan: 0,
}