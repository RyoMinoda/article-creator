import { Grid, SxProps, Theme } from "@mui/material";

export type BlogComponentEditorMainProps = {
    width: number,
    height: number,
}

export const BlogComponentEditorMain = ({ props }: { props: BlogComponentEditorMainProps }) => {
    const { width, height } = props;
    const marginTB = 1;
    const outerSx: SxProps<Theme> = {
        width, 
        height: height - 2 * 8 * marginTB,
    }
    const topRowHeight = 48;
    const topRowSx: SxProps<Theme> = {
        height: topRowHeight,
        width,
    }
    return (
        <Grid container sx={outerSx}>
            <Grid item>
                <Grid container sx={topRowSx}>
                    
                </Grid>
            </Grid>
        </Grid>
    );
}