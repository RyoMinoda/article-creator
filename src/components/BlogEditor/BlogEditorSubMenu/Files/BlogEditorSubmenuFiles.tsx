import { Box, SxProps, Theme } from "@mui/material";
import { useEffect, useState } from "react";
import { getNextActiveAccordions } from "../func";
import { BlogEditorSubmenuAccordionKeyValues, BlogEditorSubmenuAccordionType } from "../types";
import { BlogEditorSubmenuFilesMap, BlogEditorSubmenuFilesMapProps } from "./BlogEditorSubmenuFilesMap";
import { GetSubmenuAccordionBlogsHeight, GetSubmenuAccordionBlogsHeightProps, GetSubmenuFileAccordionContentHeightProps, GetSubmenuFileDefaultAccordions } from "./func";
import { BlogEditorSubmenuItemProps } from "./type";

export const BlogEditorSubmenuFiles = ({ props }: { props: BlogEditorSubmenuItemProps }) => {
    const { width, height, activeAccordions, updateActiveAccordions } = props;
    const [ isShowns, setIsShowns ] = useState<Array<boolean>>([]);
    const [ accordionHeights, setAccordionHeights ] = useState<Array<number>>([]);
    const [ accordionTypes, setAccordionTypes ] = useState<Array<BlogEditorSubmenuAccordionType>>([]);
    const itemHeight = 37;
    const blogItemHeight = 35;
    
    useEffect(() => {
        const accordionProps: GetSubmenuFileAccordionContentHeightProps = {
            itemHeight, heights: accordionHeights, entireHeight: height
        }
        const currentAccordions = GetSubmenuFileDefaultAccordions(accordionProps);
        const currentHeights = currentAccordions.map(x => x.height);
        const currentIsShowns = currentAccordions.map(x => x.isShown);
        const currentTypes = currentAccordions.map(x => x.type);
        setAccordionHeights(currentHeights);
        setIsShowns(currentIsShowns);
        setAccordionTypes(currentTypes);
    }, []);

    useEffect(() => {
        const nextAccordions = getNextActiveAccordions(isShowns, accordionTypes, activeAccordions);
        updateActiveAccordions(nextAccordions);
    }, [isShowns])

    const entireSx: SxProps<Theme> = {
        width, height,
        margin: 0,
        padding: 0,
        overflow: "hidden",
        overflowY: "scroll"
    }
    if (accordionHeights.length === 0) {
        return <Box></Box>
    }
    const updateIsShownByIndex = (i: number) => {
        const newShowns = [ ...isShowns ];
        newShowns[i] = !isShowns[i];
        setIsShowns(newShowns);
        const index = accordionTypes.indexOf(BlogEditorSubmenuAccordionKeyValues.FilesBlogs);
        const heightProps: GetSubmenuAccordionBlogsHeightProps = { 
            isShowns: newShowns, 
            types: accordionTypes, 
            heights: accordionHeights, 
            entireHeight: height,
            itemHeight
        };
        accordionHeights[index] = GetSubmenuAccordionBlogsHeight(heightProps);
        setAccordionHeights(accordionHeights);
    }
    return (
        <Box sx={entireSx}>
            {accordionTypes.map((x, i) => {
                const nextProps: BlogEditorSubmenuFilesMapProps = {
                    ...props,
                    index: i,
                    title: x,
                    titleHeight: itemHeight,
                    detailHeight: isShowns[i] ? accordionHeights[i] : 0,
                    accordion: x,
                    isShown: isShowns[i],
                    blogItemHeight,
                    updateIsShown: () => updateIsShownByIndex(i)
                }
                return <BlogEditorSubmenuFilesMap props={nextProps}  key={x} />
            })}
        </Box>
    );
}
