import { Box, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { getBlogComponentTypeList, getBlogComponentTypeName, getBlogComponentTypeNameList } from "../../models/state/BlogComponent/func";
import { BlogComponentType } from "../../models/state/BlogComponent/type";
import { DefaultTextButton, DefaultTextButtonProps } from "../Button/DefaultTextButton";
import { DefaultSelector, DefaultSelectorProps } from "../Selector/DefaultSelector";

export type ComponentMainEditorMenuProps = {
    width: number,
    height: number,
    sideMargin: number,
    componentType: BlogComponentType,
    addComponent: () => void,
    setComponentType: React.Dispatch<React.SetStateAction<BlogComponentType>>
}

export const ComponentMainEditorMenu = ({ props }: { props: ComponentMainEditorMenuProps }) => {
    const { width, height, sideMargin, setComponentType, componentType, addComponent } = props;
    const innerWidth = width - 2 * sideMargin;
    const menuInnerSideMargin = 4;
    const menuInnerUpDownMargin = 2;
    const menuActiveWidth = innerWidth - 2 * menuInnerSideMargin * 8;
    const menuActiveHeight = height - 2 * menuInnerUpDownMargin * 8;
    const columnWidth = menuActiveWidth / 2;
    const { Palette, Layout } = useContext(UiParamsContext);
    const itemArray = getBlogComponentTypeNameList();
    const types = getBlogComponentTypeList();
    const selectorWidth = columnWidth * 0.7;
    const buttonWidth = columnWidth - selectorWidth;
    const rowHeight = menuActiveHeight / 3;
    const selectorProps: DefaultSelectorProps = {
        label: "Type",
        array: itemArray,
        height: rowHeight,
        item:  getBlogComponentTypeName(componentType),
        width: selectorWidth,
        onChangeHandler: (i: number) => {
            setComponentType(types[i]);
        }
    }
    const buttonProps: DefaultTextButtonProps = {
        title: "ADD",
        height: rowHeight - 16,
        width: buttonWidth,
        onClickHandler: () => addComponent()
    }
    return (
        <Box sx={{ width, height }}>
            <Grid container sx={{ width: innerWidth, height, marginLeft: sideMargin / 8, bgcolor: Palette.Background.Light, borderRadius: Layout.BorderRadius }}>
                <Grid item sx={{ marginTop: menuInnerUpDownMargin, marginLeft: menuInnerSideMargin }}>
                    <Grid container sx={{ width: columnWidth, height: rowHeight }}>
                        <Grid item sx={{ width: selectorWidth, height: rowHeight }}> 
                            <DefaultSelector props={selectorProps} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={{ width: columnWidth, height: rowHeight }}>

                </Grid>
                <Grid item>
                    <Grid item  sx={{ width: buttonWidth, height: rowHeight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <DefaultTextButton props={buttonProps} />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}