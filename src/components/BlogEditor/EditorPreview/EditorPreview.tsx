import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { useContext } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { Blog } from "../../../models/state/Blog/type";
import { useScreenSize } from "../../../models/utils/ScreenSize";

export type EditorPreviewProps = {
    Blog: Blog,
}

export const EditorPreview = ({ props }: { props: EditorPreviewProps }) => {
    const { screenHeight } = useScreenSize();
    const { Palette } = useContext(UiParamsContext);
    const externalSx: SxProps<Theme> = {
        width: 600,
        height: screenHeight * 0.82,
        bgcolor: Palette.Background.Lightest,
        opacity: 1,
        borderRadius: 1,
    }
    return (
        <Box sx={externalSx}>
        </Box>
    );
}