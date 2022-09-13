import { TabContext, TabPanel } from "@mui/lab";
import { Box } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { BlogComponentType } from "../../../models/state/BlogComponent/type";
import { TabButton, TabButtonProps } from "../../Button/TabButton";
import { BlogEditorMenuTabKeyValues, BlogEditorMenuTabType } from "../type";
import { getBlogEditorMenuTab } from "./func";
import { BlogEditorMapperProps, BlogEditorMenuTabProps } from "./types";

export type BlogEditorMenuProps = {
    width: number,
    height: number,
    sideMargin: number,
    componentType: BlogComponentType,
    tabType: string,
    mapperProps: BlogEditorMapperProps,
    addComponent: () => void,
    updateComponentType: (componentType: BlogComponentType) => void,
    updateTabType: (tab: string) => void,
    updateMapperProps: (mapperProps: BlogEditorMapperProps) => void,
    updateMenuInsertProps: (menuProps: BlogEditorMapperProps) => void,
}



export const BlogEditorMenu = ({ props }: { props: BlogEditorMenuProps }) => {
    const { width, height, sideMargin, tabType, updateTabType } = props;
    const { Palette, Layout } = useContext(UiParamsContext);
    const innerWidth = width - 2 * sideMargin;
    const tabButtonHeight = height * 0.17;
    const tabButtonWidth = innerWidth * 0.1;
    const tabs = Object.keys(BlogEditorMenuTabKeyValues)
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
    const tabProps: BlogEditorMenuTabProps = {
        ...props,
        width: innerWidth,
        margin: 1,
        height: height - tabButtonHeight,
    }
    const tabPanels = Object.keys(BlogEditorMenuTabKeyValues)
        .map((x, i) => {
            const tab = getBlogEditorMenuTab(x, tabProps);
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
