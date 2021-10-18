import './styles.css';
import { Controller } from 'react-hook-form';



export default function SelectClient(props) {
    const { clients } = props;



    return (
        <Controller name='cliente_id'
            control={props.control}
            rules={props.rules}
            render={({ field: { value, onChange, ref } }) => (
                <div className="select-status">
                    <select
                        name='cliente_id'
                        id='cliente_id'
                        value={value}
                        ref={ref}
                        onChange={onChange}>
                        <option style={{ "display": "none" }}>Selecione a cliente</option>
                        {clients && clients.map((client) => (<option value={client.id} key={client.id}>{client.nome}</option>))}
                    </select>
                </div>)} />
    );
}