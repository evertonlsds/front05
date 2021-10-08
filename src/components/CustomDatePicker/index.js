import './styles.css';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function CustomDatePicker(props) {
    const [value, setValue] = useState(null);

    return (
        <div className='custom-datepicker-div'>
            <label htmlFor="nome">Vencimento</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label=""
                    value={value}
                    className='custom-datepicker'
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    {...props.register({ required: true })}
                />
            </LocalizationProvider>
        </div>
    );
}