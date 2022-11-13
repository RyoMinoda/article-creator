import { KeyboardKeyValues } from "./type"

export const getKeyBoardKeyFromCharCode = (charCode: number) => {
    switch (charCode) {
        case 10:
            return KeyboardKeyValues.Enter;
        case 32:
            return KeyboardKeyValues.Space;
        default:
            return KeyboardKeyValues.Letter;
    }
}