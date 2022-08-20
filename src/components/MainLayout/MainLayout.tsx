import { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { UiParamsContext } from "../../models/context/UiParams/lib";
import { useScreenSize } from "../../models/utils/ScreenSize";
import TopMenu from "../TopMenu/TopMenu";

export type LayoutProps = {

}

const MainLayout = ({ props, children }: { props: LayoutProps, children: React.ReactElement }) => {
    const { screenHeight, screenWidth } = useScreenSize();
    const { Layout, Palette } = useContext(UiParamsContext);
    const mainHeight = screenHeight - Layout.TopMenuHeight;
    return (
        <Container>
            <Row style={{ height: Layout.TopMenuHeight, background: Palette.Main.Vivid }}>
                <TopMenu />
            </Row>
            <Row style={{ height: mainHeight, background: Palette.Background.Main, overflowY: "auto", overflowX: "hidden" }}>
                {children}
            </Row>
        </Container>
    );
}

export default MainLayout;