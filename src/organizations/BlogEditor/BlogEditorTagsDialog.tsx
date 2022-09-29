import { Box, Grid, SxProps, Theme } from "@mui/material";
import { useEffect, useState } from "react";
import { DialogLayout, DialogLayoutProps } from "../../components/Layout/DialogLayout";
import { BlogEditorDialogTagList, BlogEditorDialogTagListProps } from "../../components/List/BlogEditorDialogTagList";
import { BlogEditorTagSearchTextField, BlogEditorTagSearchTextFieldProps } from "../../components/TextField/BlogEditorTagSearchTextField";
import { defaultSize } from "../../models/utils/Size/lib";
import { Size } from "../../models/utils/Size/type";
import { BlogEditorDialogProps } from "./type";

export const BlogEditorTagsDialog = ({ props }: { props: BlogEditorDialogProps }) => {
    const {  hideDialog, color, updateBlog, Blog, blogPropertyType, BlogTagList, showDialog } = props;
    const [ searchString, setSearchString ] = useState("");
    const [ dialogSize, setDialogSize ] = useState(defaultSize);

    const minHeight = 500;
    const minWidth = 340;
    const dialogProps: DialogLayoutProps = {
        minWidth,
        width: 400,
        minHeight,
        height: 600,
        showDialog,
        hideDialog,
        updateDialogSize: (width: number, height: number) => {
            const size: Size = { width, height };
            setDialogSize(size);
        }
    }
    const outerBoxSx: SxProps<Theme> = {
        width: dialogSize.width,
        height: dialogSize.height
    }
    const searchSx: SxProps<Theme> = {
        width: dialogSize.width,
        height: dialogSize.height * 0.2,
        display: "flex",
        justifyContent: "center",
        alignItems: "end",
    }
    const textFieldProps: BlogEditorTagSearchTextFieldProps = {
        searchString, 
        updateSearchString: (target) => setSearchString(target),
        width: dialogSize.width * 0.8,
        height: 35
    }
    const tagListProps: BlogEditorDialogTagListProps = {
        width: dialogSize.width,
        height: dialogSize.height * 0.8,
        BlogTagList,
        Blog,
        searchString,
        updateBlog
    }
    return (
        <DialogLayout props={dialogProps}>
            <Grid container sx={outerBoxSx}>
                <Grid item sx={searchSx}>
                    <BlogEditorTagSearchTextField props={textFieldProps} />
                </Grid>
                <Grid item>
                    <BlogEditorDialogTagList props={tagListProps} />
                </Grid>
            </Grid>
        </DialogLayout>
    );
}