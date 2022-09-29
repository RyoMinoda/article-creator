import { Grid, SxProps, Theme, Typography } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { BlogEditorDialogKeyValues, BlogEditorDialogType } from "../../../../organizations/BlogEditor/type";
import DefaultButton, { DefaultButtonProps } from "../../../Button/DefaultButton";
import { BlogEditorSubmenuPropertyItemKeyValues } from "./type";
import AddIcon from '@mui/icons-material/Add';

export type BlogEditorSubmenuPropertyItemLayoutProps = {
    type: string,
    width: number,
    titleHeight: number,
    contentHeight: number,
    emptyHeight: number,
    showDialog: (type: BlogEditorDialogType) => void,
}

export const BlogEditorSubmenuPropertyItemLayout = ({ props, children }: { props: BlogEditorSubmenuPropertyItemLayoutProps, children: React.ReactNode }) => {
    const { type, width, titleHeight, contentHeight, emptyHeight, showDialog } = props;
    const { FontSize, Palette } = useContext(UiParamsContext);
    const containerSx: SxProps<Theme> = {
        width
    }
    const tileOuterSx: SxProps<Theme> = {
        width, height: titleHeight,
        display: "flex",
        alignItems: "center",
        paddingLeft: 1,
        overflow: "hidden"
    }
    const titleInnerSx: SxProps<Theme> = {
        width: width * 0.8, height: titleHeight,
    }
    const contentSx: SxProps<Theme> = {
        width, height: contentHeight,
        display: "flex",
    }
    const emptySx: SxProps<Theme> = {
        width, height: emptyHeight
    }
    var component = (
        <Grid container sx={tileOuterSx}>
            <Typography fontSize={FontSize.Small} color={Palette.FontColor.Dark}>
                {type}
            </Typography>
        </Grid>
    );
    switch (type) {
        case BlogEditorSubmenuPropertyItemKeyValues.Tags:
            const iconSize = titleHeight;
            const showEditTagDialogProps: DefaultButtonProps = {
                sx: {
                    width: iconSize, height: iconSize,
                    margin: 0, padding: 0,
                },
                onClick: () => showDialog(BlogEditorDialogKeyValues.Tags)
            }
            component = (
                <Grid container sx={tileOuterSx}>
                    <Grid item sx={{ ...titleInnerSx, width: width * 0.9 - iconSize }}>
                        <Typography fontSize={FontSize.Small} color={Palette.FontColor.Dark}>
                            {type}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <DefaultButton props={showEditTagDialogProps}>
                            <AddIcon />
                        </DefaultButton>
                    </Grid>
                </Grid>
            );
            break;
    }
    return (
        <Grid container sx={containerSx}>
            <Grid item sx={emptySx}></Grid>
            <Grid item sx={tileOuterSx}>
                {component}
            </Grid>
            <Grid item sx={contentSx}>
                {children}
            </Grid>
            <Grid item sx={emptySx}></Grid>
        </Grid>
    );
}