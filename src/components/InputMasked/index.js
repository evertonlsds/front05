import InputMask from 'react-input-mask';
import { Controller } from 'react-hook-form';

export default function InputMasked(props) {

    return (
        <Controller
            className={props.class}
            value={props.value}
            onChange={props.onChange}
            control={props.control}
            name={props.name}
            rules={props.rules}
            render={({ field: { onChange, onBlur, value, ref } }) => <InputMask
                mask={props.mask}
                value={value}
                alwaysShowMask={false}
                onChange={onChange}>
                {(inputProps) => <input {...inputProps}
                    onChange={onChange}
                    value={value}
                    placeholder={props.placeholder}
                    className={props.class}
                    type="text" />}
            </InputMask>}
        >
        </Controller >
    );
}
