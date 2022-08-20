import { Box, Grid, SxProps, Theme } from "@mui/material"
import { useContext } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";

export type BlogEmptyComponentProps = {
    height: number,
    width: number
}

export const BlogEmptyComponent = ({ props }: { props: BlogEmptyComponentProps }) => {
    const { height, width } = props;
    const { FontSize, Palette } = useContext(UiParamsContext);
    const innerHeight = height * 0.5;
    const marginTop = (height - innerHeight) / 2 / 8;
    const innerWidth = width * 0.8;
    const marginLeft = (width - innerWidth) / 2 / 8;
    const innerStyle: SxProps<Theme> = {
        height: innerHeight, 
        width: innerWidth,
        marginTop,
        marginLeft,
        borderRadius: 3,
        border: "dashed 1px",
        color: Palette.Main.Light
    };
    const gridContainerSx: SxProps<Theme> = {
        display: "flex",
        width: innerWidth,
        height: innerHeight,
        justifyContent: "center",
        alignItems: "center"
    }
    const charFontSx: SxProps<Theme> = {
        fontSize: FontSize.Larger,
    }
    return (
        <Box sx={{ height, width }}>
            <Box sx={innerStyle}>
                <Grid container sx={gridContainerSx}>
                    <Grid item sx={charFontSx}>
                        No Components
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

