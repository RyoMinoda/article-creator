export const SearchConditionKeyValues = {
    PerfectMatching: "PerfectMatching",
    PrefixMatching: "PrefixMatching"
} as const;

export type SearchConditionType = typeof SearchConditionKeyValues[keyof typeof SearchConditionKeyValues];