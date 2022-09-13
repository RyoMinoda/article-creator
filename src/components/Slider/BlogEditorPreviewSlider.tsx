import { Box, Slider, SxProps, Theme } from "@mui/material"
import { SliderMark } from "./type";

export type BlogEditorPreviewSliderProps = {
    width: number,
    height: number,
    previewWindowWidth: number,
    marks: Array<SliderMark>,
    updatePreviewWindowWidth: (width: number) => void,
    defaultValue: number,
}

export const BlogEditorPreviewSlider = ({ props }: { props: BlogEditorPreviewSliderProps }) => {
    const { width, height, previewWindowWidth, updatePreviewWindowWidth, marks, defaultValue } = props;
    const boxSx: SxProps<Theme> = {
        display: "flex", justifyContent: "center", alignItems: "center"
    }
    return (
        <Box width={width} height={height} sx={boxSx}>
            <Slider
                aria-label="blog-editor-preview-slider"
                defaultValue={defaultValue}
                valueLabelFormat={(value: number) => {
                    return marks.findIndex((mark) => mark.value === value) + 1;
                }}
                sx={{ color: "white" }}
                getAriaValueText={(value) => value.toString()}
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
            />
        </Box>
    )
}

