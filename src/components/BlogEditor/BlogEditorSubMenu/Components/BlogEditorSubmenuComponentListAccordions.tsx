import { Box, Grid, SxProps, Theme } from "@mui/material";
import { BlogEditorSubmenuComponentsMapItemProps } from "./type";

export const BlogEditorSubmenuComponentListAccordions = ({ props }: { props: BlogEditorSubmenuComponentsMapItemProps }) => {
    const { width, height, BlogComponentList } = props;
    const outerSx: SxProps<Theme> = {
        width, height, 
        overflow: "hidden",
        overflowY: "scroll",
    }
    const listItemHeight = 36;
    const listItemSx: SxProps<Theme> = {
        height: listItemHeight,
        width,
    }
    const menus = BlogComponentList.distinctTitles();
    return (
        <Box sx={outerSx}>
            <Grid container>
                {menus.map((x) => {
                    return (
                        <Grid item key={x}> 
                            <Grid container sx={listItemSx}>
                                <Grid item>

                                </Grid>
                                <Grid item>
                                    
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    );
}