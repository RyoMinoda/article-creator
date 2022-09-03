import { Button, Grid, SxProps, Theme, Typography } from "@mui/material"
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
    const buttonSx: SxProps<Theme> = {
        width, height,
        textTransform: "none",
        color,
        bgcolor,
        "&:hover": {
            background: bgcolor
        },
    }
    const containerSx: SxProps<Theme> = {
        width, height
    }
    const typeHeight = height * 0.2;
    const titleHeight = height - typeHeight;
    const paddingSide = 1;
    const innerWidth = width - 2 * paddingSide * 8;
    const componentTypeSx: SxProps<Theme> = {
        width: innerWidth, 
        height: typeHeight, 
        display: "flex",
        paddingLeft: paddingSide,
    }
    const componentTypeTypo: SxProps<Theme> = {
        fontSize: FontSize.Small
    }
    const componentTitleSx: SxProps<Theme> = {
        width, height: titleHeight,
    }
    const componentTitleTypo: SxProps<Theme> = {
        fontSize: FontSize.Main
    }
    const onClickHandler = () => onClickListItem(component.getComponentIndex());
    return (
        <Button sx={buttonSx} onClick={onClickHandler}>
            <Grid container sx={containerSx}>
                <Grid item sx={componentTypeSx}>
                    <Typography sx={componentTypeTypo}>
                        {component.getComponentTypeName()}
                    </Typography>
                </Grid>
                <Grid item sx={componentTitleSx}>
                    <Typography sx={componentTitleTypo}>
                        {component.ComponentTitle}
                    </Typography>
                </Grid>
            </Grid>
        </Button>
    );
}