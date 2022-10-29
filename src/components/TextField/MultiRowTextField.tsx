import { SxProps, TextField, Theme } from "@mui/material";
import { useEffect, useState } from "react";

export type MultiRowTextFieldProps = {
    key?: string,
    text: string,
    row: number,
    width: number,
    height: number,
    label?: string,
    onChangeText: (text: string) => void;
    onSelectText?: () => void;
}

export const MultiRowTextField = ({ props }: { props: MultiRowTextFieldProps }) => {
    const { key, text, row, onChangeText, onSelectText, width, height, label } = props;
    const [ input, setInput ] = useState(text);
    useEffect(() => {
        onChangeText(input);
    }, [input])
    const handleChange = (e: any) => {
        setInput(e.target.value);
    }
    const handleFocus = () => {
        if (onSelectText !== undefined) {
            onSelectText();
        }
    }
    const textAreaStyle: React.CSSProperties = {
        height: height * 0.75, 
        width, 
    }
    const id = key !== undefined ? "multiline-input-" + key : "text-field";
    return (
        <TextField
            id={id}
            label={label}
            multiline
            value={input}
            onChange={handleChange}
            onFocus={handleFocus}
            sx={{ 
                height, 
                width, 
                "& .MuiInputBase-root": {
                    height: height,
                }
            }}
            inputProps={{
                style: textAreaStyle
            }}
            variant="outlined"
            size="small"
            autoComplete="off"
        />
    );
}