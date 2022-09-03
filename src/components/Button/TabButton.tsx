import { Button, SxProps, Theme } from "@mui/material"
import { useContext } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";

export type TabButtonProps = {
    height: number,
    width: number,
    text: string,
    bgcolor: string,
    color: string,
    hoverBgColor: string, 
    activeBgColor: string,
    onClickHandler: () => void,
}

export const TabButton = ({ props }: { props: TabButtonProps }) => {
    const { Palette } = useContext(UiParamsContext);
    const { width, height, text, bgcolor, hoverBgColor, activeBgColor, onClickHandler, color } = props;
    const sx: SxProps<Theme> = {
        width,
        height,
        bgcolor,
        color,
        textTransform: "none",
        "&:hover": {
            backgroundColor: hoverBgColor == undefined ? bgcolor : hoverBgColor,
        },
        "&:active": {
            backgroundColor: activeBgColor == undefined ? bgcolor : activeBgColor,
        },
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    }
    const onClick = () => onClickHandler();
    return (
        <Button sx={sx} onClick={onClick}>
            {text}
        </Button>
    );
}