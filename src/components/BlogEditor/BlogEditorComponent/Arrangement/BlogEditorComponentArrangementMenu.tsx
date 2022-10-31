import { Box, Pagination, SxProps, Theme } from "@mui/material";
import { BlogObj } from "../../../../models/state/Blog/obj";
import { BlogPageObj } from "../../../../models/state/BlogPage/obj";
import { StorageOperationKeyValues, StorageOperationType } from "../../../../utils/StorageOperation";

export type BlogEditorComponentArrangementMenuProps = {
    width: number,
    height: number,
    Blog: BlogObj,
    BlogPage: BlogPageObj,
    updateBlogPage: (page: number, operation: StorageOperationType) => void,
}

export const BlogEditorComponentArrangementMenu = ({ props }: { props: BlogEditorComponentArrangementMenuProps }) => {
    const { width, height, updateBlogPage, BlogPage } = props;
    const outerSx: SxProps<Theme> = {
        width, height: height - 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 1,
    }
    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
        updateBlogPage(page, StorageOperationKeyValues.Update);
    }
    return (
        <Box sx={outerSx}>
            <Pagination count={1} page={BlogPage.Index} onChange={handleChange} />
        </Box>
    );
}