import { Grid, SxProps, Theme } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';
import DefaultButton, { DefaultButtonProps } from "../Button/DefaultButton";
import { useContext } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";

export type BlogEditorTopButtonGroupProps = {
    width: number,
    height: number,
    preview: () => void,
    save: () => void,
}

export const BlogEditorTopButtonGroup = ({ props }: { props: BlogEditorTopButtonGroupProps }) => {
    const { height, width, preview, save } = props;
    const { Layout, Palette } = useContext(UiParamsContext);
    const sideMargin = 2;
    const innerWidth = width - 2 * sideMargin * 8;
    const buttonHeight = height * 0.8;
    const containerSx: SxProps<Theme> = {
        width: innerWidth,
        marginLeft: sideMargin,
    }
    const itemSx:  SxProps<Theme> = {
        width: innerWidth / 2,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 1
    }
    const viewButtonProps: DefaultButtonProps = {
        sx: {
            width: innerWidth / 2,
            height: buttonHeight,
        },
        onClick: () => {

        }
    };
    const iconSx: SxProps<Theme> = {
        color: Palette.Main.Vivid
    }
    return (
        <Grid container sx={containerSx}>
            <Grid item sx={itemSx}>
                <DefaultButton props={{ ...viewButtonProps, onClick: () => preview() }}>
                    <VisibilityIcon sx={iconSx} />
                </DefaultButton>
            </Grid>
            <Grid item sx={itemSx}>
                <DefaultButton props={{ ...viewButtonProps, onClick: save }}>
                    <SaveIcon sx={iconSx} />
                </DefaultButton>
            </Grid>
        </Grid>
    );
}