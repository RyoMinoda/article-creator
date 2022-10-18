import { InputBase, SxProps, Theme } from "@mui/material";
import { useEffect, useState } from "react";

export type DefaultTextFieldProps = {
    width: number,
    height: number,
    initialText: string,
    sx?: SxProps<Theme>,
    updateText: (text: string) => void,
}

export const DefaultTextField = ({ props }: { props: DefaultTextFieldProps }) => {
    const { width, height, initialText, updateText, sx } = props;
    const [ text, setText ] = useState(initialText);
    useEffect(() => {
        updateText(text);
    }, [text])
    const inputSx: SxProps<Theme> = sx === undefined ? {
        width, 
        height,
    } : {
        ...sx,
        width, 
        height,
    }
    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setText(e.target.value);
    }
    return <InputBase sx={inputSx} value={text} onChange={onChangeHandler} />
}