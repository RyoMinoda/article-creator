import { Grid, Stack, SxProps, Typography } from "@mui/material";
import { Theme } from "@mui/system";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { BlogEditorMap, BlogEditorMapProps } from "../../components/BlogEditor/BlogEditorMap";
import { BlogEditorTopButtonGroup, BlogEditorTopButtonGroupProps } from "../../components/BlogEditor/ButtonGroup/BlogEditorTopButtonGroup";
import { CustomBreadcrumb, CustomBreadcrumbItemProps, CustomBreadcrumbProps } from "../../components/Breadcrumb/CustomBreadcrumb";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { BlogObj } from "../../models/state/Blog/obj";
import { Blog } from "../../models/state/Blog/type";
import { BlogComponentListItemObj } from "../../models/state/BlogComponent/obj";
import { BlogEditorMenuTabType, BlogEditorModeType, BlogEditorModeKeyValues, BlogEditorMenuTabKeyValues } from "../../components/BlogEditor/type";
import { BlogEditDetail, BlogEditFlow } from "../../models/state/BlogEditDetail/type";
import { useScreenSize } from "../../models/utils/ScreenSize/func";
import { BlogEditorModeMenu, BlogEditorModeMenuProps } from "../../components/BlogEditor/BlogEditorModeMenu/BlogEditorModeMenu";
import { getSubWindowDefaultWidth } from "../../components/BlogEditor/func";
import { BlogEditorSubmenu, BlogEditorSubmenuProps } from "../../components/BlogEditor/BlogEditorSubmenu/BlogEditorSubmenu";
import { MouseActionKeyValues, MousePosition } from "../../models/utils/MousePosition/type";
import { BlogListItemObj, BlogListObj } from "../../models/state/BlogList/obj";
import { BlogList } from "../../models/state/BlogList/type";
import { BlogTagListObj } from "../../models/state/BlogTag/obj";
import { BlogEditorSubmenuAccordionType, BlogEditorSubmenuSearchGenreKeyValues } from "../../components/BlogEditor/BlogEditorSubmenu/types";
import { defaultActiveSubmenus } from "../../components/BlogEditor/BlogEditorSubmenu/lib";
import { BlogEditorDialogType } from "./type";
import { BlogComponentKeyValues, BlogComponentType } from "../../models/state/BlogComponent/type";

export type BlogEditorProps = {
    Blog: BlogObj,
    BlogEditDetail: BlogEditDetail,
    BlogList: BlogListObj,
    BlogTagList: BlogTagListObj,
    BlogEditHistoryList: BlogListObj,
    mousePosition: MousePosition,
    save: () => void,
    showDialog: (type: BlogEditorDialogType) => void,
    updateBlog: (blog: BlogObj) => void,
}

export const BlogEditor = ({ props }: { props: BlogEditorProps }) => {
    const { Blog, BlogEditDetail, save, showDialog, mousePosition, BlogList, BlogTagList, updateBlog } = props;

    // States
    const { screenWidth, screenHeight } = useScreenSize();
    const { Layout, FontSize, Palette } = useContext(UiParamsContext);
    const initialComponents = Blog.Components.map((x) => BlogComponentListItemObj.createObj(x))
    const [ components, setComponents ] = useState<Array<BlogComponentListItemObj>>(initialComponents);
    const [ tabType, setTabType ] = useState<BlogEditorMenuTabType>(BlogEditorMenuTabKeyValues.Home);
    const [ modeType, setModeType ] = useState<BlogEditorModeType>(BlogEditorModeKeyValues.Component);
    const [ subWindowWidth, setSubWindowWidth ] = useState<number>(0);
    const [ activeAccordions, setActiveAccordions ] = useState<Array<BlogEditorSubmenuAccordionType>>(defaultActiveSubmenus);
    const [ canUpdateSubWindowWidth, setCanUpdateSubWindowWidth ] = useState(false);
    const [ activeComponentType, setActiveComponentType ] = useState<BlogComponentType | null>(null);

    useEffect(() => {
        const width = getSubWindowDefaultWidth(modeType, subWindowWidth);
        setSubWindowWidth(width);
    }, [])

    useEffect(() => {
        if (subWindowWidth > screenWidth / 2) {
            setSubWindowWidth(screenWidth / 2);
        }
    }, [screenWidth])

    useLayoutEffect(() => {
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
    const menuHeight = 150;
    const initialRowCount = 12;
    const menuBottomMargin = 4;
    const componentRowCount = components.length === 0 ? 0 : components.map(x => x.RowSpan).reduce((a, b) => a + b);
    const updateSubWindowWidth = () => setCanUpdateSubWindowWidth(true);
    const updateActiveAccordions = (accordions: Array<BlogEditorSubmenuAccordionType>) => {
        setActiveAccordions(accordions);
    }

    // Props
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
        showDialog,
        save
    }
    const editorProps: BlogEditorMapProps = {
        width: screenWidth - subWindowWidth - Layout.BlogEditorModeMenuWidth,
        height: mainHeight - Layout.BlogEditorTitleHeight,
        Blog,
        tabType, menuHeight,
        menuBottomMargin, modeType, mousePosition,
        emptyRowCount: componentRowCount + initialRowCount,
        activeComponentType,
        addComponent: (component: BlogComponentListItemObj) => {
            const newComponents = [ ...components, component ];
            setComponents(newComponents);  
        },
        updateComponent: (component: BlogComponentListItemObj) => {
            const newComponents = components.map((x) => {
                return x.BlogComponentId === component.BlogComponentId ? component : x;
            })
            setComponents(newComponents);
        },
        updateTabType: (tabType: BlogEditorMenuTabType) => setTabType(tabType),
        updateModeType: (modeType: BlogEditorModeType) => setModeType(modeType),
        showDialog,
    }
    const subWindowProps: BlogEditorSubmenuProps = {
        ...props,
        width: subWindowWidth, modeType, 
        height: mainHeight, mousePosition,
        updateSubWindowWidth,
        activeAccordions,
        updateBlog,
        updateActiveAccordions,
        activeComponentType,
        updateActiveComponentType: (componentType: BlogComponentType | null) => {
            setActiveComponentType(componentType);
        }
    }
    // Styles
    const modeMenuSx: SxProps<Theme> = {
        width: Layout.BlogEditorModeMenuWidth,
        height: mainHeight
    }
    const SubmenuSx: SxProps<Theme> = {
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
        bgcolor: Palette.Background.Dark
    }
    const blogTitleSx: SxProps<Theme> = {
        width: mainWidth - mainButtonsWidth,
        height: Layout.BlogEditorTitleHeight,
        paddingLeft: 2,
        display: "flex",
        alignItems: "center"
    }
    const typographySx: SxProps<Theme> = {
        cursor: "text",
        userSelect: "text"
    }
    return (
        <Grid container sx={{ width: screenWidth, height: screenHeight - Layout.TopMenuHeight }}>
            <Grid item sx={modeMenuSx}>
                <BlogEditorModeMenu props={editorModeMenuProps} />
            </Grid>
            <Grid item sx={SubmenuSx}>
                <BlogEditorSubmenu props={subWindowProps} />
            </Grid>
            <Grid item sx={editorMainContainerSx}>
                <Grid container>
                    <Grid container sx={editorTitleItemSx}>
                        <Grid item sx={blogTitleSx}>
                            <Typography fontSize={FontSize.Large} sx={typographySx}>
                                {Blog.Title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <BlogEditorTopButtonGroup props={blogButtonGroupProps} />
                        </Grid>
                    </Grid>
                    <Grid container sx={editorMainItemSx}>
                        <BlogEditorMap props={editorProps} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
