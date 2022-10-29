import { Box, Stack, SxProps, Theme } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { MouseActionKeyValues } from "../../../models/utils/MousePosition/type";
import { useScreenSize } from "../../../models/utils/ScreenSize/func";
import { ClassNameKeyValues, getIsMouseIncludeClassName } from "../../../utils/ClassName";
import { BlogEditorMainComponentProps } from "../type";
import { BlogEditorComponentArrangement, BlogEditorComponentArrangementProps } from "./Arrangement/BlogEditorComponentArrangement";

export const BlogEditorComponent = ({ props }: { props: BlogEditorMainComponentProps }) => {
    const { width, height, mousePosition, BlogPageList, currentPage } = props;
    const [ canUpdateComponentWindowWidth, setCanUpdateComponentWindowWidth ] = useState(false);
    const [ isPositionMode, setIsPositionMode ] = useState(false);

    useLayoutEffect(() => {
        if (mousePosition.action === MouseActionKeyValues.MouseUp || mousePosition.action === MouseActionKeyValues.DragEnd) {
            setCanUpdateComponentWindowWidth(false);
            setIsPositionMode(false);
            return;
        }
        const isReleaseMode = !getIsMouseIncludeClassName(mousePosition, ClassNameKeyValues.componentEditorPanel) && mousePosition.action === MouseActionKeyValues.MouseDown;
        if (isReleaseMode) {
            setIsPositionMode(false);
        }
    }, [mousePosition])

    const updateIsPositionMode = (bool: boolean) => {
        setIsPositionMode(bool);
    }
    const page = BlogPageList.findPage(currentPage);
    if (page === null) return <></>
    const outerSx: SxProps<Theme> = {
        width, height,
        overflow: "hidden",
        overflowY: "scroll"
    }
    const mainSx: SxProps<Theme> = {
        position: "absolute",
        width,
        height,
    }
    const arrangementSx: SxProps<Theme> = {
        position: "absolute",
        width,
        height,
    }
    const arrangementProps: BlogEditorComponentArrangementProps = {
        ...props,
        width, canUpdateComponentWindowWidth,
        height, 
        updateIsPositionMode,
        isPositionMode,
        BlogPage: page,
    }
    return (
        <Box sx={outerSx}>
            <Stack position="relative">
                <Box sx={mainSx}>
                    
                </Box>
                <Box sx={arrangementSx}>
                    <BlogEditorComponentArrangement props={arrangementProps} />
                </Box>
            </Stack>
        </Box>
    );
}