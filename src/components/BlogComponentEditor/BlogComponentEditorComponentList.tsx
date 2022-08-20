import { Box, Button, Grid, Stack, SxProps, Theme, Typography } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { BlogComponentObj } from "../../models/state/BlogComponent/obj";
import { BlogComponentEditorComponentListItem, BlogComponentEditorComponentListItemProps } from "./BlogComponentEditorComponentListItem";

export type BlogComponentEditorComponentListProps = {
    components: Array<BlogComponentObj>,
    width: number,
    height: number,
    activeComponentIndex: number,
    onClickListItem: (index: number) => void,
}

export const BlogComponentEditorComponentList = ({ props }: { props: BlogComponentEditorComponentListProps }) => {
    const { width, height, components, activeComponentIndex, onClickListItem } = props;
    const { Palette } = useContext(UiParamsContext);
    const listPaddingRight = 3;
    const itemHeight = 40;
    const containerWidth = width - listPaddingRight * 8;
    const sidePadding = 1;
    const buttonWidth = containerWidth - 2 * 8 * sidePadding;
    const paddingTopBottom = 2;
    const containerProps: SxProps = {
        position: "relative",
        width: buttonWidth, 
        height: components.length * itemHeight,
        background: Palette.Background.Lighter,
        paddingBottom: paddingTopBottom,
        paddingLeft: 1,
        paddingRight: 1,
        borderRadius: 2,
    }
    const indexes = components.map(x => x.getComponentIndex());
    return (
        <Stack sx={containerProps}>
            {components.map((x, i) => {
                const listItemProps: BlogComponentEditorComponentListItemProps = {
                    width: buttonWidth,
                    height: itemHeight,
                    component: x, 
                    activeComponentIndex,
                    onClickListItem
                }
                const key: number = x.getComponentIndex();
                const row = indexes.map(x => x === key).indexOf(true);
                const itemSx: SxProps<Theme> = {
                    position: "absolute",
                    top: row * itemHeight + paddingTopBottom * 8 / 2,
                }
                return (
                    <Box key={"component-list-item" + key} sx={itemSx}>
                        <BlogComponentEditorComponentListItem
                            props={listItemProps} />
                    </Box>
                    );
            })}
        </Stack>
    );
}

