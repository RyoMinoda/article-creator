import { Uuid } from "../../../utils/Uuid";
import { DateTime } from "../../utils/DateTime/obj";
import { BlogComponentListItem, BlogComponentKeyValues } from "./type";

export const initialBlogComponent: BlogComponentListItem = {
    MenuTitle: "",
    StrContent: "",
    X: 0,
    Y: 0,
    ComponentType: BlogComponentKeyValues.Article,
    ColumnSpan: 0,
    RowSpan: 0,
}

export const no1BlocComponent: BlogComponentListItem = {
    MenuTitle: "",
    StrContent: "",
    X: 0,
    Y: 10,
    ComponentType: BlogComponentKeyValues.Article,
    ColumnSpan: 0,
    RowSpan: 0,
}
