import { useController,  type FieldValues, type UseControllerProps } from "react-hook-form"
import {DateTimePicker, type DateTimePickerProps} from '@mui/x-date-pickers'

type Props<T extends FieldValues>= {} & UseControllerProps<T> & DateTimePickerProps

export default function DateTimeIput<T extends FieldValues>(props:Props<T>) {
    const {field, fieldState} = useController({...props});

    return (
    
        <DateTimePicker
        {...props}
        value={field.value? new Date(field.value):null}
        onChange={value=>{field.onChange(new Date(value!))}}
        //onChange={(value: unknown) => field.onChange(value ? new Date(value as Date) : null)}
        sx={{width:'100%'}}
        slotProps={{textField:{onBlur:field.onBlur, error:!!fieldState.error, helperText:fieldState.error?.message}}}
        >

        </DateTimePicker>

  )
}
