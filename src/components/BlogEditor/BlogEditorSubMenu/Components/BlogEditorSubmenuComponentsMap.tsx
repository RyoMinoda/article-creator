import { Box, SxProps, Theme } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { BlogComponentListObj } from "../../../../models/state/BlogComponent/obj";
import { BlogEditorSubmenuItemAccordionLayout, BlogEditorSubmenuItemAccordionLayoutProps } from "../BlogEditorSubmenuItemAccordionLayout";
import { BlogEditorSubmenuAccordionKeyValues, BlogEditorSubmenuAccordionType } from "../types";
import { BlogEditorSubmenuComponentMenu } from "./BlogEditorSubmenuComponentMenu";
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
}

export const BlogEditorSubmenuComponentsMap = ({ props }: { props: BlogEditorSubmenuComponentsMapProps }) => {
    const { width, detailHeight, isShown, title } = props;
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
        case BlogEditorSubmenuAccordionKeyValues.ComponentMenu:
            Component = <BlogEditorSubmenuComponentMenu props={componentProps} />
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