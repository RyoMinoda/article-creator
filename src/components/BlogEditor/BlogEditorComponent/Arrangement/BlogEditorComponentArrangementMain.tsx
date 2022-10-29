import { Box, Grid, Paper, Skeleton, Stack, SxProps, Theme } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { BlogObj } from "../../../../models/state/Blog/obj";
import { BlogComponentListItemObj, BlogComponentListObj } from "../../../../models/state/BlogComponent/obj";
import { BlogPageListObj, BlogPageObj } from "../../../../models/state/BlogPage/obj";
import { MouseActionKeyValues, MousePosition } from "../../../../models/utils/MousePosition/type";
import { Position } from "../../../../models/utils/Position/obj";
import { Span } from "../../../../models/utils/Span/obj";
import { BlogEditorDialogKeyValues, BlogEditorDialogType } from "../../../../organizations/BlogEditor/type";
import { StorageOperationKeyValues, StorageOperationType } from "../../../../utils/StorageOperation";
import { BlogEditorComponentArrangementMainComponents, BlogEditorComponentArrangementMainComponentsProps } from "./BlogEditorComponentArrangementMainComponents";
import { BlogEditorComponentArrangementMainForeground, BlogEditorComponentArrangementMainForegroundProps } from "./BlogEditorComponentArrangementMainForeground";

export type BlogEditorComponentArrangementMainProps = {
    width: number,
    height: number,
    Blog: BlogObj,
    isActiveArrangementBackground: boolean,
    activeBlogComponentId: string,
    mousePosition: MousePosition,
    BlogComponentList: BlogComponentListObj,
    BlogPage: BlogPageObj,
    currentPage: number,
    showDialog: (type: BlogEditorDialogType) => void,
    updateBlogComponentList: (componentItem: BlogComponentListItemObj, operation: StorageOperationType) => void,
}

export const BlogEditorComponentArrangementMain = ({ props }: { props: BlogEditorComponentArrangementMainProps }) => {
    const { 
        width, height, Blog, isActiveArrangementBackground, activeBlogComponentId, BlogPage, currentPage,
        mousePosition, BlogComponentList, updateBlogComponentList, showDialog
    } = props;
    const [ span, setSpan ] = useState(Span.getUndefined());
    const [ startPosition, setStartPosition ] = useState(Position.getUndefined());
    const [ endPosition, setEndPosition ] = useState(Position.getUndefined());

    useEffect(() => {
        if (mousePosition.action === MouseActionKeyValues.DragEnd || mousePosition.action === MouseActionKeyValues.MouseUp) {
            setSpan(Span.getUndefined());
            setStartPosition(Position.getUndefined());
            setEndPosition(Position.getUndefined());
        }
    }, [mousePosition.action]);
    const outerSx: SxProps<Theme> = {
        width, height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const paperSx: SxProps<Theme> = {
        width: width - 10,
        height: height - 10,
        overflow: "scroll",
        borderRadius: 1
    }
    const stackBoxSx: SxProps<Theme> = {
        position: "absolute",
        left: 0,
        top: 0,
        width,
        height,
    }
    const updateStartPosition = (x: number, y: number) => {
        setStartPosition(new Position(x, y));
    }
    const updateSpan = (x: number, y: number) => {
        if (Position.getIsUndefined(startPosition)) return;
        const spanX = x - startPosition.X;
        const spanY = y - startPosition.Y;
        setSpan(new Span(spanX, spanY));
    }
    const updateEndPosition = (x: number, y: number) => {
        setEndPosition(new Position(x, y));
        const item = BlogComponentList.find(activeBlogComponentId);
        if (item !== null) {
            item.Position = startPosition;
            item.Span = span;
            updateBlogComponentList(item, StorageOperationKeyValues.Update);
        }
        showDialog(BlogEditorDialogKeyValues.ArticleEditor);
        
    }
    const foregroundProps: BlogEditorComponentArrangementMainForegroundProps = {
        ...props,
        width, height, startPosition,
        span, updateSpan, updateStartPosition, updateEndPosition,
        endPosition
    }
    const componentsProps: BlogEditorComponentArrangementMainComponentsProps = {
        ...props,
        BlogPage: BlogPage
    }
    const backComponent = isActiveArrangementBackground ? (
        <Stack position="relative">
            <BlogEditorComponentArrangementMainComponents props={componentsProps} />
            <BlogEditorComponentArrangementMainForeground props={foregroundProps} />
        </Stack>
    ) : <Skeleton sx={stackBoxSx} variant="rounded" />;
    return (
        <Box sx={outerSx}>
            <Paper sx={paperSx}>
                {backComponent}
            </Paper>
        </Box>
    )
}