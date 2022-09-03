import { Box, Grid, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { useScreenSize } from "../../models/utils/ScreenSize";
import TopMenu from "../TopMenu/TopMenu";

export type LayoutProps = {
    isShowPopup?: boolean,
    hidePopup?: () => void,
    Popup?: React.ReactElement
}

const MainLayout = ({ props, children }: { props: LayoutProps, children: React.ReactElement }) => {
    const { isShowPopup, Popup, hidePopup } = props;
    const { screenHeight, screenWidth } = useScreenSize();
    const { Layout, Palette } = useContext(UiParamsContext);
    const mainHeight = screenHeight - Layout.TopMenuHeight;
    const backgroundId = "popup-background";
    const onMouseDownHandler: React.MouseEventHandler<HTMLDivElement> = (e: any) => {
        if (hidePopup != undefined && e.target.id === backgroundId) {
            hidePopup();
        }
    };
    const isDisplayPopup = isShowPopup != undefined && Popup != undefined && isShowPopup;
    const popup = (
        <Grid container sx={{ position: "absolute", top: 0, left: 0 }}>
            <Stack position="relative">
                <Box  position="absolute" sx={{ top: 0, left: 0, width: screenWidth, height: screenHeight, bgcolor: "black", opacity: 0.3 }}>
                </Box>
                <Box
                    position="absolute"
                    id={backgroundId}
                    onMouseDown={onMouseDownHandler}
                    sx={{ display: "flex", width: screenWidth, height: screenHeight, justifyContent: "center", alignItems: "center" }}>
                    {Popup}
                </Box>
            </Stack>
        </Grid>
    );
    
    return (
        <Stack position="relative">
            <Grid container sx={{ position: "absolute", top: 0, left: 0, height: screenHeight, width: screenWidth }} >
                <Grid item sx={{ height: Layout.TopMenuHeight, width: screenWidth, background: Palette.Main.Vivid }}>
                    <TopMenu />
                </Grid>
                <Grid item sx={{ height: mainHeight, width: screenWidth, background: Palette.Background.Main, overflowY: "auto", overflowX: "hidden" }}>
                    {children}
                </Grid>
            </Grid>
            {isDisplayPopup ? popup : <></>}
        </Stack>
    );
}

export default MainLayout;