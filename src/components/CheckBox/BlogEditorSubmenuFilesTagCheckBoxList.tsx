import { Checkbox, FormControl, FormControlLabel, FormGroup, SxProps, Theme } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { BlogTagListObj } from "../../models/state/BlogTag/obj";

export type BlogEditorSubmenuFilesTagCheckBoxListProps = {
    BlogTagList: BlogTagListObj,
    itemHeight: number,
    width: number,
    activeTagIdList: Array<string>,
    updateActiveTagIdList: (tags: Array<string>) => void,
}

export const BlogEditorSubmenuFilesTagCheckBoxList = ({ props }: { props: BlogEditorSubmenuFilesTagCheckBoxListProps }) => {
    const { activeTagIdList, itemHeight, width, updateActiveTagIdList, BlogTagList } = props;
    const { FontSize } = useContext(UiParamsContext);
    const checkBoxSx: SxProps<Theme> = {
        height: itemHeight * 0.5,      
    }
    const labelSx: SxProps<Theme> = {
        height: itemHeight,
        width,
    }
    const handleChange = (id: string, isChecked: boolean) => {
        if (isChecked) {
            const target = activeTagIdList.filter(x => x !== id);
            updateActiveTagIdList(target);
        } else {
            const target = [ ...activeTagIdList, id ];
            updateActiveTagIdList(target);
        }
    }
    return (
        <FormControl>
            <FormGroup sx={{ padding: 1 }}>
                {BlogTagList.Items.map((x) => {
                    const isChecked = activeTagIdList.includes(x.Id);
                    return (
                        <FormControlLabel key={x.Id}
                            control={ <Checkbox size="small" checked={isChecked} name={x.Tag} sx={checkBoxSx} />}
                            sx={labelSx}
                            onMouseDown={() => handleChange(x.Id, isChecked)}
                            componentsProps={{
                                typography: {
                                    fontSize: FontSize.Small
                                }
                            }}
                            label={x.Tag}
                        />
                    );
                })}
            </FormGroup>
        </FormControl>
    );
}