import { Box, Grid, SxProps, Theme, Typography } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../../../../models/context/UiParams/lib";
import { BlogComponentListItemObj } from "../../../../../../models/state/BlogComponent/obj";
import { BlogEditorComponentEditorMainComponentItemProps } from "./type";

export const BlogEditorComponentEditorMainOuterLayout = ({ props, children }: { props: BlogEditorComponentEditorMainComponentItemProps, children: React.ReactNode }) => {
    const { height, activeWidth, paddingLR, paddingTB } = props;
    const { Palette } = useContext(UiParamsContext);
    const width = activeWidth + 2 * paddingLR * 8;
    
    const outerSx: SxProps<Theme> = {
        width, height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: paddingLR,
        paddingRight: paddingTB,
        paddingTop: paddingTB,
        paddingBottom: paddingTB,
        color: Palette.FontColor.Dark,
    }
    return (
        <Grid container sx={outerSx}>
            {children}
        </Grid>
    )
}

export type BlogEditorComponentEditorMainItemLayoutProps = {
    width: number,
    height: number,
    titleHeight: number,
    titleWidth: number,
    BlogComponentItem: BlogComponentListItemObj
}

export const BlogEditorComponentEditorMainItemLayout = ({ props, title, children }: { props: BlogEditorComponentEditorMainItemLayoutProps, title: string, children: React.ReactNode }) => {
    const { width, height, titleHeight, titleWidth, BlogComponentItem } = props;
    const { FontSize, Palette } = useContext(UiParamsContext);
    const containerSx: SxProps<Theme> = {
        position: "relative",
        width, height,
    }
    const titleSx: SxProps<Theme> = {
        position: "absolute",
        width: titleWidth,
        height: titleHeight,
        overflow: "hidden",
        display: "flex",
        justifyContent: "end",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    }
    const paddingLeft = 1.5;
    const contentSx: SxProps<Theme> = {
        position: "absolute",
        left: titleWidth,
        width: width - titleWidth - paddingLeft * 8,
        height: height,
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        paddingLeft,
    }
    return (
        <Box sx={containerSx}>
            <Box sx={titleSx}>
                <Typography fontSize={FontSize.Smaller}>
                    {title}
                </Typography>
            </Box>
            <Box sx={contentSx} color={Palette.Main.Deep}>
                {children}
            </Box>
        </Box>
    );
}