import { SxProps, Theme } from "@mui/material";
import { BlogComponentKeyValues, BlogComponentType } from "../../../../models/state/BlogComponent/type";
import { BlogEditorSubmenuAccordionKeyValues, BlogEditorSubmenuAccordionType } from "../types";
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import ImageIcon from '@mui/icons-material/Image';
import SubjectIcon from '@mui/icons-material/Subject';
import HMobiledataIcon from '@mui/icons-material/HMobiledata';

export const GetSubmenuComponentItemHeight = (
    type: BlogEditorSubmenuAccordionType, 
    height: number, 
    accordions: Array<BlogEditorSubmenuAccordionType>, 
    activeAccordions: Array<BlogEditorSubmenuAccordionType>, 
    titleHeight: number
) => {
    const targetHeight = height - accordions.length * titleHeight - 10;
    const unit = targetHeight / 7;
    switch (type) {
        case BlogEditorSubmenuAccordionKeyValues.ComponentCreate:
            return unit * 2;
        case BlogEditorSubmenuAccordionKeyValues.ComponentEdit:
            if (activeAccordions.includes(BlogEditorSubmenuAccordionKeyValues.ComponentProperty)) {
                return unit * 2;
            }
            return unit * 5;
        case BlogEditorSubmenuAccordionKeyValues.ComponentProperty:
            return 0;
        default:
            return 0;
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

export const GetSubmenuComponentTypes = () => {
    return [

        BlogEditorSubmenuAccordionKeyValues.ComponentCreate,
        BlogEditorSubmenuAccordionKeyValues.ComponentEdit,
        BlogEditorSubmenuAccordionKeyValues.ComponentProperty,
    ];
}
