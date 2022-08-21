import { styled, TextField } from "@mui/material";

const StyledTextField = styled(TextField)`
    padding: 4px 0 4px 0;
`;

export default function Input(props: any) {

    const { name, label, type, value, error = null, onChange, ...other } = props;
    
    return (
        <StyledTextField
            variant="outlined"
            label={label}
            type={type || "text"}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && {error:true,helperText:error})}
        />
    );
}