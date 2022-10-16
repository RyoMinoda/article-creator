export const StorageOperationKeyValues = {
    Create: "Create",
    Update: "Update",
    Delete: "Delete"
} as const;

export type StorageOperationType = typeof StorageOperationKeyValues[keyof typeof StorageOperationKeyValues];