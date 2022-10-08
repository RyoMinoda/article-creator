import { Box, Grid, Stack } from "@mui/material";
import { CSSProperties, MouseEventHandler, useContext, useEffect, useState } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { MouseActionKeyValues, MouseActionType, MouseModeKeyValues, MousePosition } from "../../models/utils/MousePosition/type";
import { useScreenSize } from "../../models/utils/ScreenSize/func";
import { getIsDisplayForeGround } from "../../utils/ClassName";
import TopMenu from "../TopMenu/TopMenu";

export type LayoutProps = {
    isShowDialog?: boolean,
    hideDialog?: () => void,
    Dialog?: React.ReactElement,
    mousePosition: MousePosition,
    updatePosition: (position: MousePosition) => void
}

const MainLayout = ({ props, children }: { props: LayoutProps, children: React.ReactElement }) => {
    const { isShowDialog, Dialog, hideDialog, updatePosition, mousePosition } = props;
    const { screenHeight, screenWidth } = useScreenSize();
    const { Layout, Palette } = useContext(UiParamsContext);
    const mainHeight = screenHeight - Layout.TopMenuHeight;
    const backgroundId = "popup-background";
    const onMouseDownBackgroundHandler: React.MouseEventHandler<HTMLDivElement> = (e: any) => {
        if (hideDialog != undefined && e.target.id === backgroundId) {
            hideDialog();
        }
    };
    const isDisplayPopup = isShowDialog != undefined && Dialog != undefined && isShowDialog;
    const popup = (
        <Grid container sx={{ position: "absolute", top: 0, left: 0, width: screenWidth, height: screenHeight, overflow: "hidden" }}>
            <Stack position="relative">
                <Box  position="absolute" sx={{ top: 0, left: 0, width: screenWidth, height: screenHeight, bgcolor: "black", opacity: 0.3, zIndex: 100 }}>
                </Box>
                <Box
                    position="absolute"
                    id={backgroundId}
                    onMouseDown={onMouseDownBackgroundHandler}
                    sx={{ top: 0, left: 0, display: "flex", width: screenWidth, height: screenHeight, justifyContent: "center", alignItems: "center", zIndex: 101, opacity: 1.0 }}>
                    {Dialog}
                </Box>
            </Stack>
        </Grid>
    );
    const style: CSSProperties = {
        position: "relative",
        background: "transparent",
        userSelect: mousePosition.id !== "" ? "none" :  "auto"
    }
    const updateMouse = (e: any, action: MouseActionType, id?: string) => {
        var targetId = "";
        if (id !== undefined) {
            targetId = id !== "" ? e.target.id : mousePosition.id;
        }
        const position: MousePosition = {
            x: e.clientX,
            y: e.clientY,
            id: targetId,
            className: e.target.className,
            action,
            mode: mousePosition.mode
        }
        updatePosition(position);
    }
    const onMouseMoveHandler: MouseEventHandler<HTMLDivElement |  MouseEvent> = (e) => {
        if (mousePosition.action == MouseActionKeyValues.MouseDown && mousePosition.id !== "") {
            updateMouse(e, MouseActionKeyValues.DragStart, "");
            return;
        } 
        if (mousePosition.action == MouseActionKeyValues.MouseDown) {
            updateMouse(e, MouseActionKeyValues.DragStart);
            return;
        } 
        if ((mousePosition.action === MouseActionKeyValues.DragStart || mousePosition.action === MouseActionKeyValues.DragMove) && mousePosition.id !== "") {
            updateMouse(e, MouseActionKeyValues.DragMove, "");
            return;
        }
        if (mousePosition.action === MouseActionKeyValues.DragStart || mousePosition.action === MouseActionKeyValues.DragMove) {
            updateMouse(e, MouseActionKeyValues.DragMove);
            return;
        }
        if (mousePosition.id !== "") {
            updateMouse(e, MouseActionKeyValues.MouseMove, "");
            return;
        }
        updateMouse(e, MouseActionKeyValues.MouseMove)
    }
    const onMouseDownHandler: MouseEventHandler<HTMLDivElement> = (e) => {
        updateMouse(e, MouseActionKeyValues.MouseDown, "id");
    }
    const onMOuseUpHandler: MouseEventHandler<HTMLDivElement> = (e) => {
        if (mousePosition.action === MouseActionKeyValues.DragStart || mousePosition.action === MouseActionKeyValues.DragMove) {
            updateMouse(e, MouseActionKeyValues.DragEnd);
            return;
        }
        updateMouse(e, MouseActionKeyValues.MouseUp);
    }
    const isDragMode = 
        (mousePosition.action === MouseActionKeyValues.DragStart ||  mousePosition.action === MouseActionKeyValues.DragMove) 
        && getIsDisplayForeGround(mousePosition.className) 
        && mousePosition.id !== "";
    const dragBoxDisplay = isDragMode ? "inherit" : "none";
    return (
        <div 
            style={style} 
            onMouseMove={onMouseMoveHandler}
            onMouseDown={onMouseDownHandler}
            onMouseUp={onMOuseUpHandler}
            >
            <Grid container sx={{ position: "absolute", top: 0, left: 0, height: screenHeight, width: screenWidth }}>
                <Grid item sx={{ height: Layout.TopMenuHeight, width: screenWidth, background: Palette.Main.Vivid }}>
                    <TopMenu />
                </Grid>
                <Grid item sx={{ height: mainHeight, width: screenWidth, background: Palette.Background.Light, overflowY: "auto", overflowX: "hidden" }}>
                    {children}
                </Grid>
            </Grid>
            {isDisplayPopup ? popup : <></>}
            <div 
                className={mousePosition.className}
                onMouseMove={onMouseMoveHandler}
                onMouseDown={onMouseDownHandler}
                onMouseUp={onMOuseUpHandler}
                style={{ position: "absolute", zIndex: 120, top: 0, left: 0, height: screenHeight, width: screenWidth, display: dragBoxDisplay }}
            >
            </div>
        </div>
    );
}

export default MainLayout;