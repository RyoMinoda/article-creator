import { Box, SxProps, Theme } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { BlogComponentListItemObj, BlogComponentListObj } from "../../../../models/state/BlogComponent/obj";
import { BlogComponentType } from "../../../../models/state/BlogComponent/type";
import { BlogEditorSubmenuItemAccordionLayout, BlogEditorSubmenuItemAccordionLayoutProps } from "../BlogEditorSubmenuItemAccordionLayout";
import { BlogEditorSubmenuAccordionKeyValues, BlogEditorSubmenuAccordionType } from "../types";
import { BlogEditorSubmenuComponentCreate } from "./BlogEditorSubmenuComponentCreate";
import { BlogEditorSubmenuComponentListAccordions } from "./BlogEditorSubmenuComponentListAccordions";
import { BlogEditorSubmenuComponentsMapItemProps } from "./type";

export type BlogEditorSubmenuComponentsMapProps = {
    titleHeight: number,
    index: number;
    title: BlogEditorSubmenuAccordionType;
    detailHeight: number;
    width: number;
    isShown: boolean;
    BlogComponentList: BlogComponentListObj,
    updateIsShown: () => void;
    createBlogEmptyComponent: (componentType: BlogComponentType) => void
}

export const BlogEditorSubmenuComponentsMap = ({ props }: { props: BlogEditorSubmenuComponentsMapProps }) => {
    const { width, detailHeight, isShown, title, createBlogEmptyComponent, BlogComponentList } = props;
    const { Palette } = useContext(UiParamsContext);
    var Component = <></>;
    const innerBoxSx: SxProps<Theme> = {
        height: detailHeight,
        width,
        bgcolor: Palette.Background.Main
    }
    const componentProps: BlogEditorSubmenuComponentsMapItemProps = {
        ...props,
        height: detailHeight,
    }
    switch (title) {
        case BlogEditorSubmenuAccordionKeyValues.ComponentCreate:
            Component = <BlogEditorSubmenuComponentCreate props={componentProps} />
            break;
        case BlogEditorSubmenuAccordionKeyValues.ComponentList:
            Component = <BlogEditorSubmenuComponentListAccordions props={componentProps} />;
            break;
    }

    return (
        <BlogEditorSubmenuItemAccordionLayout props={props}>
            <Box sx={innerBoxSx}>
                {Component}
            </Box>
        </BlogEditorSubmenuItemAccordionLayout>
    );
}