import { Box, Button, SxProps, Theme } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";

export type BlogEditorSubmenuBlogItemButtonProps = {
    width: number,
    height: number,
    title: string,
    isActive: boolean,
}

export const BlogEditorSubmenuBlogItemButton = ({ props }: { props: BlogEditorSubmenuBlogItemButtonProps }) => {
    const { width, height, title, isActive } = props;
    const { Palette } = useContext(UiParamsContext);
    const color = isActive ? Palette.Main.Deep : Palette.FontColor.Dark;
    const fontWeight = isActive ? "600" : "500";
    const buttonSx: SxProps<Theme> = {
        width, height,
        minWidth: 0, minHeight: 0,
        padding: 0,
        paddingLeft: 2,
        textTransform: "none",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        color, fontWeight,
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        "&:hover": {
            backgroundColor: Palette.Background.Light,
            color: Palette.FontColor.Dark
        },
        "&:active": {
            backgroundColor: Palette.Background.Lighter
        },
    }
    const onClickHandler = () => {

    }
    return (
        <Button sx={buttonSx} onClick={onClickHandler}>
            {title}
        </Button>
    );
}