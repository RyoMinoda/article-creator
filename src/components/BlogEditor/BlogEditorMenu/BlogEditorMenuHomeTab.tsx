import { Grid } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { BlogEditorMenuItemLayout, BlogEditorMenuItemLayoutProps } from "./BlogEditorMenuItemLayout";
import { BlogEditorMenuTabProps } from "./types";

export const BlogEditorMenuHomeTab = ({ props }: { props: BlogEditorMenuTabProps }) => {
    const { width, height, mapperProps, updateMapperProps, updateMenuInsertProps, margin, addComponent } = props;
    const { col, row, colSpan, rowSpan, mapperValueChanged, menuValueChanged } = mapperProps;
    const { FontSize, Palette, Layout } = useContext(UiParamsContext);
    const columnCount = 7;
    const innerHeight = height - 2 * margin * 8;
    const innerWidth = width - 2 * margin * 8;
    const cellWidth = innerWidth / columnCount;
    const itemLayoutProps: BlogEditorMenuItemLayoutProps = {
        width: cellWidth - 18,
        height: innerHeight,
        title: "",
        splitUp: true
    }
    const PlusIcon = <></>;
    const PencilIcon = <></>;
    return (
        <Grid container sx={{ height, width, marginTop: margin }}>
            <BlogEditorMenuItemLayout props={{ ...itemLayoutProps, title: "Flow", Icon: PencilIcon }}>
            
            </BlogEditorMenuItemLayout>
            <BlogEditorMenuItemLayout props={{ ...itemLayoutProps, title: "Genre", Icon: PencilIcon }}>
                
            </BlogEditorMenuItemLayout>
            <BlogEditorMenuItemLayout props={{ ...itemLayoutProps, title: "Tag", Icon: PlusIcon }}>
                
            </BlogEditorMenuItemLayout>
            <BlogEditorMenuItemLayout props={{ ...itemLayoutProps, title: "Thumbnail", Icon: PencilIcon }}>
                
            </BlogEditorMenuItemLayout>
            <BlogEditorMenuItemLayout props={{ ...itemLayoutProps, title: "Editor", Icon: PlusIcon }}>
                
            </BlogEditorMenuItemLayout>
            <BlogEditorMenuItemLayout props={{ ...itemLayoutProps, title: "TimeStamp" }}>
                
            </BlogEditorMenuItemLayout>
            <BlogEditorMenuItemLayout props={{ ...itemLayoutProps, title: "Others", splitUp: false }}>
                
            </BlogEditorMenuItemLayout>
        </Grid>
    );
}