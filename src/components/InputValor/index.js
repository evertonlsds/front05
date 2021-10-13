import NumberFormat from 'react-number-format';
import { Controller } from 'react-hook-form';

export default function InputValor(props) {

    return (
        <Controller
            render={({ field }) => (
                <NumberFormat
                    thousandSeparator={false} {...field}
                    onChange={field.onChange}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    decimalSeparator=","
                    onBlur={field.onBlur}
                    prefix="R$"
                    type='text'
                    className="valor-input" />
            )}
            name="valor"
            rules={{ required: true }}
            control={props.control}

        />
    );
}


