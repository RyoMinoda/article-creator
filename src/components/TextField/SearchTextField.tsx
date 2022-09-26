import { Divider, Grid, IconButton, InputBase, SxProps, TextField, Theme } from "@mui/material";
import { CSSProperties, useContext, useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { UiParamsContext } from "../../models/context/UiParams/lib";

export type SearchTextFieldProps = {
    textInputHeight: number,
    settingHeight: number,
    width: number,
    searchInput: string,
    updateSearchInput: (text: string) => void,
}

export const SearchTextField = ({ props }: { props: SearchTextFieldProps }) => {
    const { textInputHeight, settingHeight, width, searchInput, updateSearchInput } = props;
    const { Palette, FontSize } = useContext(UiParamsContext);
    const [ text, setText ] = useState(searchInput);

    useEffect(() => {
        updateSearchInput(text);
    }, [text])

    const containerSx: SxProps<Theme> = {
        height: textInputHeight + settingHeight,
        width,
    }
    const searchTextInputContainerSx: SxProps<Theme> = {
        height: textInputHeight,
        width,
        display: "flex",
        
    }
    const iconButtonSx: SxProps<Theme> = {
        height: textInputHeight - 4,
        width: textInputHeight - 4,
        bgcolor: Palette.Background.Light,
        border: "none",
        borderRadius: 0,
        padding: 1 / 4
    }
    const textFieldSx: SxProps<Theme> = {
        height: textInputHeight,
        width: width - textInputHeight,
        bgcolor: Palette.Background.Light,
        fontSize: FontSize.Small
    }
    const inputStyle: CSSProperties = {
        paddingLeft: 3,
        paddingRight: 3,
    }
    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setText(e.target.value);
    }
    return (
        <Grid container sx={containerSx}>
            <Grid item sx={searchTextInputContainerSx}>
                <SearchIcon  sx={iconButtonSx} />
                <InputBase
                    sx={textFieldSx}
                    placeholder=""
                    value={searchInput}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': "Search", style: inputStyle }}
                />
            </Grid>
        </Grid>
    );
}