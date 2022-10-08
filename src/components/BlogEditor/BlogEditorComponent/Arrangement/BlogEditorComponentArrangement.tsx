import { Box, Grid, Paper, SxProps, Theme, Typography } from "@mui/material"
import { useContext } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib"
import { BlogObj } from "../../../../models/state/Blog/obj";
import { BlogEditorComponentArrangementMain, BlogEditorComponentArrangementMainProps } from "./BlogEditorComponentArrangementMain";
import { BlogEditorComponentArrangementMenu, BlogEditorComponentArrangementMenuProps } from "./BlogEditorComponentArrangementMenu";

export type BlogEditorComponentArrangementProps = {
    width: number,
    height: number,
    currentPage: number,
    Blog: BlogObj,
    canUpdateComponentWindowWidth: boolean,
    updateCurrentPage: (page: number) => void,
}

export const BlogEditorComponentArrangement = ({ props }: { props: BlogEditorComponentArrangementProps }) => {
    const { width, height, currentPage, Blog, updateCurrentPage, canUpdateComponentWindowWidth } = props;
    const { Palette } = useContext(UiParamsContext);
    const outerSx: SxProps<Theme> = {
        width, height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
    const menuHeight = 70;
    const mainHeight = height - menuHeight;

    const mainProps: BlogEditorComponentArrangementMainProps = {
        height: mainHeight,
        width, Blog,
        isActiveArrangementBackground: !canUpdateComponentWindowWidth
    }
    const menuProps: BlogEditorComponentArrangementMenuProps = {
        height: menuHeight,
        width, currentPage, Blog,
        updateCurrentPage
    }
    return (
        <Box sx={outerSx}>
            <Grid container>
                <Grid item>
                    <BlogEditorComponentArrangementMain props={mainProps} />
                </Grid>
                <Grid item>
                    <BlogEditorComponentArrangementMenu props={menuProps} />
                </Grid>
            </Grid>
        </Box>
    );
}