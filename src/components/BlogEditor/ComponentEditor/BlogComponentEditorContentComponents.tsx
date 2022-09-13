import { Grid, SxProps, Theme } from "@mui/material";
import { useContext } from "react";
import { UiParamsContext } from "../../../models/context/UiParams/lib";
import { BlogComponentObj } from "../../../models/state/BlogComponent/obj";
import { MultiRowInput, MultiRowInputProps } from "../../InputText/MultiRowInput";

export type BlogComponentEditorContentComponentProps = {
    component: BlogComponentObj,
    onChangeComponent: (obj: BlogComponentObj) => void,
    onSelectComponent: (index: number) => void,
    marginTopBottom: number,
    marginSide: number,
    cellWidth: number,
    cellHeight: number,
}

export const BlogComponentEditorComponentHeadline = ({ props }: { props: BlogComponentEditorContentComponentProps }) => {
    return (<></>)
}

export const BlogComponentEditorComponentDocument = ({ props }: { props: BlogComponentEditorContentComponentProps }) => {
    const { component, marginTopBottom, marginSide, cellWidth, cellHeight, onChangeComponent, onSelectComponent } = props;
    const inputProps: MultiRowInputProps = {
        width: cellWidth * component.ColumnSpan,
        height: cellHeight * component.RowSpan,
        text: component.StrContent,
        key: "document-component-" + component.getComponentIndex(),
        row: component.RowSpan * 2,
        label: "Article",
        onChangeText: (text: string) => {
            component.setStrCountent(text);
            onChangeComponent(component);
        },
        onSelectText: () => {
            const index = component.getComponentIndex();
            onSelectComponent(index);
        }
    }
    return <MultiRowInput props={inputProps} />;
}

export const BlogComponentEditorComponentLine = ({ props }: { props: BlogComponentEditorContentComponentProps }) => {
    const { cellHeight, component, cellWidth } = props;
    const height = cellHeight * component.RowSpan / 2;
    const width = cellWidth * component.ColumnSpan;
    const sx: SxProps<Theme> = {
        height, width, borderBottom: "solid 1px gray"
    }
    return (
        <Grid sx={sx}></Grid>
    );
} 

export const BlogComponentEditorComponentPicture = ({ props }: { props: BlogComponentEditorContentComponentProps }) => {
    return (
        <Grid>

        </Grid>
    );
}