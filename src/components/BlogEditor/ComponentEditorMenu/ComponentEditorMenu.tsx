import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { BlogComponentType } from "../../../models/state/BlogComponent/type";
import { TabButton, TabButtonProps } from "../../Button/TabButton";
import { ComponentEditorMenuArticleTab } from "./ComponentEditorMenuArticleTab";
import { ComponentEditorMenuCreationTab } from "./ComponentEditorMenuCreationTab";
import { ComponentEditorMapperProps, ComponentEditorMenuTabProps, ComponentEditorMenuTabType } from "./types";

export type ComponentEditorMenuProps = {
    width: number,
    height: number,
    sideMargin: number,
    componentType: BlogComponentType,
    tabType: string,
    mapperProps: ComponentEditorMapperProps,
    addComponent: () => void,
    updateComponentType: (componentType: BlogComponentType) => void,
    updateTabType: (tab: string) => void,
    updateMapperProps: (mapperProps: ComponentEditorMapperProps) => void,
    updateMenuCreationProps: (menuProps: ComponentEditorMapperProps) => void,
}

const getTab = (type: string, props: ComponentEditorMenuTabProps) => {
    switch (type) {
        case ComponentEditorMenuTabType.Article:
            return <ComponentEditorMenuArticleTab props={props} />
        case ComponentEditorMenuTabType.Creation:
            return <ComponentEditorMenuCreationTab props={props} />
        default:
            return <></>
    }
}

export const ComponentEditorMenu = ({ props }: { props: ComponentEditorMenuProps }) => {
    const { width, height, sideMargin, tabType, updateTabType } = props;
    const { Palette, Layout } = useContext(UiParamsContext);
    const innerWidth = width - 2 * sideMargin;
    const tabButtonHeight = height * 0.15;
    const tabButtonWidth = innerWidth * 0.1;
    const tabs = Object.keys(ComponentEditorMenuTabType)
        .map((x, i) => {
            const bgcolor = x == tabType ? Palette.Background.Lightest : Palette.Background.Light;
            const color = x == tabType ? Palette.FontColor.Darker : Palette.FontColor.Main;
            const tabProps: TabButtonProps = {
                height: tabButtonHeight, width: tabButtonWidth, color,
                text: x, bgcolor, hoverBgColor: bgcolor, activeBgColor: bgcolor,
                onClickHandler: () => updateTabType(x),
            }
            return (
                <TabButton props={tabProps} key={"tab-button-" + i} />);
        })
    const tabProps: ComponentEditorMenuTabProps = {
        ...props,
        width: innerWidth,
        height: height - tabButtonHeight,
    }
    const tabPanels = Object.keys(ComponentEditorMenuTabType)
        .map((x, i) => {
            const tab = getTab(x, tabProps);
            return <TabPanel value={x} key={"tab" + i} sx={{ padding: 0 }}>{tab}</TabPanel>
        });
    return (
        <Box sx={{ width: innerWidth, height, marginLeft: sideMargin / 8, bgcolor: Palette.Background.Lightest }} >
            <TabContext value={tabType}>
                <Box sx={{ bgcolor: Palette.Background.Main }}>
                    {tabs}
                </Box>
                {tabPanels}
            </TabContext>
        </Box>
    )
}