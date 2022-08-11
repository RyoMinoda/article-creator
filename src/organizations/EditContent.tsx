import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { BlogTitleInput, BlogTitleInputProps } from "../components/InputText/BlogTitleInput";
import { Blog } from "../models/state/Blog/type";
import { useScreenSize } from "../models/utils/ScreenSize";

export type EditContentProps = {
    Blog: Blog,
}

export const EditContent = ({ props }: { props: EditContentProps }) => {
    const { screenWidth } = useScreenSize();
    const { Blog } = props;
    const [ title, setTitle ] = useState(Blog.Title);
    const blogTitleHeight = 60;
    const titleInputProps: BlogTitleInputProps = {
        text: title, 
        setText: setTitle,
        height: blogTitleHeight,
        width: screenWidth,
    }
    return (
        <Container>
            <Row style={{ height: blogTitleHeight }}>
                <BlogTitleInput props={titleInputProps} />
            </Row>
            <Row>

            </Row>
        </Container>
    );
}
