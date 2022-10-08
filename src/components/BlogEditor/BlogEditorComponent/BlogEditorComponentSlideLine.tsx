import { Theme } from "@emotion/react";
import { Box, SxProps } from "@mui/material";
import { useContext, useState } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { ClassNameKeyValues } from "../../../utils/ClassName";

export type BlogEditorComponentSlideLineProps = {
    width: number,
    height: number,
    updateMainWidth: () => void,
}

export const BlogEditorComponentSlideLine = ({ props }: { props: BlogEditorComponentSlideLineProps }) => {
    const { width, height, updateMainWidth } = props;
    const [ isHover, setIsHover ] = useState(false);
    const { Palette } = useContext(UiParamsContext);
    const style: React.CSSProperties = {
        backgroundColor: isHover ? Palette.Background.Darker : Palette.Background.Main,
        width, height,
        cursor: "col-resize",
        userSelect: "all"
    }
    const onMouseEnter = () => setIsHover(true);
    const onMouseLeave = () => setIsHover(false);
    return (
        <div style={style} 
            onMouseDown={updateMainWidth} 
            onMouseMove={onMouseEnter} 
            onMouseLeave={onMouseLeave}
            className={ClassNameKeyValues.verticalTransfer}  
            id="blog-editor-component-line-div">
        </div>
    );
}