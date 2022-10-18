import { Box, Grid, SxProps, Theme } from "@mui/material";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { MouseActionKeyValues } from "../../../models/utils/MousePosition/type";
import { useScreenSize } from "../../../models/utils/ScreenSize/func";
import { BlogEditorMainComponentProps } from "../type";
import { BlogEditorComponentArrangement, BlogEditorComponentArrangementProps } from "./Arrangement/BlogEditorComponentArrangement";
import { BlogEditorComponentSlideLine, BlogEditorComponentSlideLineProps } from "./BlogEditorComponentSlideLine";
import { BlogEditorComponentEditor, BlogEditorComponentEditorProps } from "./Editor/BlogEditorComponentEditor";
import { BlogEditorComponentEditorMenuKeyValues, BlogEditorComponentEditorMenuType } from "./Editor/type";

export const BlogEditorComponent = ({ props }: { props: BlogEditorMainComponentProps }) => {
    const { width, height, mousePosition, Blog, activeBlogComponentId, updateActiveBlogComponentId } = props;
    const [ mainWidth, setMainWidth ] = useState(width / 2);
    const [ canUpdateComponentWindowWidth, setCanUpdateComponentWindowWidth ] = useState(false);
    const [ menuType, setMenuType ] = useState<BlogEditorComponentEditorMenuType>(BlogEditorComponentEditorMenuKeyValues.Medium);
    const [ isPositionMode, setIsPositionMode ] = useState(false);
    const { screenWidth } = useScreenSize();
    const [ currentPage, setCurrentPage ] = useState(1);

    useEffect(() => {
        setMainWidth(width / 2);
    }, [screenWidth])

    useEffect(() => {
        console.log(mousePosition.id)
    }, [mousePosition.action])

    useLayoutEffect(() => {
        if (mousePosition.action === MouseActionKeyValues.MouseUp || mousePosition.action === MouseActionKeyValues.DragEnd) {
            setCanUpdateComponentWindowWidth(false);
            return;
        }
        const left = mousePosition.x - (screenWidth - width)
        if (canUpdateComponentWindowWidth && left % 15 === 0) {
            setMainWidth(left);
            return;
        }
    }, [mousePosition])

    const updateMainWidth =  () => {
        setCanUpdateComponentWindowWidth(true);
    };
    const updateCurrentPage = (page: number) => {
        setCurrentPage(page);
    }
    const updateIsPositionMode = (bool: boolean) => {
        setIsPositionMode(bool);
    }
    const lineWidth = 4;
    const outerSx: SxProps<Theme> = {
        width, height,
        overflow: "hidden",
        overflowY: "scroll"
    }
    const mainSx: SxProps<Theme> = {
        width: mainWidth,
        height,
    }
    const lineSx: SxProps<Theme> = {
        width: lineWidth,
        height,
        userSelect: "contain"
    }
    const lineProps: BlogEditorComponentSlideLineProps = {
        width: lineWidth,
        height,
        updateMainWidth
    }
    const arrangementWidth = width - mainWidth - lineWidth;
    const arrangementSx: SxProps<Theme> = {
        width: arrangementWidth,
        height,
    }
    const arrangementProps: BlogEditorComponentArrangementProps = {
        ...props,
        width: arrangementWidth, canUpdateComponentWindowWidth,
        height, Blog, currentPage, updateCurrentPage,
        updateIsPositionMode,
        isPositionMode
    }
    const componentEditorProps: BlogEditorComponentEditorProps = {
        ...props,
        width: mainWidth,
        height, menuType,
        activeComponentId: activeBlogComponentId,
        updateMenuType: (menuType: BlogEditorComponentEditorMenuType) => setMenuType(menuType),
        updateActiveBlogComponentId,
        canUpdateComponentWindowWidth,
        isPositionMode,
        updateIsPositionMode
    }
    return (
        <Box sx={outerSx}>
            <Grid container>
                <Grid item sx={mainSx}>
                    <BlogEditorComponentEditor props={componentEditorProps} />
                </Grid>
                <Grid item sx={lineSx}>
                    <BlogEditorComponentSlideLine props={lineProps} />
                </Grid>
                <Grid item sx={arrangementSx}>
                    <BlogEditorComponentArrangement props={arrangementProps} />
                </Grid>
            </Grid>
        </Box>
    );
}