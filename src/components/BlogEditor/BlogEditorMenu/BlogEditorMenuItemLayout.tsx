import { Grid, SxProps, Theme, Typography } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";

export type BlogEditorMenuItemLayoutProps = {
    width: number,
    height: number,
    title: string,
    splitUp?: boolean,
    Icon?: React.ReactNode
}

export const BlogEditorMenuItemLayout = ({ props, children }: { props: BlogEditorMenuItemLayoutProps, children: React.ReactNode }) => {
    const { width, height, title, splitUp, Icon } = props;
    const { FontSize, Palette, Layout } = useContext(UiParamsContext);
    const color = Palette.FontColor.Main;
    const titleFontSize = FontSize.Small;
    const titleHeight = height * 0.2;
    const contentHeight = height - titleHeight;
    const margin = 2;
    const borderRight = splitUp != undefined && splitUp ? "solid 2px LightGray" : "none";
    const containerSx: SxProps<Theme> = {
        width, height, 
        borderRight, 
        marginLeft: margin,
        overflow: "hidden"
    }
    const titleWidth = Icon == undefined ? width - 2 * margin * 8 : width - 50 - 2 * margin * 8;
    const itemWidth = splitUp != undefined && splitUp ? titleWidth - 2 : titleWidth;
    const titleSx: SxProps<Theme> = {
        width, 
        height: titleHeight, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "start"
    }
    const contentSx: SxProps<Theme> = {
        width,
        height: contentHeight,
        display: "flex", 
        alignItems: "center", 
        justifyContent: "start"
    }
    const iconSx: SxProps<Theme> = {
        display: Icon == undefined ? "none" : "flex",
        width: width - itemWidth - 20,
        height: titleHeight,
        justifyContent: "center", 
        alignItems: "center"
    }
    return (
        <Grid container sx={containerSx}>
            <Grid item sx={titleSx}>
                <Grid container>
                    <Grid item sx={{ width: itemWidth, height: titleHeight, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ fontSize: titleFontSize, color }}>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item sx={iconSx}>
                        {Icon}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sx={contentSx}>
                {children}
            </Grid>
        </Grid>
    );
}