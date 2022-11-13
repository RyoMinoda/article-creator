import { Box, Grid, InputBase, InputBaseComponentProps, InputBaseProps, SxProps, Theme, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { BlogComponentListItemObj } from "../../../models/state/BlogComponent/obj";
import { BlogComponentContentListItemObj, BlogComponentContentListObj } from "../../../models/state/BlogComponentContent/obj";
import { BlogComponentContentStyleListItemObj } from "../../../models/state/BlogComponentContentStyle/obj";
import { getKeyBoardKeyFromCharCode } from "../../../models/utils/KeyBoard/func";
import { KeyboardKeyValues } from "../../../models/utils/KeyBoard/type";
import { getSelectionRange } from "../../../models/utils/SelectionRange/func";
import { SelectionRange } from "../../../models/utils/SelectionRange/type";
import { StorageOperationType } from "../../../utils/StorageOperation";

export type BlogComponentEditorMainProps = {
    width: number,
    height: number,
    BlogComponent: BlogComponentListItemObj,
    BlogComponentContentStyleList: BlogComponentContentStyleListItemObj[],
    updateComponentContentList: (blogComponentContentList: BlogComponentContentListItemObj[]) => void,
    updateComponentContentStyleList: (blogComponentContentStyleList: BlogComponentContentStyleListItemObj[]) => void,
    updateSelectRange: (range: SelectionRange) => void,
}

export const BlogComponentEditorMain = ({ props }: { props: BlogComponentEditorMainProps }) => {
    const { width, height, BlogComponent, BlogComponentContentStyleList, updateComponentContentStyleList,
        updateComponentContentList, updateSelectRange } = props;
    const { Palette } = useContext(UiParamsContext);
    const initialText: string = BlogComponent.getContentList().getText();
    const [ text, setText ] = useState(initialText);
    const [ startIndex, setStartIndex ] = useState(0);
    const [ endIndex, setEndIndex ] = useState(0);
    const [ cursorIndex, setCursorIndex ] = useState(0);
    useEffect(() => {
        updateSelectRange(getSelectionRange(startIndex, endIndex));
    }, [endIndex]);

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
        if (selectionStart === selectionEnd) {
            setStartIndex(-1);
            setEndIndex(-1);
        } else {
            setStartIndex(selectionStart);
            setEndIndex(selectionEnd);
        }
        setCursorIndex(selectionEnd);
    }
    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e: any) => {
        const { selectionStart, selectionEnd } = e.target;
        if (selectionStart > 0) {
            const startInput = (e.target.value as string).substring(0, selectionStart);
            const endInput = (e.target.value as string).substring(selectionStart, e.target.value.length);
            console.log(startInput);
            console.log(endInput);
        } 
        setText(e.target.value);
        var str = ""; 
        var list: Array<BlogComponentContentListItemObj> = [];
        var start = 0;
        var end = 0;
        for (const i in e.target.value) {
            const charCode = e.target.value.charCodeAt(i);
            const key = getKeyBoardKeyFromCharCode(charCode);
            switch (key) {
                case KeyboardKeyValues.Space:
                    str = str + ' ';
                    break;
                case KeyboardKeyValues.Enter:
                    const item = BlogComponentContentListItemObj.createFromText(str, start, end, true);
                    list.push(item);
                    str = "";
                    start = end;
                    break;
                default: 
                    str = str + e.target.value[i];
                    break;
            }
            end++;
        }
        if (str !== "") {
            const item = BlogComponentContentListItemObj.createFromText(str, startIndex, endIndex, false);
            list.push(item);
        }
        updateComponentContentList(list);
        setStartIndex(-1);
        setEndIndex(-1);
    }
    const onKeyUpHandler: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e: any) => {
        const { selectionEnd } = e.target;
        setCursorIndex(selectionEnd);
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