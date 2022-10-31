import { Box, Grid, SxProps, Theme, Typography } from "@mui/material";
import { Context, useContext } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import DefaultButton, { DefaultButtonProps } from "../../../Button/DefaultButton";
import { BlogEditorSubmenuComponentsMapItemProps } from "./type"

export const BlogEditorSubmenuComponentMenu = ({ props }: { props: BlogEditorSubmenuComponentsMapItemProps }) => {
    const { width, height } = props;
    const { Palette, FontSize } = useContext(UiParamsContext);
    const outerSx: SxProps<Theme> = {
        width,
        height: height - 2 * 8,
        overflow: "hidden",
        overflowY: "scroll",
        paddingTop: 1,
        paddingBottom: 1
    }
    const itemHeight = 35;
    const iconRate = 0.35;
    return (
        <Box sx={outerSx}>
            <Grid container>

            </Grid>
        </Box>
    )
}

