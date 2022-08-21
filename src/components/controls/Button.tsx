import { Button as MuiButton, styled } from "@mui/material";

const StyledButton = styled(MuiButton)`
    margin: 4px 4px 4px 8px;
    text-transform: none;
`;

export default function Button(props: any) {

    const { text, size, color, variant, onClick, ...other } = props;

    return (
        <StyledButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            >
                {text}
        </StyledButton>
    );
}