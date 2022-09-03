import { BlogComponentType } from "./type";
import ArticleIcon from '@mui/icons-material/Article';
import { SxProps, Theme } from "@mui/material";

export const getBlogComponentIcon = (componentType: BlogComponentType, sx: SxProps<Theme>) => {
    switch (componentType) {
        case BlogComponentType.Article:
            return <ArticleIcon sx={sx} />
        default:
            return <></>;
    }
}