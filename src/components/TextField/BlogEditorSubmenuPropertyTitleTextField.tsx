import { Box, InputBase, SxProps, Theme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { BlogEditorMenuPropertyComponentProps } from "../BlogEditor/BlogEditorSubmenu/Property/type";

export const BlogEditorSubmenuPropertyTitleTextField = ({ props }: { props: BlogEditorMenuPropertyComponentProps }) => {
    const { width, height, sidePadding, Blog, updateBlog } = props;
    const { Palette } = useContext(UiParamsContext);
    const [ title, setTitle ] = useState(Blog.Title);
    const [ rendering, setRendering ] = useState(0);

    useEffect(() => {
        setTitle(Blog.Title);
    }, [Blog])
    
    useEffect(() => {
        if (rendering > 0) {
            Blog.Title = title;
            updateBlog(Blog);
        }
    }, [title])

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
        paddingRight: 1
    }
    const handleChangeTitle: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setTitle(e.target.value);
        setRendering(rendering + 1);
    }
    return (
        <Box sx={boxSx}>
            <InputBase 
                value={title}
                onChange={handleChangeTitle}
                sx={textFieldSx} />
        </Box>
    )
}
