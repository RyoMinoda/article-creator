import { Box, SxProps, Theme, Typography } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../../../models/context/UiParams/lib";
import { BlogComponentStyleKeyValues } from "../../../../../models/state/BlogComponent/type";
import { BlogEditorComponentArrangementComponentProps } from "./type";

export const BlogEditorComponentArrangementHeadline = ({ props }: { props: BlogEditorComponentArrangementComponentProps }) => {
    const { width, height, component } = props;
    const { FontSize } = useContext(UiParamsContext);
    const outerSx: SxProps<Theme> = {
        width, height, 
        display: "flex",
        alignItems: "center",
        paddingLeft: 1.0,
    }
    const styles = component.getComponentStyles();
    var fontSize = FontSize.Main;
    if (styles.length > 0) {
        switch (styles[0]) {
            case BlogComponentStyleKeyValues.HeadlineH1:
                fontSize = FontSize.Larger;
                break;
            case BlogComponentStyleKeyValues.HeadlineH2:
                fontSize = FontSize.Large;
                break;
            case BlogComponentStyleKeyValues.HeadlineH3:
                fontSize = FontSize.Main;
        }
    }
    return (
        <Box sx={outerSx}>
            <Typography fontSize={fontSize}>
                {component.StrContent}
            </Typography>
        </Box>
    );
}