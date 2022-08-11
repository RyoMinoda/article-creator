import { Uuid } from "../../../utils/Uuid";
import { BlogComponent, BlogComponentType } from "./type";

export const initialBlogComponent: BlogComponent = {
    BlogComponentId: Uuid.NewUuid(),
    X: 0,
    Y: 0,
    ComponentType: BlogComponentType.Document
}

export const no1BlocComponent: BlogComponent = {
    BlogComponentId: Uuid.NewUuid(),
    X: 0,
    Y: 10,
    ComponentType: BlogComponentType.Document
}