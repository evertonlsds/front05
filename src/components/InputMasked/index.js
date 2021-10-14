import InputMask from 'react-input-mask';
import { Controller } from 'react-hook-form';

export default function InputMasked(props) {

    return (
        <Controller
            className={props.class}
            onChange={props.onChange}
            control={props.control}
            defaultValue={props.defaultValue}
            name={props.name}
            rules={props.rules}
            render={({ field: { onChange, onBlur, value, ref } }) => <InputMask
                mask={props.mask}
                defaultValue={props.defaultValue}
                value={value}
                onChange={onChange}>
                {(inputProps) => <input {...inputProps}
                    onChange={onChange}
                    placeholder={props.placeholder}
                    className={props.class}
                    type="text" />}
            </InputMask>}
        >
        </Controller >
    );
}
