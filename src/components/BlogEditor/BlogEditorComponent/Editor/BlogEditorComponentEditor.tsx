import { Box, SxProps, Theme } from "@mui/material";
import { BlogComponentType } from "../../../../models/state/BlogComponent/type";

export type BlogEditorComponentEditorProps = {
    width: number,
    height: number,
    activeComponentType: BlogComponentType | null
}

export const BlogEditorComponentEditor = ({ props }: { props: BlogEditorComponentEditorProps }) => {
    const { height, width, activeComponentType } = props;
    const outerSx: SxProps<Theme> = {
        width, height,
        overflow: "scroll"
    }
    return (
        <Box sx={outerSx}>
            <></>
        </Box>
    );
}