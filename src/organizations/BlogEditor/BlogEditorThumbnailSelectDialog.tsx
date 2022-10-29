import { Box, SxProps, Theme } from "@mui/material";
import { useContext } from "react";
import { DialogLayout, DialogLayoutProps } from "../../components/Layout/DialogLayout";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { useScreenSize } from "../../models/utils/ScreenSize/func";
import { BlogEditorDialogProps } from "./type";

export const BlogEditorThumbnailSelectDialog = ({ props }: { props: BlogEditorDialogProps }) => {
    const { hideDialog, showDialog, type } = props;
    const { screenHeight, screenWidth } = useScreenSize();
    const { Palette } = useContext(UiParamsContext);
    const minWidth = 500;
    const layoutProps: DialogLayoutProps = {
        width: 700,
        minWidth, showDialog,
        height: screenHeight * 0.6,
        minHeight: screenHeight * 0.3,
        hideDialog, 
        type,
        title: "",
    }
    const innerSx: SxProps<Theme> = {
        width: "100%",
        height: "100%"
    }
    return (
        <DialogLayout props={layoutProps}>
            <Box sx={innerSx}>

            </Box>
        </DialogLayout>
    );
}