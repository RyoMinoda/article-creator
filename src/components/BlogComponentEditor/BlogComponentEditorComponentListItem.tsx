import { Button, SxProps, Theme } from "@mui/material"
import { useContext } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { BlogComponentObj } from "../../models/state/BlogComponent/obj";

export type BlogComponentEditorComponentListItemProps = {
    width: number,
    height: number,
    component: BlogComponentObj,
    activeComponentIndex: number,
    onClickListItem: (index: number) => void,
}

export const BlogComponentEditorComponentListItem = ({ props }: { props: BlogComponentEditorComponentListItemProps }) => {
    const { width, height, component, activeComponentIndex, onClickListItem } = props;
    const { FontSize, Palette } = useContext(UiParamsContext);
    const isActive = activeComponentIndex == component.getComponentIndex();
    const bgcolor = isActive ? Palette.Background.Light : "transparent";
    const color = isActive ? Palette.FontColor.Main : Palette.FontColor.Darker;
    const hoverColor = isActive ? Palette.Background.Main : Palette.Background.Lighter;
    const buttonSx: SxProps<Theme> = {
        width, height,
        fontSize: FontSize.Main,
        textTransform: "none",
        color,
        bgcolor,
        "&:hover": {
            background: bgcolor
        },
    }
    const onClickHandler = () => onClickListItem(component.getComponentIndex());
    return (
        <Button sx={buttonSx} onClick={onClickHandler}>
            {component.getComponentTypeName()}
        </Button>
    );
}