import { Box, SxProps, Theme } from "@mui/material";
import { BlogEditorSubmenuItemProps } from "../types";

export const BlogEditorSubmenuComponents = ({ props }: { props: BlogEditorSubmenuItemProps }) => {
    const { width, height } = props;
    const outerSx: SxProps<Theme> = {
        width,
        height,
    }
    return (
        <Box sx={outerSx}>
            
        </Box>
    );
}