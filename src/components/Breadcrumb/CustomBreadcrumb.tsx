import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import { useContext } from "react"
import { UiParamsContext } from "../../models/context/UiParams/lib";

export type CustomBreadcrumbProps = {
    items: Array<CustomBreadcrumbItemProps>
}

export type CustomBreadcrumbItemProps = {
    text: string,
    href: string,
}

export const CustomBreadcrumb = ({ props }: { props: CustomBreadcrumbProps }) => {
    const { items } = props;
    const { Layout, Palette } = useContext(UiParamsContext);
    return (
        <Grid sx={{ height: Layout.BreadcrumbHeight, background: Palette.Background.Main }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ display: "flex", alignItems: "center", height: Layout.BreadcrumbHeight, paddingLeft: 2 }}>
                {items.map((item, i) => {
                    const key = "breadcrumb-key-" + i.toString();
                    if (item.href == "") {
                        return (
                            <Link underline="hover" href={item.href} key={key}>
                                {item.text}
                            </Link>
                        );
                    }
                    return (
                        <Typography color="text.primary" key={key} sx={{ color: Palette.FontColor.Main }}>
                            {item.text}
                        </Typography>
                    );
                })}
            </Breadcrumbs>
        </Grid>
    );   
}