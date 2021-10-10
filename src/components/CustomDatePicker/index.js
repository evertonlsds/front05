import './styles.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt';
import { forwardRef } from 'react'
import Calendar from '../../images/calendar.svg'
import { Controller } from 'react-hook-form'


registerLocale('pt', pt)


export default function CustomDatePicker(props) {
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="datepicker" onClick={onClick} ref={ref}>
            {value}
            <img src={Calendar} alt='calendar' />
        </button>));

    return (
        <Controller
            name='vencimento'
            control={props.control}
            render={({ field: { onChange, onBlur, value, ref } }) => (<DatePicker
                dateFormat="dd MMMM 'de' yyyy"
                selected={value}
                value={value}
                locale={pt}
                startDate={new Date()}
                onChange={onChange}
                popperPlacement="top-start"
                customInput={<ExampleCustomInput />}
            />)
            } />
    );
};
