import { Box, Skeleton, SxProps, Theme } from "@mui/material"
import { CSSProperties, useContext, useEffect, useState } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { BlogObj } from "../../models/state/Blog/obj";

export type BlogImageBoxProps = {
    Blog: BlogObj,
    alt: string,
    width: number,
    height: number,
    background: string,
}

export const BlogImageBox = ({ props }: { props: BlogImageBoxProps }) => {
    const { width, height, Blog, background } = props;
    const { Palette } = useContext(UiParamsContext);
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

    var Image = <Skeleton variant="rectangular" width={width} height={height} />;
    const imageStyle: CSSProperties = {
        width, 
        height,
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
    const outerBoxSx: SxProps<Theme> = {
        width,
        height, 
        background,
        borderRadius: 1,
        overflow: "hidden"
    }
    return (
        <Box sx={outerBoxSx}>
            {Image}
        </Box>
    );
}