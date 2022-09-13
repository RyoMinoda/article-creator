import { FormControl, MenuItem, Select, SelectChangeEvent, SxProps, Theme } from "@mui/material";
import { useState } from "react";

export type PlainSelectorProps = {
    label: string,
    array: Array<string>,
    item: string,
    width: number,
    height: number,
    onChangeHandler: (index: number) => void, 
}

export const PlainSelector = ({ props }: { props: PlainSelectorProps }) => {
    const { label, array, item, width, onChangeHandler, height } = props;
    const [ target, setTarget ] = useState<string>(item);
    const handler = (e: SelectChangeEvent<string>) => {
        var target = e.target.value;
        var index = array.indexOf(target);
        setTarget(array[index]);
        onChangeHandler(index);
    }
    const componentId = label + "-selector-label";
    const id = label + "id";
    const sx: SxProps<Theme> = {
        width: width - 16,
        height: height - 16,
        padding: 0,
        margin: 0
    }
    return (
        <FormControl sx={{ width }}>
            <Select
                labelId={componentId}
                id={id}
                value={target}
                onChange={handler}
                sx={sx}
                inputProps={{
                    sx: {
                        paddingLeft: 2,
                    }
                }}
                variant="standard"
                disableUnderline
                displayEmpty
                IconComponent={() => <></>}
            >
                {array.map((name, i) => (
                    <MenuItem value={name} key={i}>{name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}