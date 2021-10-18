import './styles.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt';
import { forwardRef } from 'react';
import { Controller } from 'react-hook-form';


registerLocale('pt', pt)


export default function CustomDatePicker(props) {
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className="datepicker" type='text' onClick={onClick} ref={ref}>
            {value}
        </div>));

    return (
        <Controller
            name='vencimento'
            control={props.control}
            rules={props.rules}
            render={({ field: { onChange, onBlur, value, ref } }) => (<DatePicker
                dateFormat="dd MMMM 'de' yyyy"
                selected={value}
                value={value}
                locale={pt}
                defaultValue={props.defaultValue}
                onChange={onChange}
                popperPlacement="top-start"
                customInput={<ExampleCustomInput />}
            />)
            } />
    );
};
