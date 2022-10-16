import { BlogComponentKeyValues, BlogComponentType } from "./type";
import ArticleIcon from '@mui/icons-material/Article';
import { SxProps, Theme } from "@mui/material";
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import ImageIcon from '@mui/icons-material/Image';
import SubjectIcon from '@mui/icons-material/Subject';
import HMobiledataIcon from '@mui/icons-material/HMobiledata';

export const getBlogComponentIcon = (componentType: BlogComponentType, sx: SxProps<Theme>) => {
    switch (componentType) {
        case BlogComponentKeyValues.Article:
            return <ArticleIcon sx={sx} />
        default:
            return <></>;
    }
}

export const GetSubmenuComponentItemIcon = (type: BlogComponentType, sx: SxProps<Theme>) => {
    switch (type) {
        case BlogComponentKeyValues.Headline:
            return <HMobiledataIcon sx={sx} />;
        case BlogComponentKeyValues.Article:
            return <SubjectIcon sx={sx} />;
        case BlogComponentKeyValues.Table:
            return <ViewQuiltIcon sx={sx} />;
        case BlogComponentKeyValues.Line:
            return <HorizontalRuleIcon sx={sx} />;
        case BlogComponentKeyValues.Image:
            return <ImageIcon sx={sx} />;
        default:
            return <></>;
    }
}
