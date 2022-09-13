import { Grid, Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { useContext } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { PlainSelector, PlainSelectorProps } from "../../Selector/PlainSelector";
import { getPreviousWidthKey } from "./func";
import { PreviewWidthKeys, PreviewWidthValues } from "./type";

export type EditorPreviewHeaderProps = {
    height: number,
    width: number,
    previewWindowWidth: number,
    updatePreviewWindowWidth: (width: number) => void,
}

export const EditorPreviewHeader = ({ props }: { props: EditorPreviewHeaderProps }) => {
    const { width, height, previewWindowWidth, updatePreviewWindowWidth } = props;
    const { Palette, FontSize } = useContext(UiParamsContext);
    const externalSx: SxProps<Theme> = {
        width, height
    }
    const titleWidth = width * 0.4;
    const sliderItemWidth = width - titleWidth > 300 ? 300 : width - titleWidth;
    const titleSx: SxProps<Theme> = {
        width: width - sliderItemWidth, 
        height,
        display: "flex", alignItems: "center", justifyContent: "start",
        paddingLeft: 2
    }
    const sliderSx: SxProps<Theme> = {
        width: sliderItemWidth, height,
        display: "flex", alignItems: "center", justifyContent: "end"
    }
    const selectorProps: PlainSelectorProps = {
        width: sliderItemWidth - 50,
        height: height * 0.8,
        label: "Width",
        array: PreviewWidthKeys,
        item: getPreviousWidthKey(previewWindowWidth),
        onChangeHandler: (index: number) => {
            const value = PreviewWidthValues[index];
            updatePreviewWindowWidth(value);
        }
    }
    return (
        <Grid container sx={externalSx}>
            <Grid item sx={titleSx}>
                <Typography fontSize={FontSize.Large} color={Palette.FontColor.Main}>
                    Preview
                </Typography>
            </Grid>
            <Grid item sx={sliderSx}>
                <PlainSelector props={selectorProps} />
            </Grid>
        </Grid>
    );
}