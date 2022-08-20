import { Container, Grid, SxProps } from "@mui/material";
import { Theme } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { BlogComponentEditor, BlogComponentEditorProps } from "../../components/BlogComponentEditor/BlogComponentEditor";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import { BlogTitleInput, BlogTitleInputProps } from "../../components/InputText/BlogTitleInput";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { Blog } from "../../models/state/Blog/type";
import { BlogComponentObj } from "../../models/state/BlogComponent/obj";
import { BlogComponent } from "../../models/state/BlogComponent/type";
import { useScreenSize } from "../../models/utils/ScreenSize";

export type BlogEditorProps = {
    Blog: Blog,
}

export const BlogEditor = ({ props }: { props: BlogEditorProps }) => {
    const { screenWidth } = useScreenSize();
    const [ editorWidth, setEditorWidth ] = useState(screenWidth);
    const [ components, setComponents ] = useState<Array<BlogComponentObj>>([]);
    useEffect(() => {
        setEditorWidth(screenWidth);
    }, [screenWidth]);
    const previewWidth = screenWidth - editorWidth;
    const { Blog } = props;
    const [ title, setTitle ] = useState(Blog.Title);
    const { Layout } = useContext(UiParamsContext);
    const blogTitleHeight = 80;
    const breadcrumbItemSx: SxProps<Theme> = {
        height: Layout.BreadcrumbHeight,
        width:  screenWidth,
    }
    const editorContainerHeight = components.length > 0 ?
        components.map(x => x.RowSpan).reduce((a, b) => a + b) : 0;
    const sideMargin = 6 * 8;
    const editorContainerSx: SxProps<Theme> = {
        width: editorWidth,
    }
    const titleInputProps: BlogTitleInputProps = {
        text: title, 
        setText: setTitle,
        height: blogTitleHeight,
        width: editorWidth,
        inputHeight: 50,
        sideMargin,
    }
    const menuHeight = 200;
    const emptyAreaHeight = 200;
    const menuBottomMargin = 4;
    const editorProps: BlogComponentEditorProps = {
        width: editorWidth,
        height: editorContainerHeight * Layout.BlogComponentRowHeight,
        components,
        sideMargin,
        menuHeight,
        emptyAreaHeight,
        menuBottomMargin,
        addComponent: (component: BlogComponentObj) => {
            const newComponents = [ ...components, component ];
            setComponents(newComponents);  
        },
        updateComponent: (component: BlogComponentObj) => {
            const newComponents = components.map((x) => {
                return x.BlogComponentId === component.BlogComponentId ? component : x;
            })
            setComponents(newComponents);
        }
    }
    const componentEditorItemHeight = editorContainerHeight == 0 ?
        emptyAreaHeight : editorContainerHeight * Layout.BlogComponentRowHeight;
    const editorTopBottomMargin = 3;
    const componentEditorItemSx: SxProps<Theme> = {
        height: componentEditorItemHeight + menuHeight + menuBottomMargin * 8,
        marginTop: editorTopBottomMargin,
        marginBottom: editorTopBottomMargin,
        width: editorWidth,
    }
    return (
        <Grid container sx={{ overflow: "hidden" }}>
            <Grid item sx={breadcrumbItemSx}>
                <Breadcrumb />
            </Grid>
            <Grid item>
                <Grid container sx={editorContainerSx}>
                    <Grid item sx={{ height: blogTitleHeight, width: editorWidth }}>
                        <BlogTitleInput props={titleInputProps} />
                    </Grid>
                    <Grid item sx={componentEditorItemSx}>
                        <BlogComponentEditor props={editorProps} />
                    </Grid>
                    <Grid item>

                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
