import { BlogEditorComponentEditorMainHeadlineActive } from "./BlogEditorComponentEditorMainHeadlineActive";
import { BlogEditorComponentEditorMainComponentItemProps, BlogEditorComponentEditorMainComponentProps } from "../type";
import { BlogEditorComponentEditorMainHeadlineInactive } from "./BlogEditorComponentEditorMainHeadlineInactive";

export const BlogEditorComponentEditorMainHeadline = ({ props }: { props: BlogEditorComponentEditorMainComponentProps }) => {
    const { isActive, width, height } = props;
    const paddingLR = 2.0;
    const paddingTB = 1.0;
    const activeWidth = width - 2 * 8 * paddingLR;
    const activeHeight = height - 2 * 8 * paddingTB;
    const titleHeight = 20;
    const nextProps: BlogEditorComponentEditorMainComponentItemProps = {
        ...props,
        activeWidth,
        activeHeight,
        paddingTB,
        paddingLR,
        titleHeight,
    }
    return isActive ? 
        <BlogEditorComponentEditorMainHeadlineActive props={nextProps} /> : 
        <BlogEditorComponentEditorMainHeadlineInactive props={nextProps} />;
}


