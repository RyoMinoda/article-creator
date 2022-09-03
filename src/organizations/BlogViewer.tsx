import { Box } from "@mui/material"
import { Blog } from "../models/state/Blog/type"

export type BlogViewerProps = {
    Blog: Blog,
    width: number,
    height: number,
}

export const BlogViewer = ({ props }: { props: BlogViewerProps }) => {
    const { Blog, width, height } = props;
    return (
        <Box width={width} height={height}>
            
        </Box>
    )
}