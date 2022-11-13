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
    activeBlogComponentId: string,
    mousePosition: MousePosition,
    BlogComponentList: BlogComponentListObj,
    BlogPage: BlogPageObj,
    showDialog: (type: BlogEditorDialogType) => void,
    updateBlogComponent: (componentItem: BlogComponentListItemObj, operation: StorageOperationType) => void,
    updateBlogComponentList: (componentItem: BlogComponentListItemObj, operation: StorageOperationType) => void,
}

export const BlogEditorComponentArrangementMain = ({ props }: { props: BlogEditorComponentArrangementMainProps }) => {
    const { 
        width, height, Blog, activeBlogComponentId, BlogPage, updateBlogComponent,
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
        overflow: "scroll",
    }
    const paperSx: SxProps<Theme> = {
        width: BlogPage.PageWidth,
        height: BlogPage.PageHeight,
        borderRadius: 1,
        marginTop: 1,
        marginBottom: 1,
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
        const spanX = x - startPosition.X;
        const spanY = y - startPosition.Y;
        const item = BlogComponentList.find(activeBlogComponentId);
        if (item !== null) {
            updateBlogComponent(item, StorageOperationKeyValues.Update);
        } else {
            const newItem = BlogComponentListItemObj.create();
            newItem.Position = startPosition;
            newItem.Span = new Span(spanX, spanY);
            updateBlogComponent(newItem, StorageOperationKeyValues.Update);
        }
        showDialog(BlogEditorDialogKeyValues.ArticleEditor);
        
    }
    const foregroundProps: BlogEditorComponentArrangementMainForegroundProps = {
        ...props, 
        startPosition,
        span, updateSpan, updateStartPosition, updateEndPosition,
        endPosition
    }
    const componentsProps: BlogEditorComponentArrangementMainComponentsProps = {
        ...props,
        BlogPage: BlogPage
    }
    return (
        <Box sx={outerSx}>
            <Paper sx={paperSx}>
                <Stack position="relative">
                    <BlogEditorComponentArrangementMainComponents props={componentsProps} />
                    <BlogEditorComponentArrangementMainForeground props={foregroundProps} />
                </Stack>
            </Paper>
        </Box>
    )
}