import { Box, SxProps, Theme } from "@mui/material";
import { BlogEditorSubmenuPropertyMap, BlogEditorSubmenuPropertyMapProps } from "./BlogEditorSubmenuPropertyMap";
import { useEffect, useState } from "react";
import { BlogEditorSubmenuItemProps } from "../Files/type";
import { GetSubmenuPropertyTypes } from "./func";
import { BlogEditorSubmenuAccordionType } from "../types";
import { getNextActiveAccordions } from "../func";

export const BlogEditorSubmenuProperty = ({ props }: { props: BlogEditorSubmenuItemProps }) => {
    const { width, height, activeAccordions, updateActiveAccordions } = props;
    const [ isShowns, setIsShowns ] = useState<Array<boolean>>([]);
    const [ accordionTypes, setAccordionTypes ] = useState<Array<BlogEditorSubmenuAccordionType>>([]);

    useEffect(() => {
        const accordionTypeArray = GetSubmenuPropertyTypes();
        const initialIsShowns = accordionTypeArray.map(x => activeAccordions.includes(x));
        setIsShowns(initialIsShowns);
        setAccordionTypes(accordionTypeArray);
    }, [])

    useEffect(() => {
        const nextAccordions = getNextActiveAccordions(isShowns, accordionTypes, activeAccordions);
        updateActiveAccordions(nextAccordions);
    }, [isShowns])

    const entireSx: SxProps<Theme> = {
        width, height,
        overflow: "hidden",
        overflowY: "scroll"
    }
    return (
        <Box sx={entireSx}>
            {accordionTypes.map((x: string, i: number) => {
                const nextProps: BlogEditorSubmenuPropertyMapProps = {
                    ...props,
                    width,
                    height,
                    title: x,
                    index: i,
                    isShown: isShowns[i],
                    updateIsShown: () => { 
                        const nextShowns = [ ...isShowns ];
                        nextShowns[i] = !isShowns[i];
                        setIsShowns(nextShowns);
                    }
                }
                return <BlogEditorSubmenuPropertyMap props={nextProps} key={x} />
            })}
        </Box>
    );
}