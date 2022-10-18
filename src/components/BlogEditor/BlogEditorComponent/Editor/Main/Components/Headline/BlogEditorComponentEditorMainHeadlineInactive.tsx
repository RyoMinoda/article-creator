import { Grid, SxProps, Theme, Typography } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../../../../../models/context/UiParams/lib";
import { BlogEditorComponentEditorMainItemLayout, BlogEditorComponentEditorMainItemLayoutProps, BlogEditorComponentEditorMainOuterLayout } from "../BlogEditorComponentEditorMainLayouts";
import { BlogEditorComponentEditorMainComponentItemProps } from "../type";

export const BlogEditorComponentEditorMainHeadlineInactive = ({ props }: { props: BlogEditorComponentEditorMainComponentItemProps }) => {
    const { activeWidth, activeHeight, titleHeight, BlogComponentItem } = props;
    const { FontSize } = useContext(UiParamsContext);
    const rowHeightUnit = activeHeight / 5;
    const mainItemCount = 1;
    const mainItemWidth = activeWidth / mainItemCount;
    const subItemCount = 3;
    const topMenuItemWidth = activeWidth / subItemCount;
    const mainItemHeight = rowHeightUnit * 2.5;
    const topMenuHeight = rowHeightUnit * 2.5;
    const titleWidth = 50;

    const topRowItem: SxProps<Theme> = {
        width: activeWidth,
        height: topMenuHeight
    }
    const mainRowItem: SxProps<Theme> = {
        width: activeWidth,
        height: mainItemHeight
    }
    const topItemLayoutProps: BlogEditorComponentEditorMainItemLayoutProps = {
        ...props,
        width: topMenuItemWidth,
        height: topMenuHeight,
        titleHeight, titleWidth
    }
    const mainItemLayoutProps: BlogEditorComponentEditorMainItemLayoutProps = {
        ...props,
        width: mainItemWidth,
        height: mainItemHeight,
        titleHeight, titleWidth
    }
    return (
        <BlogEditorComponentEditorMainOuterLayout props={props}>
            <Grid item sx={topRowItem}>
                <Grid container>
                    <Grid item>
                        <BlogEditorComponentEditorMainItemLayout props={topItemLayoutProps} title="Type">
                            <Typography fontSize={FontSize.Small}>
                                {BlogComponentItem.getComponentStyleStrings()}
                            </Typography>
                        </BlogEditorComponentEditorMainItemLayout>
                    </Grid>
                    <Grid item>
                        <BlogEditorComponentEditorMainItemLayout props={topItemLayoutProps} title="Size">
                            <Typography fontSize={FontSize.Small}>
                                {BlogComponentItem.Span.toString()}
                            </Typography>
                        </BlogEditorComponentEditorMainItemLayout>
                    </Grid>
                    <Grid item>
                        <BlogEditorComponentEditorMainItemLayout props={topItemLayoutProps} title="Position">
                            <Typography fontSize={FontSize.Small}>
                                {BlogComponentItem.Position.toString()}
                            </Typography>
                        </BlogEditorComponentEditorMainItemLayout>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sx={mainRowItem}>
                <BlogEditorComponentEditorMainItemLayout props={mainItemLayoutProps} title="Content">
                    <Typography fontSize={FontSize.Small}>
                        {BlogComponentItem.StrContent}
                    </Typography>
                </BlogEditorComponentEditorMainItemLayout>
            </Grid>
        </BlogEditorComponentEditorMainOuterLayout>
    )
}


