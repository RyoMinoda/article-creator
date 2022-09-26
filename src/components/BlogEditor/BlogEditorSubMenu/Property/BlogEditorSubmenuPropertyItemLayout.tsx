import { Grid, SxProps, Theme, Typography } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";

export type BlogEditorSubmenuPropertyItemLayoutProps = {
    type: string,
    width: number,
    titleHeight: number,
    contentHeight: number,
    emptyHeight: number,
}

export const BlogEditorSubmenuPropertyItemLayout = ({ props, children }: { props: BlogEditorSubmenuPropertyItemLayoutProps, children: React.ReactNode }) => {
    const { type, width, titleHeight, contentHeight, emptyHeight } = props;
    const { FontSize, Palette } = useContext(UiParamsContext);
    const containerSx: SxProps<Theme> = {
        width
    }
    const tileSx: SxProps<Theme> = {
        width, height: titleHeight,
        display: "flex",
        alignItems: "center",
        paddingLeft: 1
    }
    const contentSx: SxProps<Theme> = {
        width, height: contentHeight,
        display: "flex",
    }
    const emptySx: SxProps<Theme> = {
        width, height: emptyHeight
    }
    return (
        <Grid container sx={containerSx}>
            <Grid item sx={emptySx}></Grid>
            <Grid item sx={tileSx}>
                <Typography fontSize={FontSize.Small} color={Palette.FontColor.Dark}>
                    {type}
                </Typography>
            </Grid>
            <Grid item sx={contentSx}>
                {children}
            </Grid>
            <Grid item sx={emptySx}></Grid>
        </Grid>
    );
}