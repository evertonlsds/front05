import './styles.css';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form'


export default function CustomSelect(props) {
    const { clients } = props



    return (
        <div className='custom-select-div'>
            <label className='label-select' htmlFor="cliente_id">Cliente</label>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Controller
                    name='cliente_id'
                    control={props.control}
                    render={() => (<Select
                        displayEmpty
                        className='custom-select'
                        {...props.register({ required: true })}
                    >
                        <MenuItem disabled value=''>Nome da Cliente</MenuItem>
                        {clients && clients.map((client) => (
                            <MenuItem className='select-text' key={client.id} value={client.id}>{client.nome}</MenuItem>
                        ))}
                    </Select>)} />
            </FormControl>
        </div>
    );
}