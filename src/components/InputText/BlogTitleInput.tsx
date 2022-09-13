import { Grid, InputBaseComponentProps, InputLabelProps, SxProps, TextField } from "@mui/material";
import { Theme } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";

export type BlogTitleInputProps = {
    width: number,
    height: number,
    defaultText: string,
    updateText: (value: string) => void
}

export const BlogTitleInput = ({ props }: { props: BlogTitleInputProps }) => {
    const { defaultText, width, height, updateText } = props;
    const [ text, setText ] = useState(defaultText);

    useEffect(() => {
        updateText(text);
    }, [text])

    const outerStyle: SxProps<Theme> = {
        height,
        width
    }
    const  { FontSize } = useContext(UiParamsContext);
    const fieldSx: SxProps<Theme> = {
        width,
        height,
        border: "none",
        margin: 0,
        padding: 0,
        '& .MuiInput-underline:before': {
            borderBottomColor: 'transparent'
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottomColor: 'transparent'
        },
    }
    const inputProps: InputBaseComponentProps = {
        style: { 
            fontSize: FontSize.Main, 
            padding: 0,
            height,
            paddingLeft: 10
        }
    }
    const onChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setText(e.target.value);
    }
    return (
        <Grid item sx={outerStyle}>
            <TextField
                id="blog-title-input" 
                variant="standard"
                sx={fieldSx}
                value={text}
                inputProps={inputProps}
                onChange={onChangeHandler} />
        </Grid>
    );
}