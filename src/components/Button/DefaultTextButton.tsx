import { Button, SxProps, Theme } from "@mui/material";

export type DefaultTextButtonProps = {
    title: string,
    height: number,
    width: number,
    onClickHandler: () => void;
}

export const DefaultTextButton = ({ props }: { props: DefaultTextButtonProps }) => {
    const { title, width, height, onClickHandler } = props;
    const style: SxProps<Theme> = {
        width, height,
        padding: 0, margin: 0,
        textTransform: "none"
    }
    return (
        <Button variant="text" sx={style} onClick={() => onClickHandler()}>
            {title}
        </Button>
    );
}