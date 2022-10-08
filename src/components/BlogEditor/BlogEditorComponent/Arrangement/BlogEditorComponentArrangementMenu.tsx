import { Box, Pagination, SxProps, Theme } from "@mui/material";
import { BlogObj } from "../../../../models/state/Blog/obj";

export type BlogEditorComponentArrangementMenuProps = {
    width: number,
    height: number,
    currentPage: number,
    Blog: BlogObj,
    updateCurrentPage: (page: number) => void,
}

export const BlogEditorComponentArrangementMenu = ({ props }: { props: BlogEditorComponentArrangementMenuProps }) => {
    const { width, height, currentPage, updateCurrentPage } = props;
    const outerSx: SxProps<Theme> = {
        width, height: height - 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 1,
    }
    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
        updateCurrentPage(page);
    }
    return (
        <Box sx={outerSx}>
            <Pagination count={1} page={currentPage} onChange={handleChange} />
        </Box>
    );
}