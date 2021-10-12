import './styles.css';
import { Controller } from 'react-hook-form';



export default function SelectStatus(props) {



    return (
        <Controller name='status'
            control={props.control}
            render={({ field: { value, onChange, ref } }) => (
                <div className="select-status">
                    <select
                        name='status'
                        id='status'
                        value={value}
                        ref={ref}
                        onChange={onChange}>
                        <option value='PENDENTE'>Pendente</option>
                        <option value='PAGO'>Pago</option>
                    </select>
                </div>)} />
    );
}