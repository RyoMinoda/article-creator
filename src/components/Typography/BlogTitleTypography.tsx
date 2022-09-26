import { Box, Skeleton, SxProps, Theme, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BlogObj } from "../../models/state/Blog/obj"

export type BlogTitleTypographyProps = {
    Blog: BlogObj,
    width: number,
    height: number,
    fontSize?: number
}

export const BlogTitleTypography = ({ props, children }: { props: BlogTitleTypographyProps, children: string }) => {
    const { width, height, Blog, fontSize } = props;
    const [ id, setId ] = useState("");
    useEffect(() => {
        if (Blog.BlogId === "") return;
        setId(Blog.BlogId);
    }, [Blog.BlogId])
    const boxSx: SxProps<Theme> = {
        width, height,
    }
    const typographySx: SxProps<Theme> = {
        width, height,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    }
    var Component = <Skeleton variant="text" width={width} height={height} />;
    if (id !== "") {
        Component = (
            <Typography fontSize={fontSize} fontWeight="bolder" sx={typographySx}>
                {children}
            </Typography>
        )
    }
    return (
        <Box sx={boxSx}>
            {Component}
        </Box>
    );
}