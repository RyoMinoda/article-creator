import { Button, SxProps, Theme } from "@mui/material";

export type DefaultButtonProps = {
    sx: SxProps<Theme>,
    onClick: () => void,
}

const DefaultButton = ({ props, children }: { props: DefaultButtonProps, children: React.ReactNode }) => {
    const { sx, onClick } = props;
    const onClickHandler = () => onClick();
    const style: SxProps<Theme> = {
        ...sx,
        textTransform: "none"
    }
    return (
        <Button onClick={onClickHandler} sx={style}>
            {children}
        </Button>
    );
}

export default DefaultButton;