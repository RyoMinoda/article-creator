import { Grid, SxProps, Theme } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';
import DoneIcon from '@mui/icons-material/Done';
import DefaultButton, { DefaultButtonProps } from "../../Button/DefaultButton";
import { useContext } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { BlogEditorDialogKeyValues, BlogEditorDialogType } from "../../../organizations/BlogEditor/type";

export type BlogEditorTopButtonGroupProps = {
    width: number,
    height: number,
    showDialog: (type: BlogEditorDialogType) => void,
    save: () => void,
}

export const BlogEditorTopButtonGroup = ({ props }: { props: BlogEditorTopButtonGroupProps }) => {
    const { height, width, showDialog, save } = props;
    const { Palette } = useContext(UiParamsContext);
    const buttonCount = 3;
    const buttonWidth = width / buttonCount;
    const buttonHeightConst = height * 0.8;
    const buttonHeight = buttonHeightConst < buttonWidth ? buttonHeightConst : buttonWidth;
    const containerSx: SxProps<Theme> = {
        width: width,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const itemSx:  SxProps<Theme> = {
        width: buttonWidth,
        height: buttonHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
    const viewButtonProps: DefaultButtonProps = {
        sx: {
            width: buttonWidth,
            height: buttonHeight,
            margin: 0,
            padding: 0,
            minWidth: 0
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
                <DefaultButton props={{ ...viewButtonProps, onClick: () => showDialog(BlogEditorDialogKeyValues.Preview) }}>
                    <VisibilityIcon sx={iconSx} />
                </DefaultButton>
            </Grid>
            <Grid item sx={itemSx}>
                <DefaultButton props={{ ...viewButtonProps, onClick: save }}>
                    <SaveIcon sx={iconSx} />
                </DefaultButton>
            </Grid>
            <Grid item sx={itemSx}>
                <DefaultButton props={{ ...viewButtonProps, onClick: save }}>
                    <DoneIcon sx={iconSx} />
                </DefaultButton>
            </Grid>
        </Grid>
    );
}