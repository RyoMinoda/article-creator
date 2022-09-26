import { Box, Grid, SxProps, Theme } from "@mui/material";
import { Stack } from "@mui/system";
import { useContext } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { BlogComponentListItemObj } from "../../../models/state/BlogComponent/obj";
import { BlogComponentKeyValues, BlogComponentType } from "../../../models/state/BlogComponent/type";
import { BlogComponentEditorBackground, BlogComponentEditorBackgroundProps } from "./BlogComponentEditorBackground";
import { BlogComponentEditorComponentDocument, BlogComponentEditorComponentLine, BlogComponentEditorContentComponentProps } from "./BlogComponentEditorContentComponents";

export type BlogComponentEditorContentProps = {
    components: Array<BlogComponentListItemObj>,
    updateComponent: (obj: BlogComponentListItemObj) => void,
    updateActiveComponentIndex: (index: number) => void,
    rowCount: number,
    width: number,
    height: number,
}

export const BlogComponentEditorContent = ({ props }: { props: BlogComponentEditorContentProps }) => {
    const { width, height, components, updateComponent, updateActiveComponentIndex, rowCount } = props;
    const { Palette, Layout } = useContext(UiParamsContext);
    const marginTopBottom = 1.5;
    const marginSide = 1;
    const cellWidth = (width - marginSide * 8 * 2) / 12;
    const backgroundProps: BlogComponentEditorBackgroundProps = {
        width, height, marginTopBottom,
        rowCount, 
        marginSide
    }
    return (
        <Stack sx={{ position: "relative", zIndex: 1 }}>
            <Stack sx={{ position: "absolute", width, height }}>
                {components.map((component) => {
                    const key = "component-key-" + component.getComponentIndex();
                    const props: BlogComponentEditorContentComponentProps = {
                        component, 
                        onChangeComponent: updateComponent,
                        onSelectComponent: updateActiveComponentIndex,
                        marginTopBottom, marginSide,
                        cellHeight: Layout.BlogComponentRowHeight,
                        cellWidth
                    }
                    var Component = <></>;
                    const style: SxProps<Theme> = {
                        position: "absolute",
                        top: marginTopBottom * 8 + Layout.BlogComponentRowHeight * component.Y,
                        left: marginSide * 8 + cellWidth * component.X,
                        height: Layout.BlogComponentRowHeight * component.RowSpan,
                        width: cellWidth * component.ColumnSpan,
                        zIndex: 10,
                    }
                    switch(component.ComponentType) {
                        case BlogComponentKeyValues.Article:
                            Component = <BlogComponentEditorComponentDocument props={props} />;
                            break;
                        case BlogComponentKeyValues.Line:
                            Component = <BlogComponentEditorComponentLine props={props} />;
                            break;
                        
                    }
                    return (
                        <Box key={key} sx={style}>
                            {Component}
                        </Box>
                    )
                })}
            </Stack>
            <BlogComponentEditorBackground props={backgroundProps} />
        </Stack>
    );
}
