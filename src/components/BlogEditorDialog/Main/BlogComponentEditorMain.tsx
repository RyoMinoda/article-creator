import { Box, Grid, InputBase, InputBaseComponentProps, InputBaseProps, SxProps, Theme, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { BlogComponentListItemObj } from "../../../models/state/BlogComponent/obj";
import { BlogComponentContentListItemObj, BlogComponentContentListObj } from "../../../models/state/BlogComponentContent/obj";
import { getKeyBoardKeyFromCharCode } from "../../../models/utils/KeyBoard/func";
import { KeyboardKeyValues } from "../../../models/utils/KeyBoard/type";
import { getSelectionRange } from "../../../models/utils/SelectionRange/func";
import { SelectionRange } from "../../../models/utils/SelectionRange/type";
import { StorageOperationType } from "../../../utils/StorageOperation";

export type BlogComponentEditorMainProps = {
    width: number,
    height: number,
    BlogComponent: BlogComponentListItemObj,
    updateComponentContentList: (blogComponentContentList: BlogComponentContentListObj) => void,
    updateSelectRange: (range: SelectionRange) => void,
}

export const BlogComponentEditorMain = ({ props }: { props: BlogComponentEditorMainProps }) => {
    const { width, height, BlogComponent, updateComponentContentList, updateSelectRange } = props;
    const { Palette } = useContext(UiParamsContext);
    const initialText: string = BlogComponent.getContentList().getText();
    const [ text, setText ] = useState(initialText);
    const [ selectionStart, setSelectionStart ] = useState(0);
    const [ selectionEnd, setSelectionEnd ] = useState(0);
    const [ selectionIndex, setSelectionIndex ] = useState(0);
    useEffect(() => {
        if (selectionEnd > -1 && selectionEnd !== selectionStart) {
            updateSelectRange(getSelectionRange(selectionStart, selectionEnd));
        } 
    }, [selectionEnd]);
    useEffect(() => {
        console.log(selectionIndex);
    }, [selectionIndex])
    const outerSx: SxProps<Theme> = {
        position: "relative",
        width, 
        height,
        bgcolor: Palette.Background.Lightest,
    }
    const margin = 20;
    const inputHeight = height - margin;
    const inputWidth = width - margin;
    const boxSx: SxProps<Theme> = {
        position: "absolute",
        left: margin / 2,
        top: margin / 2,
        width: inputWidth, 
        height: inputHeight,
        bgcolor: "transparent"
    }
    const inputSx: SxProps<Theme> = {
        width: inputWidth,
        height: inputHeight, 
        bgcolor: "transparent",
    }
    const inputProps: InputBaseComponentProps = {
        style: {
            width: inputWidth,
            height: inputHeight,
            background: "transparent",
            color: "gray",
        }
    }
    const onMouseUpHandler: React.ReactEventHandler<HTMLDivElement | HTMLTextAreaElement> = (e: any) => {
        const { selectionStart, selectionEnd } = e.target;
        setSelectionStart(selectionStart);
        setSelectionEnd(selectionEnd);
        setSelectionIndex(selectionEnd);
    }
    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e: any) => {
        setText(e.target.value);
        var str = ""; 
        var list = BlogComponentContentListObj.create();
        for (const i in e.target.value) {
            const charCode = e.target.value.charCodeAt(i);
            const key = getKeyBoardKeyFromCharCode(charCode);
            switch (key) {
                case KeyboardKeyValues.Letter:
                    str = str + e.target.value[i];
                    break;
                case KeyboardKeyValues.Space:
                    str = str + e.target.value[i];
                    break;
                case KeyboardKeyValues.Enter:
                    const item = BlogComponentContentListItemObj.createFromText(str);
                    list.add(item);
                    str = "";
                    break;
                default: 
                    break;
            }
        }
        if (str !== "") {
            const item = BlogComponentContentListItemObj.createFromText(str);
            list.add(item);
        }
        updateComponentContentList(list);
    }
    const onKeyUpHandler: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e: any) => {
        setSelectionIndex(e.target.selectionEnd);
    }
    return (
        <Box sx={outerSx}>
            <Box sx={boxSx}>
                <InputBase
                    sx={inputSx} 
                    value={text} 
                    inputProps={inputProps} 
                    onChange={onChangeHandler}
                    onMouseUp={onMouseUpHandler}
                    onKeyUp={onKeyUpHandler}
                    multiline />
            </Box>
        </Box>
    );
}