import { Box, Grid, SxProps, Theme, Tooltip, Typography } from "@mui/material"
import { useContext } from "react";
import { UiParamsContext } from "../../../../../models/context/UiParams/lib";
import DefaultButton, { DefaultButtonProps } from "../../../../Button/DefaultButton";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { BlogEditorComponentEditorComponentItemMeta } from "../type";
import { GetSubmenuComponentItemIcon } from "../../../../../models/state/BlogComponent/components";
import { BlogComponentListItemObj } from "../../../../../models/state/BlogComponent/obj";
import { BlogComponentListItem } from "../../../../../models/state/BlogComponent/type";
import { Size } from "../../../../../models/utils/Size/type";

export type BlogEditorComponentEditorMainLayoutProps = {
    width: number,
    height: number,
    menuHeight: number,
    paddingLR: number,
    paddingTB: number,
    componentMeta: BlogEditorComponentEditorComponentItemMeta
    component: BlogComponentListItemObj, 
    activeComponentId: string,
    updateActiveBlogComponentId: (id: string) => void,
    updateComponentMeta: (componentMeta: BlogEditorComponentEditorComponentItemMeta) => void
}

export const BlogEditorComponentEditorMainLayout = ({ props, children }: { props: BlogEditorComponentEditorMainLayoutProps, children: React.ReactNode }) => {
    const { width, height, activeComponentId, componentMeta, updateComponentMeta,
        component, menuHeight, paddingTB, paddingLR, updateActiveBlogComponentId } = props;
    const { Palette, FontSize } = useContext(UiParamsContext);
    const outerSx: SxProps<Theme> = {
        width,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "height 0.1s ease-in-out",
    }
    const innerWidth = width - 2 * 8 * paddingLR;
    const innerHeight = height - 2 * 8 * paddingTB;
    const mainBgcolor = activeComponentId === component.Id ? Palette.Background.Lightest : Palette.FontColor.MuchLighter;
    const innerSx: SxProps<Theme> = {
        width: innerWidth,
        height: innerHeight,
        bgcolor: mainBgcolor,
        borderRadius: 1,
        position: "relative",
        overflow: "hidden"
    }
    const paddingLeft = 1;
    const top = 5;
    const iconPadding = 0.2;
    const iconButtonSize = menuHeight - top * 2;
    const iconSize = iconButtonSize - iconPadding * 8 * 2;
    const iconsWidth = iconButtonSize + 10;
    var topMenuBgcolor = "";
    if (activeComponentId === component.Id)  {
        topMenuBgcolor = Palette.Background.Main;
    } else {
        topMenuBgcolor = Palette.FontColor.Lighter;
    }
    const topMenuSx: SxProps<Theme> = {
        width: innerWidth,
        height: menuHeight,
        bgcolor: topMenuBgcolor
    }
    const titleSx: SxProps<Theme> = {
        position: "absolute",
        left: paddingLeft * 8,
        top,
        width: width * 0.5,
        height: menuHeight - top,
        color: Palette.FontColor.Darker,
    }
    const iconsSx: SxProps<Theme> = {
        position: "absolute",
        width: iconsWidth,
        height: menuHeight - top,
        left: innerWidth - iconsWidth - 5,
    }
    const buttonSx: SxProps<Theme> = {
        width: iconButtonSize,
        height: iconButtonSize,
        margin: 0,
        marginLeft: paddingLeft / 2,
        padding: 0,
        color: Palette.FontColor.Main,
    }
    const buttonProps: DefaultButtonProps = {
        sx: buttonSx,
        onClick: () => {
            componentMeta.isHidden = true;
            updateComponentMeta(componentMeta);
        },
        hoverColor: Palette.Main.Dark
    }
    const iconSx: SxProps<Theme> = {
        width: iconSize,
        height: iconSize
    }
    const headIconSx: SxProps<Theme> = {
        width:  iconButtonSize,
        height:  iconButtonSize,
    }
    const iconTitleSx: SxProps<Theme> = {
        height:  iconButtonSize,
        width: width * 0.5 -  iconButtonSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        paddingLeft: 2
    }
    const childrenSx: SxProps<Theme> = {
        top: menuHeight,
        height: innerHeight - menuHeight - top,
        width: innerWidth,
    }
    const Icon = GetSubmenuComponentItemIcon(component.ComponentType, headIconSx);
    return (
        <Grid item sx={outerSx}>
            <div onClick={() => updateActiveBlogComponentId(component.Id)}>
                <Grid container sx={innerSx}>
                    <Grid item sx={topMenuSx}>
                        <Grid container sx={titleSx}>
                            <Grid item sx={headIconSx}>
                                {Icon}
                            </Grid>
                            <Grid item sx={iconTitleSx}>
                                <Typography fontSize={FontSize.Small} color={Palette.FontColor.Darker} fontWeight="bold">
                                    {component.ComponentType}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container sx={iconsSx}>
                            <Grid item>
                                <DefaultButton props={buttonProps}>
                                    <Tooltip title="Close" placement="top">
                                        <CloseIcon sx={iconSx} />
                                    </Tooltip>
                                </DefaultButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sx={childrenSx}>
                        {children}
                    </Grid>
                </Grid>
            </div>
        </Grid>
    )
}