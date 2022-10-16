import { Box, Grid, Select, SxProps, Theme, Typography } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../../../models/context/UiParams/lib";
import { DefaultSelector, DefaultSelectorProps } from "../../../../Selector/DefaultSelector";
import { BlogEditorComponentEditorComponentKeyValues, BlogEditorComponentEditorComponentType } from "./type";

export type BlogEditorComponentEditorMenuTopSelectorsProps = {
    width: number,
    height: number,
    componentTypeSelected: BlogEditorComponentEditorComponentType,
    menuTitles: Array<string>,
    menuTitleSelected: string
}

export const BlogEditorComponentEditorMenuTopSelectors = ({ props }: { props: BlogEditorComponentEditorMenuTopSelectorsProps }) => {
    const { width, height, componentTypeSelected, menuTitles, menuTitleSelected } = props;
    const { FontSize } = useContext(UiParamsContext);
    const outerSx: SxProps<Theme> = {
        width, height,
    }
    const paddingTop = 1;
    const mainHeight = height - 2 * paddingTop * 8;
    const containerSx: SxProps<Theme> = {
        width: width / 2, height: mainHeight,
        paddingTop,
    }
    const titleHeight = 24;
    const titleSx: SxProps<Theme> = {
        width: width / 2, 
        height: titleHeight,
        paddingLeft: 1,
        display: "flex", justifyContent: "start", alignItems: "center"
    }
    const contentSx: SxProps<Theme> = {
        width: width / 2,
        height: mainHeight - titleHeight, 
        display: "flex", justifyContent: "center", alignItems: "center"
    }
    const componentSelectorProps: DefaultSelectorProps = {
        label: "Component",
        width: width / 2 - 8,
        height: mainHeight - titleHeight, 
        item: componentTypeSelected,
        array: Object.values(BlogEditorComponentEditorComponentKeyValues).map(x => x),
        onChangeHandler: () => {

        }
    }
    const menuSelectorProps: DefaultSelectorProps = {
        label: "Menu",
        width: width / 2 - 8,
        height: mainHeight - titleHeight, 
        item: menuTitleSelected,
        array: menuTitles,
        onChangeHandler: () => {

        }
    }
    return (
        <Box sx={outerSx}>
            <Grid container sx={outerSx}>
                <Grid item>
                    <Grid container sx={containerSx}>
                        <Grid item sx={titleSx}>
                            <Typography fontSize={FontSize.Smaller}>
                                Component
                            </Typography>
                        </Grid>
                        <Grid item sx={contentSx}>
                            <DefaultSelector props={componentSelectorProps} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container sx={containerSx}>
                        <Grid item sx={titleSx}>
                            <Typography fontSize={FontSize.Smaller}>
                                Menu Title
                            </Typography>
                        </Grid>
                        <Grid item sx={contentSx}>
                            <DefaultSelector props={menuSelectorProps} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}