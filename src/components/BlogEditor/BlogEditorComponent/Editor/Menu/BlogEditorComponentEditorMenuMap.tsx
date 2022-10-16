import { Box, Grid, SxProps, Theme } from "@mui/material";
import { getBlogEditorComponentEditorNewComponentHeight } from "../func";
import { BlogEditorComponentEditorMenuKeyValues, BlogEditorComponentEditorMenuType } from "../type";
import { BlogEditorComponentEditorMenuTopSelectors, BlogEditorComponentEditorMenuTopSelectorsProps } from "./BlogEditorComponentEditorMenuTopSelectors";
import { BlogEditorComponentEditorComponentType } from "./type";

export type BlogEditorComponentEditorMenuMapProps = {
    width: number,
    height: number,
    menuType: BlogEditorComponentEditorMenuType,
    componentTypeSelected: BlogEditorComponentEditorComponentType,
    menuTitles: Array<string>,
    menuTitleSelected: string
}

export const BlogEditorComponentEditorMenuMap = ({ props }: { props: BlogEditorComponentEditorMenuMapProps }) => {
    const { width, height, menuType, componentTypeSelected, menuTitles, menuTitleSelected } = props;
    const shortHeight = getBlogEditorComponentEditorNewComponentHeight(BlogEditorComponentEditorMenuKeyValues.Short, height);
    const typeSelectorProps: BlogEditorComponentEditorMenuTopSelectorsProps = {
        width,
        height: shortHeight,
        componentTypeSelected,
        menuTitles,
        menuTitleSelected
    }
    switch (menuType) {
        case BlogEditorComponentEditorMenuKeyValues.Hidden:
            return <Box></Box>;
        case BlogEditorComponentEditorMenuKeyValues.Short:
            return (
                <Grid container>
                    <Grid item>
                        <BlogEditorComponentEditorMenuTopSelectors props={typeSelectorProps} />
                    </Grid>
                </Grid>
            );
        case BlogEditorComponentEditorMenuKeyValues.Medium:
            return (
                <Grid container>
                    <Grid item>
                        <BlogEditorComponentEditorMenuTopSelectors props={typeSelectorProps} />
                    </Grid>
                </Grid>
            );
        case BlogEditorComponentEditorMenuKeyValues.Max:
            return <Box></Box>;
    }
}