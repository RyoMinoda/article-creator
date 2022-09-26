import { Button, SxProps, Theme } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";

export type DefaultButtonProps = {
    sx: SxProps<Theme>,
    onClick: () => void,
    hoverBackgroundColor?: string,
}

const DefaultButton = ({ props, children }: { props: DefaultButtonProps, children: React.ReactNode }) => {
    const { sx, onClick, hoverBackgroundColor } = props;
    const { Palette } = useContext(UiParamsContext);
    const onClickHandler = () => onClick();
    const tHoverBackgroundColor = hoverBackgroundColor === undefined ? "transparent" : hoverBackgroundColor;
    const style: SxProps<Theme> = {
        ...sx,
        textTransform: "none",
        minWidth: 0,
        "&:hover": {
            backgroundColor: tHoverBackgroundColor,
            color: Palette.FontColor.Dark
        },
        "&:active": {
            backgroundColor: Palette.Background.Lighter
        },
    }
    return (
        <Button onClick={onClickHandler} sx={style}>
            {children}
        </Button>
    );
}

export default DefaultButton;