import { Box, Skeleton, Stack, SxProps, Theme } from "@mui/material"
import { CSSProperties, useContext, useEffect, useState } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { BlogObj } from "../../models/state/Blog/obj";

export type BlogImageBoxProps = {
    Blog: BlogObj,
    alt: string,
    width: number,
    height: number,
    bgcolor: string,
    opacity: number,
    borderRadiusRight?: number,
    borderRadiusLeft?: number,
}

export const BlogImageBox = ({ props }: { props: BlogImageBoxProps }) => {
    const { width, height, Blog, bgcolor, opacity, borderRadiusRight, borderRadiusLeft } = props;
    const src = Blog.Thumbnail.Src;
    const none = "none";
    const noImageSrc = "http://design-ec.com/d/e_others_50/l_e_others_500.png";
    const [ imageSrc, setImageSrc ] = useState(none);
    useEffect(() => {
        if (Blog.BlogId === "") return; 
        if (src === "") {
            setImageSrc(noImageSrc);
        } else {
            setImageSrc(src);
        }
    }, [src]);
    const borderRadius = 3;
    const borderTopRightRadius = borderRadiusRight === undefined ? borderRadius : borderRadiusRight;
    const borderBottomRightRadius = borderRadiusRight === undefined ? borderRadius : borderRadiusRight;
    const borderTopLeftRadius = borderRadiusLeft === undefined ? borderRadius : borderRadiusLeft;
    const borderBottomLeftRadius = borderRadiusLeft === undefined ? borderRadius : borderRadiusLeft;
    var Image = <Skeleton variant="rectangular" width={width} height={height} />;
    const imageStyle: CSSProperties = {
        width, 
        height,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderTopLeftRadius,
        borderBottomLeftRadius,
        objectFit: Blog.Thumbnail.ObjectFit as any,
    }
    if (imageSrc !== none) {
        Image = (
            <img 
                src={imageSrc}
                style={imageStyle}
                 />
        );
    }
    const backgroundSx: SxProps<Theme> = {
        width,
        height,
        bgcolor,
        opacity,
        position: "absolute"
    }

    const outerBoxSx: SxProps<Theme> = {
        width,
        height, 
        overflow: "hidden",
        position: "absolute",
        borderTopRightRadius,
        borderBottomRightRadius,
        borderTopLeftRadius,
        borderBottomLeftRadius,
    }
    return (
        <Stack position="relative">
            <Box sx={backgroundSx}>
            </Box>
            <Box sx={outerBoxSx}>
                {Image}
            </Box>
        </Stack>
    );
}