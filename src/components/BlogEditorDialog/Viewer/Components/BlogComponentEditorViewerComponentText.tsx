import { Box, Grid, SxProps, Theme, Typography } from "@mui/material";
import { BlogComponentListItemAlignKeyValues, BlogComponentListItemOverflowKeyValues } from "../../../../models/state/BlogComponent/type";
import { BlogComponentEditorViewerComponentProps } from "./type"

export const BlogComponentEditorViewerComponentText = ({ props }: { props: BlogComponentEditorViewerComponentProps }) => {
    const { BlogPage, BlogComponentListItem, cellWidth, cellHeight } = props;
    var align = "";
    var maxWidth = 0;
    var left = cellWidth * BlogComponentListItem.Position.X;
    switch (BlogComponentListItem.AlignType) {
        case BlogComponentListItemAlignKeyValues.Left:
            maxWidth = cellWidth * (BlogPage.ColumnCount - BlogComponentListItem.Position.X);
            align = "start";
            break;
        case BlogComponentListItemAlignKeyValues.Center:
            maxWidth = cellWidth * (BlogComponentListItem.Span.X + 1);
            align = "center";
            break;
        case BlogComponentListItemAlignKeyValues.Right:
            align = "end";
            maxWidth = cellWidth * (BlogComponentListItem.Position.X + 1);
            left = 0;
            break;
    }
    const commonSx: SxProps<Theme> = {
        position: "absolute",
        left,
        top: cellHeight * BlogComponentListItem.Position.Y,
        width: cellWidth * (BlogComponentListItem.Span.X + 1),
        overflowWrap: "break-word",
        display: "flex",
        justifyContent: align,
        alignItems: "end"
    }
    var outerSx: SxProps<Theme> = {};
    
    switch (BlogComponentListItem.OverflowType) {
        case BlogComponentListItemOverflowKeyValues.Hidden:
            outerSx = {
                ...commonSx,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden"
            };
            break;
        case BlogComponentListItemOverflowKeyValues.Ignored:
            outerSx = {
                ...commonSx,
                width: maxWidth,
                overflow: "hidden",
            };
            break;
    }
    return (
        <Box sx={outerSx}>
            {BlogComponentListItem.ContentList.map((x) => {
                const style: React.CSSProperties = {
                    fontSize: BlogComponentListItem.FontSize + "px",
                    lineHeight: cellHeight + "px",
                    maxWidth: maxWidth,
                }
                return <span key={x.Id} style={style}>{x.Text}</span>
            })}
        </Box>
    );
}