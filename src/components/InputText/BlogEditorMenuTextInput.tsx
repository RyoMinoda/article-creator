import { InputBaseComponentProps, InputLabelProps, InputProps, SxProps, TextField, Theme } from "@mui/material";

export type BlogEditorMenuTextInputProps = {
    text: string;
    height: number;
    width: number;
    onChangeHandler: () => void
}

export const BlogEditorMenuTextInput = ({ props }: { props: BlogEditorMenuTextInputProps }) => {
    const { width, height, text } = props;
    const style: SxProps<Theme> = {
        width, height
    }
    const inputProps: InputBaseComponentProps = {
        width, height
    }
    return (
        <TextField
            id="blog-title-input" 
            variant="standard"
            sx={style}
            value={text}
            inputProps={inputProps} />
    );
}