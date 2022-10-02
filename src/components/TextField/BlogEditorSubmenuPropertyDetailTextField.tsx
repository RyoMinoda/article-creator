import { Box, InputBase, SxProps, Theme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { BlogEditorMenuPropertyComponentProps } from "../BlogEditor/BlogEditorSubmenu/Property/type";

export const BlogEditorSubmenuPropertyDetailTextField = ({ props } : { props: BlogEditorMenuPropertyComponentProps }) => {
    const { width, height, sidePadding, Blog, updateBlog } = props;
    const { Palette } = useContext(UiParamsContext);
    const [ detail, setDetail ] = useState(Blog.Detail);
    const [ rendering, setRendering ] = useState(0);

    useEffect(() => {
        setDetail(Blog.Detail);
    }, [Blog])
    
    useEffect(() => {
        if (rendering > 0) {
            Blog.Detail = detail;
            updateBlog(Blog);
        }
    }, [detail])

    const boxSx: SxProps<Theme> ={
        width, height,
        paddingLeft: sidePadding, 
    }
    const textFieldSx: SxProps<Theme> = {
        width: width - sidePadding * 2 * 8,
        height,
        minHeight: 0,
        bgcolor: Palette.Background.Light,
        paddingLeft: 1,
        paddingRight: 1,
        display: "flex",
        justifyContent: "start",
        alignItems: "start",
        overflow: "scroll"
    }
    const handleChangeTitle: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setDetail(e.target.value);
        setRendering(rendering + 1);
    }
    return (
        <Box sx={boxSx}>
            <InputBase 

                value={detail}
                onChange={handleChangeTitle}
                multiline={true}
                sx={textFieldSx} />
        </Box>
    )
}