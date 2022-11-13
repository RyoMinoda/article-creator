import { SelectionRange } from "./type";

export const getSelectionRange = (start: number, end: number): SelectionRange => {
    return {
        Start: start,
        End: end,
    }
}