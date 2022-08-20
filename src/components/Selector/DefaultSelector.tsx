import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SxProps } from "@mui/material";
import { Theme } from "@mui/system";
import { useState } from "react";

export type DefaultSelectorProps = {
    label: string,
    array: Array<string>,
    item: string,
    width: number,
    height: number,
    onChangeHandler: (index: number) => void, 
}

export const DefaultSelector = ({ props }: { props: DefaultSelectorProps }) => {
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
        margin: 0,
    }
    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id={componentId}>{label}</InputLabel>
            <Select
                labelId={componentId}
                id={id}
                value={target}
                label={label}
                onChange={handler}
                sx={sx}
            >
                {array.map((name, i) => (
                    <MenuItem value={name} key={i}>{name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}