import { useContext } from "react"
import { Container } from "react-bootstrap";
import { UiParamsContext } from "../../models/context/UiParams/lib";


export const Breadcrumb = () => {
    const { Layout } = useContext(UiParamsContext);
    return (
        <Container style={{ height: Layout.BreadcrumbHeight, background: "red" }}>
        </Container>
    );   
}