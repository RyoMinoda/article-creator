import { Box, Grid, SxProps, Theme, Typography } from "@mui/material";
import { Context, useContext } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { GetSubmenuComponentItemIcon } from "../../../../models/state/BlogComponent/components";
import { BlogComponentKeyValues } from "../../../../models/state/BlogComponent/type";
import DefaultButton, { DefaultButtonProps } from "../../../Button/DefaultButton";
import { BlogEditorSubmenuComponentsMapItemProps } from "./type"

export const BlogEditorSubmenuComponentCreate = ({ props }: { props: BlogEditorSubmenuComponentsMapItemProps }) => {
    const { width, height, createBlogEmptyComponent } = props;
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
                {Object.values(BlogComponentKeyValues).map((x) => {
                    const rate = Math.ceil(width / 280);
                    const buttonWidth = width / rate;
                    const padding = 1;
                    const buttonInnerWidth = buttonWidth - 2 * padding * 8;
                    const boxSx: SxProps<Theme> = {
                        width: buttonWidth,
                        height: itemHeight,
                        paddingLeft: 0.5
                    }
                    const buttonProps: DefaultButtonProps = {
                        sx: { 
                            width: buttonWidth,
                            height: itemHeight,
                            paddingLeft: padding,
                            paddingRight: padding,
                            color: Palette.FontColor.Dark,
                        },
                        onClick: () => createBlogEmptyComponent(x),
                        hoverBackgroundColor: Palette.Background.Lightest
                    }
                    const iconItemSx: SxProps<Theme> = {
                        width: buttonInnerWidth * iconRate,
                        height: itemHeight,
                        display: "flex", justifyContent: "center", alignItems: "center"
                    }
                    const textItemSx: SxProps<Theme> = {
                        width: buttonInnerWidth * (1 - iconRate),
                        height: itemHeight,
                        display: "flex", justifyContent: "start", alignItems: "center"
                    }
                    const iconSx: SxProps<Theme> = {

                    }
                    const icon = GetSubmenuComponentItemIcon(x, iconSx);
                    return (
                        <Grid item sx={boxSx} key={x}>
                            <DefaultButton props={buttonProps}>
                                <Grid container>
                                    <Grid item sx={iconItemSx}>{icon}</Grid>
                                    <Grid item sx={textItemSx}>
                                        <Typography fontSize={FontSize.Small}>
                                            {x}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </DefaultButton>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    )
}

