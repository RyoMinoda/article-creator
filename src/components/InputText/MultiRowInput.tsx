import { SxProps, TextField, Theme } from "@mui/material";
import { useEffect, useState } from "react";

export type MultiRowInputProps = {
    key: string,
    text: string,
    row: number,
    width: number,
    height: number,
    label: string,
    onChangeText: (text: string) => void;
    onSelectText: () => void;
}

export const MultiRowInput = ({ props }: { props: MultiRowInputProps }) => {
    const { key, text, row, onChangeText, onSelectText, width, height, label } = props;
    const [ input, setInput ] = useState(text);
    useEffect(() => {
        onChangeText(input);
    }, [input])
    const handleChange = (e: any) => {
        setInput(e.target.value);
    }
    const handleFocus = () => onSelectText();
    const textAreaStyle: React.CSSProperties = {
        height: height * 0.75, 
        width, 
    }
    return (
        <TextField
            id={"multiline-input-" + key}
            label={label}
            multiline
            value={text}
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