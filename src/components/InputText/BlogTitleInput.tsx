import { CSSProperties, useContext } from "react";
import { Form } from "react-bootstrap"
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { getInputStyle } from "./styles";

export type BlogTitleInputProps = {
    width: number,
    height: number,
    text: string,
    setText: React.Dispatch<React.SetStateAction<string>>
}

export const BlogTitleInput = ({ props }: { props: BlogTitleInputProps }) => {
    const { text, width, height } = props;
    const sideMargin = 3 * 8;
    const topBottomMargin = 1 * 8;
    const inputWidth = width - 2 * sideMargin;
    const inputHeight = height - topBottomMargin;
    const outerStyle: CSSProperties = {
        height,
        width,
        paddingTop: topBottomMargin,
        paddingLeft: sideMargin,
    }
    const  { FontSize } = useContext(UiParamsContext);
    const style = getInputStyle(inputWidth, inputHeight, FontSize.Large)
    return (
        <div style={outerStyle}>
            <input
                style={style}
                placeholder="Blog Title" 
                value={text} />
        </div>
    );
}