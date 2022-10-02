import { Button, SxProps, Theme } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { BlogEditorModeKeyValues, BlogEditorModeType } from "../BlogEditor/type";
import { BlogEditFlowKeyValues } from "../../models/state/BlogEditDetail/type";
import SchemaIcon from '@mui/icons-material/Schema';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import ReorderIcon from '@mui/icons-material/Reorder';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';

export type BlogEditorModeMenuIconButtonProps = {
    height: number,
    width: number,
    modeType: BlogEditorModeType,
    isActive: boolean,
    onClickHandler: () => void,
}


export const BlogEditorModeMenuIconButton = ({ props }: { props: BlogEditorModeMenuIconButtonProps }) => {
    const { height, width, onClickHandler, modeType, isActive } = props;
    const { Palette } = useContext(UiParamsContext);
    const borderColor = isActive ? Palette.FontColor.Light : "transparent";
    const color = isActive ? Palette.Background.Lightest : Palette.Background.Dark;
    const borderLeft = 4;
    const buttonSx: SxProps<Theme> = {
        height, 
        width: width - borderLeft / 2,
        margin: 0,
        padding: 0,
        border: "none",
        minWidth: 0,
        minHeight: 0,
        borderLeft: borderLeft,
        borderColor,
        borderRadius: 0,
        "&:hover": {
            backgroundColor: "transparent"
        },
    }
    const iconSx: SxProps<Theme> = {
        color
    }
    var icon = <></>;
    switch (modeType) {
        case BlogEditorModeKeyValues.Flow:
            icon = <SchemaIcon sx={iconSx} />;
            break;
        case BlogEditorModeKeyValues.Files:
            icon = <ReorderIcon sx={iconSx} />;
            break;
        case BlogEditorModeKeyValues.Component:
            icon = <ViewComfyIcon sx={iconSx} />;
            break;
        case BlogEditorModeKeyValues.Property:
            icon = <SettingsIcon sx={iconSx} />
            break;
    }
    return (
        <Button 
            sx={buttonSx}
            onClick={onClickHandler}
        >
            {icon}
        </Button>
    );
}
