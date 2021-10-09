import './styles.css';
import SideBar from '../../components/SideBar';
import UserMenu from '../../components/UserMenu';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import CustomSelect from '../../components/CustomSelect';
import CustomDatePicker from '../../components/CustomDatePicker';


export default function NewCharge() {
    const { handleSubmit, register, control, formState: { errors } } = useForm();
    const [clients, setClients] = useState([]);

    async function getClients() {

        const response = await fetch("https://api-desafio-05.herokuapp.com/clientes", {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                "charset": "utf-8",
                'Authorization': `Bearer ${localStorage.getItem('token')} `
            },

        });

        const resposta = await response.json();

        setClients(resposta.clientesDoUsuario);
    }

    useEffect(() => {
        getClients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function addCharge(dados) {

        const response = await fetch("https://api-desafio-05.herokuapp.com/cobrancas", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                "charset": "utf-8",
                'Authorization': `Bearer ${localStorage.getItem('token')} `
            },
            body: JSON.stringify(dados)
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
                        <div className="input-div">
                            <label htmlFor="nome">Vencimento</label>
                            <CustomDatePicker
                                control={control}
                            />
                        </div>
                        <div className="input-div">
                            <label htmlFor="nome">Status</label>
                            <input
                                id="status"
                                type="text"
                                className={errors.descricao?.type === 'required' ? "input-error custom-input" : "custom-input"}
                                placeholder={errors.descricao ? "Campo obrigatório!" : ""}
                                {...register("status", { required: true })} />
                        </div>
                        <div className="input-div">
                            <label htmlFor="nome">Valor</label>
                            <input
                                id="descricao"
                                type="text"
                                className={errors.descricao?.type === 'required' ? "input-error custom-input" : "custom-input"}
                                placeholder={errors.descricao ? "Campo obrigatório!" : ""}
                                {...register("valor", { required: true })} />
                        </div>
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