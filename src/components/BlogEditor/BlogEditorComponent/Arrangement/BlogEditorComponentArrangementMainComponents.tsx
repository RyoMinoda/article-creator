import { Box, SxProps, Theme } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { BlogComponentListObj } from "../../../../models/state/BlogComponent/obj";
import { BlogPageObj } from "../../../../models/state/BlogPage/obj";
import { Position } from "../../../../models/utils/Position/obj";
import { Span } from "../../../../models/utils/Span/obj";

export type BlogEditorComponentArrangementMainComponentsProps = {
    width: number,
    height: number,
    BlogComponentList: BlogComponentListObj,
    BlogPage: BlogPageObj,
}

export const BlogEditorComponentArrangementMainComponents = ({ props }: { props: BlogEditorComponentArrangementMainComponentsProps }) => {
    const { width, height, BlogComponentList, BlogPage } = props;
    const { Palette } = useContext(UiParamsContext);
    const outerSx: SxProps<Theme> = {
        position: "relative",
        width, height,
        bgcolor: "transparent"
    }
    const cellWidth = width / BlogPage.ColumnCount;
    const cellHeight = height / BlogPage.RowCount;
    const paddingLeft = 1.0;
    return (
        <Box sx={outerSx}>
            {BlogComponentList
                .overlap(BlogPage.ComponentIds)
                .map((item) => {
                    if (Position.getIsUndefined(item.Position) || Span.getIsUndefined(item.Span)) {
                        return <Box key={item.Id}></Box>;
                    }
                    const itemWidth = cellWidth * (item.Span.X + 1) - paddingLeft * 8;
                    const itemHeight = cellHeight * (item.Span.Y + 1);
                    const itemSx: SxProps<Theme> = {
                        position: "absolute",
                        left: cellWidth * item.Position.X,
                        top: cellHeight * item.Position.Y,
                        width: itemWidth,
                        height: itemHeight,
                        bgcolor: Palette.Background.Lightest,
                        borderRadius: 0.5,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                    }
                    var Component = <></>;
                    return (
                        <Box sx={itemSx} key={item.Id}>
                            {Component}
                        </Box>
                    )
            })}
        </Box>
    );
}