import InputMask from 'react-input-mask';
import { Controller } from 'react-hook-form';

export default function InputValor(props) {

    return (
        <Controller
            className='valor-input'
            value={props.value}
            onChange={props.onChange}
            control={props.control}
            name="valor"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ref } }) => <InputMask
                mask="R$ 9999,99"
                value={value}
                onChange={onChange}>
                {(inputProps) => <input {...inputProps}
                    className='valor-input'
                    type="text" />}
            </InputMask>}
        >
        </Controller>
    );
}


