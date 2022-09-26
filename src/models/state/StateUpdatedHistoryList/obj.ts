import { ListItemObj, ListObj } from "../../utils/List/obj";
import { StateUpdatedHistoryListItem, StateUpdatedItemType } from "./type";

export class StateUpdatedHistoryList extends ListObj<StateUpdatedHistoryListItemObj> implements StateUpdatedHistoryList {
    constructor(list: StateUpdatedHistoryList) {
        super(list.Items);
    }
}


export class StateUpdatedHistoryListItemObj extends ListItemObj  implements StateUpdatedHistoryListItem {
    ItemType: StateUpdatedItemType;
    Value: string;
    ComponentId: string;

    constructor (item: StateUpdatedHistoryListItem) {
        super(item.Id);
        this.ItemType = item.ItemType;
        this.Value = item.Value;
        this.ComponentId = item.ComponentId;
    }
}