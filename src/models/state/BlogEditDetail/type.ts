export type BlogEditDetail = {
    Flows: Array<BlogEditFlow>
}

export const BlogEditFlowKeyValues = {

} as const;

export type BlogEditFlowType = typeof BlogEditFlowKeyValues[keyof typeof BlogEditFlowKeyValues];

export type BlogEditFlow = {
    index: number,
    type: BlogEditFlowType,
    
}