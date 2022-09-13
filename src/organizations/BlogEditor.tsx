import { Grid, Stack, SxProps } from "@mui/material";
import { Theme } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { BlogEditorMap, BlogEditorMapProps } from "../components/BlogEditor/BlogEditorMap";
import { BlogEditorTopButtonGroup, BlogEditorTopButtonGroupProps } from "../components/BlogEditor/ButtonGroup/BlogEditorTopButtonGroup";
import { CustomBreadcrumb, CustomBreadcrumbItemProps, CustomBreadcrumbProps } from "../components/Breadcrumb/CustomBreadcrumb";
import { BlogTitleInput, BlogTitleInputProps } from "../components/InputText/BlogTitleInput";
import { UiParamsContext } from "../models/context/UiParams/lib";
import { BlogObj } from "../models/state/Blog/obj";
import { Blog } from "../models/state/Blog/type";
import { BlogComponentObj } from "../models/state/BlogComponent/obj";
import { BlogEditorMenuTabType, BlogEditorModeType, BlogEditorModeKeyValues, BlogEditorMenuTabKeyValues } from "../components/BlogEditor/type";
import { BlogEditDetail, BlogEditFlow } from "../models/state/BlogEditDetail/type";
import { useScreenSize } from "../models/utils/ScreenSize/func";
import { BlogEditorModeMenu, BlogEditorModeMenuProps } from "../components/BlogEditor/BlogEditorModeMenu/BlogEditorModeMenu";
import { getSubWindowDefaultWidth } from "../components/BlogEditor/func";
import { BlogEditorSubMenu, BlogEditorSubMenuProps } from "../components/BlogEditor/BlogEditorSubMenu/BlogEditorSubMenu";
import { MouseActionKeyValues, MousePosition } from "../models/utils/MousePosition/type";
import { BlogListItemObj, BlogListObj } from "../models/state/BlogList/obj";

export type BlogEditorProps = {
    Blog: Blog,
    BlogEditDetail: BlogEditDetail,
    mousePosition: MousePosition,
    save: (Blog: Blog) => void,
    preview: (Blog: Blog) => void,
}

export const BlogEditor = ({ props }: { props: BlogEditorProps }) => {
    const { Blog, BlogEditDetail, save, preview, mousePosition } = props;

    // States
    const { screenWidth, screenHeight } = useScreenSize();
    const { Layout } = useContext(UiParamsContext);
    const [ title, setTitle ] = useState(Blog.Title);
    const initialComponents = Blog.Components.map((x) => BlogComponentObj.createObj(x))
    const [ components, setComponents ] = useState<Array<BlogComponentObj>>(initialComponents);
    const [ thumbnail, setThumbnail] = useState(Blog.Thumbnail);
    const [ tabType, setTabType ] = useState<BlogEditorMenuTabType>(BlogEditorMenuTabKeyValues.Home);
    const [ modeType, setModeType ] = useState<BlogEditorModeType>(BlogEditorModeKeyValues.Files);
    const [ subWindowWidth, setSubWindowWidth ] = useState<number>(0);
    const [ canUpdateSubWindowWidth, setCanUpdateSubWindowWidth ] = useState(false);
    const [ flows, setFlows ] = useState<Array<BlogEditFlow>>(BlogEditDetail.Flows);

    useEffect(() => {
        const width = getSubWindowDefaultWidth(modeType, subWindowWidth);
        setSubWindowWidth(width);
    }, [])

    useEffect(() => {
        if (subWindowWidth > screenWidth / 2) {
            setSubWindowWidth(screenWidth / 2);
        }
    }, [screenWidth])

    useEffect(() => {
        if (mousePosition.action === MouseActionKeyValues.MouseUp || mousePosition.action === MouseActionKeyValues.DragEnd) {
            setCanUpdateSubWindowWidth(false);
            return;
        }
        if (canUpdateSubWindowWidth) {
            const width = mousePosition.x - Layout.BlogEditorModeMenuWidth;
            if (Layout.BlogEditorModeMenuWidth + 100 < width && width < screenWidth / 2 && width % 10 === 0) {
                setSubWindowWidth(width);
            }
            return;
        }
    }, [mousePosition]);

    // Consts
    const mainWidth = screenWidth - Layout.BlogEditorModeMenuWidth - subWindowWidth;
    const mainHeight = screenHeight - Layout.TopMenuHeight;
    const mainButtonsWidth = 160;
    const titleWidth = mainWidth - mainButtonsWidth;
    const menuHeight = 150;
    const initialRowCount = 12;
    const menuBottomMargin = 4;
    const componentRowCount = components.length === 0 ? 0 : components.map(x => x.RowSpan).reduce((a, b) => a + b);
    const updateSubWindowWidth = () => setCanUpdateSubWindowWidth(true);

    // Props
    const titleInputProps: BlogTitleInputProps = {
        defaultText: title, 
        updateText: (value: string) => {
            setTitle(value);
        },
        height: Layout.BlogEditorTitleHeight,
        width: titleWidth
    }
    const editorModeMenuProps: BlogEditorModeMenuProps = {
        width: Layout.BlogEditorModeMenuWidth,
        height: mainHeight,
        modeType,
        updateModeType: (modeType: BlogEditorModeType) => {
            const width = getSubWindowDefaultWidth(modeType, subWindowWidth);
            setModeType(modeType);
            setSubWindowWidth(width);
        }
    }
    const blogButtonGroupProps:  BlogEditorTopButtonGroupProps = {
        width: mainButtonsWidth,
        height: Layout.BlogEditorTitleHeight,
        preview: () => {
            const blog = new BlogObj(Blog.BlogId, title, components, thumbnail);
            preview(blog);
        },
        save: () => {
            const blog = new BlogObj(Blog.BlogId, title, components, thumbnail);
            save(blog);
        }
    }
    const editorProps: BlogEditorMapProps = {
        width: screenWidth,
        height: componentRowCount * Layout.BlogComponentRowHeight,
        components, tabType, menuHeight,
        menuBottomMargin, modeType,
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
        updateTabType: (tabType: BlogEditorMenuTabType) => setTabType(tabType),
        updateModeType: (modeType: BlogEditorModeType) => setModeType(modeType),
    }
    const subWindowProps: BlogEditorSubMenuProps = {
        width: subWindowWidth, modeType,
        height: mainHeight, mousePosition,
        updateSubWindowWidth
    }

    // Styles
    const modeMenuSx: SxProps<Theme> = {
        width: Layout.BlogEditorModeMenuWidth,
        height: mainHeight
    }
    const subMenuSx: SxProps<Theme> = {
        height: mainHeight,
        width: subWindowWidth
    }
    const editorMainContainerSx: SxProps<Theme> = {
        width: mainWidth,
        height: mainHeight,
    }
    const editorMainItemSx: SxProps<Theme> = {
        width: mainWidth,
        height: mainHeight - Layout.BlogEditorTitleHeight
    }
    const editorTitleItemSx: SxProps<Theme> = {
        width: mainWidth,
        height: Layout.BlogEditorTitleHeight,
    }
    return (
        <Grid container sx={{ width: screenWidth, height: screenHeight - Layout.TopMenuHeight }}>
            <Grid item sx={modeMenuSx}>
                <BlogEditorModeMenu props={editorModeMenuProps} />
            </Grid>
            <Grid item sx={subMenuSx}>
                <BlogEditorSubMenu props={subWindowProps} />
            </Grid>
            <Grid item sx={editorMainContainerSx}>
                <Grid container>
                    <Grid container sx={editorTitleItemSx}>
                        <BlogTitleInput props={titleInputProps} />
                        <BlogEditorTopButtonGroup props={blogButtonGroupProps} />
                    </Grid>
                    <Grid container sx={editorMainItemSx}>
                        <BlogEditorMap props={editorProps} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
