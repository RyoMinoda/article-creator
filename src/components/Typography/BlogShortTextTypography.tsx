import { Box, Grid, Skeleton, SxProps, Theme, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";

export type BlogShortTextTypographyProps = {
    width: number,
    height: number,
    blogId: string,
    color: string,
    rowCount: number,
}

export const BlogShortTextTypography = ({ props, children }: { props: BlogShortTextTypographyProps, children: string }) => {
    const { width, height, blogId, rowCount, color } = props;
    const [ id, setId ] = useState("");
    const { FontSize } = useContext(UiParamsContext);
    useEffect(() => {
        setId(blogId);
    }, [blogId])
    const boxSx: SxProps<Theme> = {
        width, height
    }
    const itemSx: SxProps<Theme> = {
        width, 
        height: height / rowCount,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    var Component = (
        <Grid container sx={boxSx}>
            {new Array(rowCount)
            .fill(0)
            .map((_, i) => {
                return (
                    <Grid item sx={itemSx} key={"empty-Skelton-" + i}>
                        <Skeleton variant="text" width={width} height={height / rowCount - 2} />
                    </Grid>
                )
            })}
        </Grid>
    );
    if (id !== "") {
        const typography: SxProps<Theme> = {
            width, height,
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: rowCount,
            color,
            paddingBottom: 1
        }
        Component = (
            <Typography sx={typography} fontSize={FontSize.Small}>
                {children}
            </Typography>
        );
    }
    return (
        <Box sx={boxSx}>
            {Component}
        </Box>
    );
}