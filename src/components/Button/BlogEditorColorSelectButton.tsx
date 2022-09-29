import { Button, Grid, SxProps, Theme } from "@mui/material";
import { BlogEditorDialogType } from "../../organizations/BlogEditor/type"

export type BlogEditorColorSelectButtonProps = {
    width: number,
    height: number,
    color: string,
    transparentRow: number,
    onClick: () => void
}

export const BlogEditorColorSelectButton = ({ props }: { props: BlogEditorColorSelectButtonProps }) => {
    const { color, height, width, onClick, transparentRow } = props;
    const buttonSx: SxProps<Theme> = {
        bgcolor: color,
        minWidth: 0,
        minHeight: 0,
        width, height,
        padding: 0,
        margin: 0,
        overflow: "hidden",
        "&:hover": {
            backgroundColor: color
        },
        "&:active": {
            backgroundColor: color
        },
    }
    if (color === "transparent") {
        const count = 3;
        const colors = [ "white", "gray", "white", "gray", "white", "gray", "white", "gray", "white", "gray", "white", "gray" ];
        const containerSx: SxProps<Theme> = {
            width, height, overflow: "hidden"
        }
        const itemSx: SxProps<Theme> = {
            width: width / count,
            height: height / transparentRow
        }
        return (
            <Button sx={buttonSx} onClick={onClick}>
                <Grid container sx={containerSx}>
                    {Array(count * transparentRow).fill(0).map((x, i) => {
                        return <Grid item sx={{ ...itemSx, bgcolor: colors[i], opacity: 0.5 }} key={"transparent-color-" + i}></Grid>
                    })}
                </Grid>
            </Button>
        );
    }
    return (
        <Button sx={buttonSx} onClick={onClick}>
        </Button>
    );
}