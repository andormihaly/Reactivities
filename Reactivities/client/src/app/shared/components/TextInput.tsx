import { TextField, type TextFieldProps } from "@mui/material";
import { useController, type UseControllerProps } from "react-hook-form"

type Props={}& UseControllerProps & TextFieldProps

export default function TextInput(props:Props) {
const {field, fieldState} = useController({...props});
    return (
    <TextField
    {...props}
    {...field}
    fullWidth
    variant ='outlined'
    error={!!fieldState.error}
    helperText={fieldState.error?.message}
    >
        
    </TextField>

  )
}
