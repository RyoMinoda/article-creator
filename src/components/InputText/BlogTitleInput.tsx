import { Grid, InputBaseComponentProps, InputLabelProps, SxProps, TextField } from "@mui/material";
import { Theme } from "@mui/system";
import { useContext } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { getInputStyle } from "./styles";

export type BlogTitleInputProps = {
    width: number,
    height: number,
    inputHeight: number,
    text: string,
    setText: React.Dispatch<React.SetStateAction<string>>
}

export const BlogTitleInput = ({ props }: { props: BlogTitleInputProps }) => {
    const { text, width, height, inputHeight } = props;
    const inputWidth = width;
    const outerStyle: SxProps<Theme> = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height,
        width
    }
    const  { FontSize } = useContext(UiParamsContext);
    const style = getInputStyle(inputWidth, inputHeight, FontSize.Largest)
    const inputProps: InputBaseComponentProps = {
        style: { fontSize: FontSize.MuchLarger }
    }
    const inputLabelProps: InputLabelProps = {
        style: { fontSize: FontSize.Main }
    }
    return (
        <Grid container sx={outerStyle}>
            <TextField
                id="blog-title-input" 
                label="Title" 
                variant="standard"
                sx={style}
                value={text}
                inputProps={inputProps}
                InputLabelProps={inputLabelProps} />
        </Grid>
    );
}