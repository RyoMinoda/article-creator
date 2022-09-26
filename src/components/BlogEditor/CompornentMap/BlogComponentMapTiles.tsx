import { Grid, Typography } from "@mui/material";
import { Box, Stack, SxProps, Theme } from "@mui/system";
import { useContext } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { BlogComponentListItemObj } from "../../../models/state/BlogComponent/obj";
import DefaultButton, { DefaultButtonProps } from "../../Button/DefaultButton";

export type BlogComponentMapTileType = {
    cellHeight: number,
    cellWidth: number,
    rowCount: number,
    colCount: number,
    components: Array<BlogComponentListItemObj>,
}

export const BlogComponentMapTiles = ({ props }: { props: BlogComponentMapTileType }) => {
    const { Palette, FontSize } = useContext(UiParamsContext);
    const { cellWidth, cellHeight, rowCount, colCount, components } = props;
    const Components = components.map((component) => {
        const top = component.Y * cellHeight;
        const left = component.X * cellWidth;
        const height = component.RowSpan * cellHeight;
        const width = component.ColumnSpan * cellWidth;
        const sx: SxProps<Theme> = {
            position: "absolute",
            top, left, 
            width, 
            height,
            borderRadius: 1,
            bgcolor: component.getTileColor(Palette),
            border: "solid 1px",
            borderColor: Palette.FontColor.Main,
        }
        const props: DefaultButtonProps = {
            sx, 
            onClick: () => {

            }
        }
        const containerSx: SxProps<Theme> = {
            display: "flex", justifyContent: "center", alignItems: "center",
            width, 
            height,
        }
        const textItemSx: SxProps<Theme> = {
            width: width * 0.5,
            color: Palette.FontColor.Main,
            paddingLeft: 2,
            textAlign: "left"
        }
        const iconItemSx: SxProps = {
            width: width * 0.4,
            display: "flex", justifyContent: "flex-end", alignItems: "center",
        }
        const iconSx: SxProps<Theme> = {
            width: height,
            color: Palette.FontColor.Main
        }
        return (
            <DefaultButton key={component.BlogComponentId} props={props}>
                <Grid container sx={containerSx}>
                    <Grid item sx={iconItemSx}>
                        {component.getIcon(iconSx)}
                    </Grid>
                    <Grid item sx={textItemSx}>
                        <Typography fontSize={FontSize.Large}>
                            {component.ComponentType}
                        </Typography>
                    </Grid>
                </Grid>
            </DefaultButton>
        );
    });
    const exSx: SxProps<Theme> = {
        position: "relative",
    }
    return (
        <Stack sx={exSx}>
            {Components}
        </Stack>
    )
}