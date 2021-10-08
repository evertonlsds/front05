import './styles.css';
import SideBar from '../../components/SideBar';
import UserMenu from '../../components/UserMenu';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../routes.js';
import CustomSelect from '../../components/CustomSelect';
import CustomDatePicker from '../../components/CustomDatePicker';

export default function NewCharge() {
    const history = useHistory();
    const { handleSubmit, register, control, formState: { errors } } = useForm();
    const [clients, setClients] = useState([]);
    const { token } = useContext(AuthContext);

    async function getClients() {

        const response = await fetch("https://api-desafio-05.herokuapp.com/clientes", {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                "charset": "utf-8",
                'Authorization': `Bearer ${token} `
            },
        });

        const resposta = await response.json();

        setClients(resposta);
    }

    useEffect(() => {
        getClients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function addCharge(dados) {
        console.log(dados)

        const response = await fetch("https://api-desafio-05.herokuapp.com/cobrancas", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                "charset": "utf-8",
                'Authorization': `Bearer ${token} `
            },
        });

        const resposta = await response.json();

        console.log(resposta)
    }

    return (
        <div className="container-main">
            <SideBar />
            <div className='main-clients'>
                <UserMenu />
                <div className="clientContainerContent">
                    <h1 className="newClientTitle">/ / CRIAR COBRANÇA</h1>
                    <form className="new-charge-form" onSubmit={handleSubmit(addCharge)}>
                        <CustomSelect clients={clients}
                            control={control}
                            id="cliente"
                            register={() => register('cliente_id', { required: true })} />
                        <div className="input-div">
                            <label htmlFor="nome">Descrição</label>
                            <input
                                id="descricao"
                                type="textfield"
                                className={errors.descricao?.type === 'required' ? "input-error custom-input" : "custom-input"}
                                placeholder={errors.descricao ? "Campo obrigatório!" : ""}
                                {...register("descricao", { required: true })} />
                        </div>
                        <CustomDatePicker
                            register={() => register('vencimento', { required: true })} />
                        <div className="buttonsDiv">
                            <button className="btn-white-pink" type="reset">Cancelar</button>
                            <button className="btn-pink" type="submit">Criar Cobrança</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}