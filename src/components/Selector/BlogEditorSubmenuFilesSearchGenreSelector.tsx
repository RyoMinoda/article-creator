import { Box, FormControl, MenuItem, Select, SelectChangeEvent, SxProps, Theme } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { BlogTagListObj } from "../../models/state/BlogTag/obj";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { BlogEditorSubmenuSearchGenreKeyValues, BlogEditorSubmenuSearchGenreType } from "../BlogEditor/BlogEditorSubmenu/types";

export type BlogEditorSubmenuFilesSearchGenreSelectorProps = {
    width: number,
    height: number,
    activeSearchGenre: BlogEditorSubmenuSearchGenreType,
    updateActiveSearchGenre: (searchGenre: BlogEditorSubmenuSearchGenreType) => void,
}

export const BlogEditorSubmenuFilesSearchGenreSelector = ({ props }: { props: BlogEditorSubmenuFilesSearchGenreSelectorProps }) => {
    const { width, height, activeSearchGenre, updateActiveSearchGenre } = props;
    const { FontSize, Palette } = useContext(UiParamsContext);
    const handler = (e: SelectChangeEvent<"Title" | "Tag" | "Article">) => {
        const target = (e.target.value as BlogEditorSubmenuSearchGenreType);
        updateActiveSearchGenre(target);
    }
    const fontSize = FontSize.Small;
    const sx: SxProps<Theme> = {
        width: width - 20, 
        height,
        minHeight: 0,
        minWidth: 0,
        fontSize,
        color: Palette.FontColor.Dark,

    }
    const searchGenres = Object.values(BlogEditorSubmenuSearchGenreKeyValues).map(x => x);
    const menuItemSx: SxProps<Theme> = {
        height, fontSize: FontSize.Smaller
    }
    return (
        <FormControl sx={{ width, height }}>
            <Select
                id="blog-editor-Submenu-files-search-selector"
                value={activeSearchGenre}
                onChange={handler}
                sx={sx}
                inputProps={{
                    sx: {
                        paddingLeft: 3
                    }
                }}
                IconComponent={() => <></>}
                variant="standard"
                disableUnderline
                displayEmpty
            >
                {searchGenres.map((name, i) => (
                    <MenuItem value={name} key={i} sx={menuItemSx}>{name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}