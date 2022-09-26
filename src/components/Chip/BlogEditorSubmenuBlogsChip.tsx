import { Box, Chip, SxProps, Theme } from "@mui/material"
import { useContext } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";

export type BlogEditorSubmenuBlogsChipProps = {
    width: number,
    height: number,
    text: string,
    deleteChip: () => void,
    avatar: React.ReactElement<any, string | React.JSXElementConstructor<any>>
}

export const BlogEditorSubmenuBlogsChip = ({ props }: { props: BlogEditorSubmenuBlogsChipProps }) => {
    const { width, height, text, deleteChip, avatar } = props;
    const { Palette } = useContext(UiParamsContext);
    const handleDelete = () => {
        deleteChip();
    } 
    const containerSx: SxProps<Theme> = {
        width: width - 2 * 8 * 2, 
        height,
        paddingLeft: 2
    }
    const chipSx: SxProps<Theme> = {
        color: Palette.Main.Deep,
        height,
        minHeight: 0,
    }
    return (
        <Box sx={containerSx}>
            <Chip
                avatar={avatar}
                label={text}
                sx={chipSx}
                onDelete={handleDelete}
            />
        </Box>
    )
}   