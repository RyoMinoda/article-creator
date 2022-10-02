import { Box, SxProps, Theme, Typography } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../../models/context/UiParams/lib";

export const BlogListItemComponentTag = ({ children }: { children: string }) => {
    const {  FontSize, Palette } = useContext(UiParamsContext);
    const tagSx: SxProps<Theme> = {
        marginLeft: 0.5,
        marginRight: 0.5,
        paddingRight: 1,
        paddingLeft: 1,
        borderStyle: "solid",
        borderWidth: 0.5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 18,
        marginBottom: 0.3,
        borderRadius: 10,
        color: Palette.FontColor.Dark
    }
    return (
        <Box sx={tagSx}>
            <Typography fontSize={FontSize.Smaller}>
                {children}
            </Typography>
        </Box>
    );
}