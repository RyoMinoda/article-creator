export type StateUpdatedHistoryListItem = {
    ItemType: StateUpdatedItemType,
    Value: string,
    ComponentId: string,
    Id: string,
}

export type StateUpdatedHistoryList = {
    List: Array<StateUpdatedHistoryListItem>
}

export const StateUpdatedItemKeyValues = {
    Title: "title",
    Components: "components"
} as const;

export type StateUpdatedItemType = typeof StateUpdatedItemKeyValues[keyof typeof StateUpdatedItemKeyValues]