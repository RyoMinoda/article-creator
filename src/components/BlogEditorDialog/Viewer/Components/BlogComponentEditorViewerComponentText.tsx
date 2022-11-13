import { Box, Grid, SxProps, Theme, Typography } from "@mui/material";
import { BlogComponentListItemAlignKeyValues, BlogComponentListItemOverflowKeyValues } from "../../../../models/state/BlogComponent/type";
import { BlogComponentContentListObj } from "../../../../models/state/BlogComponentContent/obj";
import { BlogComponentContentStyleListItemObj } from "../../../../models/state/BlogComponentContentStyle/obj";
import { BlogComponentContentStyleKeyValues } from "../../../../models/state/BlogComponentContentStyle/type";
import { BlogComponentEditorViewerComponentProps } from "./type"

export const BlogComponentEditorViewerComponentText = ({ props }: { props: BlogComponentEditorViewerComponentProps }) => {
    const { BlogPage, BlogComponentListItem, cellWidth, cellHeight, BlogComponentContentList, BlogComponentContentStyleList } = props;
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
                height: cellHeight * (BlogComponentListItem.Span.Y + 1),
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden"
            };
            break;
        case BlogComponentListItemOverflowKeyValues.Ignored:
            outerSx = {
                ...commonSx,
                width: maxWidth,
            };
            break;
    }
    const gridItemSx: SxProps<Theme> = {
        width: maxWidth,
    }
    const containerSx: SxProps<Theme> = {
        width: maxWidth,
    }
    var index = 0;
    return (
        <Box sx={outerSx}>
            <Grid container sx={containerSx}>
                {BlogComponentContentList.map(x => {
                    const textArray = new Array(x.Text.length).fill(0).map((_, i) => x.Text.charAt(i));
                    return (
                        <Grid item sx={gridItemSx} key={x.Id}>
                            {textArray.map((x) => {
                                const htmlProps: ITextHtmlProps = {
                                    height: cellHeight,
                                    BlogComponentContentStyleList,
                                    index: index
                                }
                                index++;
                                return <TextHtml key={index} props={htmlProps}>{x}</TextHtml>;
                            })}
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    );
}

type ITextHtmlProps = {
    index: number,
    height: number,
    BlogComponentContentStyleList: BlogComponentContentStyleListItemObj[],
}

const TextHtml = ({ props, children }: { props: ITextHtmlProps, children: React.ReactNode }) => {
    const { height, BlogComponentContentStyleList, index } = props;
    const style: React.CSSProperties = {
        lineHeight: height + "px",
        height,
        fontFamily: "游ゴシック",
    }
    const contentStyles = BlogComponentContentStyleList
        .filter(x => x.Start <= index && index < x.End)
        .map(x => x.Style);
    if (contentStyles.includes(BlogComponentContentStyleKeyValues.Italic)) {
        style.fontStyle = "italic";
    }
    if (contentStyles.includes(BlogComponentContentStyleKeyValues.Bold)) {
        style.fontWeight = "bolder";
    }
    if (contentStyles.includes(BlogComponentContentStyleKeyValues.Underline)) {
        style.textDecoration = "Underline";
    }
    return (
        <span style={style}>
            {children}
        </span>
    )
}