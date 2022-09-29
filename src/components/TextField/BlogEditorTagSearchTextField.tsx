import { Box, Grid, InputBase, SxProps, Theme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import DefaultButton, { DefaultButtonProps } from "../Button/DefaultButton";
import SearchIcon from '@mui/icons-material/Search';
import { UiParamsContext } from "../../models/context/UiParams/lib";

export type BlogEditorTagSearchTextFieldProps = {
    searchString: string,
    updateSearchString: (str: string) => void,
    width: number,
    height: number,
}

export const BlogEditorTagSearchTextField = ({ props }: { props: BlogEditorTagSearchTextFieldProps }) => {
    const { width, height, searchString, updateSearchString } = props;
    const { FontSize, Palette } = useContext(UiParamsContext);
    const [ inputValue, setInputValue ] = useState(searchString);
    useEffect(() => {
        updateSearchString(inputValue);
    }, [inputValue])

    const boxSx: SxProps<Theme> = {
        width, height,
        borderRadius: 2,
        bgcolor: Palette.Background.Lightest,
        marginBottom: 1
    }
    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setInputValue(e.target.value);
    }
    const iconSize = height / 1.5;
    const textFieldSx: SxProps<Theme> = {
        width: width - height - 15,
        height,
        fontSize: FontSize.Main,
        paddingLeft: 1,
        paddingRight: 1,
    }
    const iconOuterSx: SxProps<Theme> = {
        width: height,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const iconSx: SxProps<Theme> = {
        width: iconSize,
        height: iconSize
    }
    return (
        <Grid container sx={boxSx}>
            <Grid item sx={iconOuterSx}>
                <SearchIcon sx={iconSx} />
            </Grid>
            <Grid item>
                <InputBase 
                    value={inputValue}
                    onChange={handleChange}
                    sx={textFieldSx} />
            </Grid>
        </Grid>
    )
}