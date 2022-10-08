import { Box, SxProps, Theme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";
import { BlogComponentType } from "../../../../models/state/BlogComponent/type";
import { BlogEditorSubmenuItemProps } from "../Files/type";
import { getNextActiveAccordions } from "../func";
import { BlogEditorSubmenuAccordionType } from "../types";
import { BlogEditorSubmenuComponentsMap, BlogEditorSubmenuComponentsMapProps } from "./BlogEditorSubmenuComponentsMap";
import { GetSubmenuComponentItemHeight, GetSubmenuComponentTypes } from "./func";

export const BlogEditorSubmenuComponents = ({ props }: { props: BlogEditorSubmenuItemProps }) => {
    const { width, height, updateActiveAccordions, accordionTitleHeight, activeAccordions, activeComponentType, updateActiveComponentType } = props;
    const { Palette } = useContext(UiParamsContext);
    const [ isShowns, setIsShowns ] = useState<Array<boolean>>([]);
    const [ accordionHeights, setAccordionHeights ] = useState<Array<number>>([]);
    const [ accordionTypes, setAccordionTypes ] = useState<Array<BlogEditorSubmenuAccordionType>>([]);

    useEffect(() => {
        const targetAccordions = GetSubmenuComponentTypes();
        setAccordionTypes(targetAccordions);
        const nextIsShowns = targetAccordions.map((x) => accordionTypes.includes(x));
        setIsShowns(nextIsShowns);
    }, [])

    useEffect(() => {
        const nextAccordions = getNextActiveAccordions(isShowns, accordionTypes, activeAccordions);
        updateActiveAccordions(nextAccordions);
        const currentActiveAccordions = nextAccordions.filter(x => accordionTypes.includes(x));
        const heights = accordionTypes.map((x) => GetSubmenuComponentItemHeight(x, height, accordionTypes, currentActiveAccordions, accordionTitleHeight));
        setAccordionHeights(heights);
    }, [isShowns])

    const outerSx: SxProps<Theme> = {
        width,
        height,
        bgcolor: Palette.Background.Main
    }
    return (
        <Box sx={outerSx}>
            {accordionTypes.map((x: BlogEditorSubmenuAccordionType, i: number) => {
                const nextProps: BlogEditorSubmenuComponentsMapProps = {
                    title: x,
                    titleHeight: accordionTitleHeight,
                    index: i,
                    width,
                    isShown: isShowns[i],
                    detailHeight: accordionHeights[i],
                    activeComponentType,
                    updateIsShown: () => {
                        const nextShowns = [ ...isShowns ];
                        nextShowns[i] = !isShowns[i];
                        setIsShowns(nextShowns);
                    },
                    updateActiveComponentType
                }
                return <BlogEditorSubmenuComponentsMap props={nextProps} key={x} />
            })}
        </Box>
    );
}