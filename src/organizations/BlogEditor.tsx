import { Grid, Stack, SxProps } from "@mui/material";
import { Theme } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { BlogComponentEditor, BlogComponentEditorProps } from "../components/BlogEditor/BlogComponentEditor";
import { BlogEditorTopButtonGroup, BlogEditorTopButtonGroupProps } from "../components/BlogEditor/BlogEditorTopButtonGroup";
import { ComponentEditorMenuTabType } from "../components/BlogEditor/ComponentEditorMenu/types";
import { CustomBreadcrumb, CustomBreadcrumbItemProps, CustomBreadcrumbProps } from "../components/Breadcrumb/CustomBreadcrumb";
import { BlogTitleInput, BlogTitleInputProps } from "../components/InputText/BlogTitleInput";
import { UiParamsContext } from "../models/context/UiParams/lib";
import { BlogObj } from "../models/state/Blog/obj";
import { Blog } from "../models/state/Blog/type";
import { BlogComponentObj } from "../models/state/BlogComponent/obj";
import { BlogComponent, BlogComponentType } from "../models/state/BlogComponent/type";
import { useScreenSize } from "../models/utils/ScreenSize";

export type BlogEditorProps = {
    Blog: Blog,
    save: (Blog: Blog) => void,
    preview: (Blog: Blog) => void,
}

export const BlogEditor = ({ props }: { props: BlogEditorProps }) => {
    const { Blog, save, preview } = props;

    const { screenWidth } = useScreenSize();
    const [ editorWidth, setEditorWidth ] = useState(screenWidth);
    const [ title, setTitle ] = useState(Blog.Title);
    const initialComponents = Blog.Components.map((x) => BlogComponentObj.createObj(x))
    const [ components, setComponents ] = useState<Array<BlogComponentObj>>(initialComponents);
    const [ thumbnail, setThumbnail] = useState(Blog.Thumbnail);
    const [ tabType, setTabType ] = useState<string>(ComponentEditorMenuTabType.Creation);

    const { Layout } = useContext(UiParamsContext);

    useEffect(() => {
        setEditorWidth(screenWidth);
    }, [screenWidth]);


    const blogTitleHeight = 80;
    const breadcrumbItemSx: SxProps<Theme> = {
        height: Layout.BreadcrumbHeight,
        width:  screenWidth,
    }
    const sideMargin = 6 * 8;
    const innerWidth = screenWidth - 2 * sideMargin;
    const titleWidth = innerWidth - 160;
    const editorTitleSx: SxProps<Theme> = {
        width: innerWidth,
        height: blogTitleHeight,
        marginLeft: sideMargin / 8
    }
    const titleInputProps: BlogTitleInputProps = {
        text: title, 
        setText: setTitle,
        height: blogTitleHeight,
        width: titleWidth,
        inputHeight: 50,
    }
    const blogButtonGroupProps:  BlogEditorTopButtonGroupProps = {
        width: innerWidth - titleWidth,
        height: blogTitleHeight,
        preview: () => {
            const blog = new BlogObj(Blog.BlogId, title, components, thumbnail);
            
        },
        save: () => {

        }
    }
    const menuHeight = 200;
    const initialRowCount = 12;
    const menuBottomMargin = 4;
    const componentRowCount = components.length === 0 ? 0 : components.map(x => x.RowSpan).reduce((a, b) => a + b);
    const emptyAreaHeight = (initialRowCount + componentRowCount) * Layout.BlogComponentRowHeight;
    const editorProps: BlogComponentEditorProps = {
        width: editorWidth,
        height: componentRowCount * Layout.BlogComponentRowHeight,
        components, tabType, sideMargin, menuHeight,
        menuBottomMargin,
        emptyRowCount: componentRowCount + initialRowCount,
        addComponent: (component: BlogComponentObj) => {
            const newComponents = [ ...components, component ];
            setComponents(newComponents);  
        },
        updateComponent: (component: BlogComponentObj) => {
            const newComponents = components.map((x) => {
                return x.BlogComponentId === component.BlogComponentId ? component : x;
            })
            setComponents(newComponents);
        },
        updateTabType: (tabType: string) => {
            setTabType(tabType);
        }
    }
    const componentEditorItemHeight = componentRowCount == 0 ?
        emptyAreaHeight : tabType == ComponentEditorMenuTabType.Creation ? emptyAreaHeight :
        componentRowCount * Layout.BlogComponentRowHeight;
    const editorTopBottomMargin = 3;
    const componentEditorItemSx: SxProps<Theme> = {
        height: componentEditorItemHeight + menuHeight + menuBottomMargin * 8,
        marginTop: editorTopBottomMargin,
        marginBottom: editorTopBottomMargin * 3,
        width: editorWidth,
    }
    const breadcrumbProps: CustomBreadcrumbProps = {
        items: [
            { text: "Blogs", href: "./" },
            { text: Blog.Title, href: "./" + Blog.BlogId },
            { text: "Edit", href: "" },
        ]
    }
    return (
        <Stack position="relative">
            <Grid container sx={{ position: "absolute", overflow: "hidden", zIndex: 0 }}>
                <Grid item sx={breadcrumbItemSx}>
                    <CustomBreadcrumb props={breadcrumbProps} />
                </Grid>
                <Grid item sx={{ marginTop: 2 }}>
                    <Grid container sx={editorTitleSx}>
                        <Grid item sx={{ height: blogTitleHeight, width: titleWidth }}>
                            <BlogTitleInput props={titleInputProps} />
                        </Grid>
                        <Grid item sx={{ height: blogTitleHeight, width: innerWidth - titleWidth }}>
                            <BlogEditorTopButtonGroup props={blogButtonGroupProps} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={componentEditorItemSx}>
                    <BlogComponentEditor props={editorProps} />
                </Grid>
            </Grid>
        </Stack>

    );
}
