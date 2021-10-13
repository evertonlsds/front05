import './styles.css';
import SideBar from '../../components/SideBar';
import UserMenu from '../../components/UserMenu';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../routes.js';
import CustomDatePicker from '../../components/CustomDatePicker';
import SelectStatus from '../../components/SelectStatus';
import SelectClient from '../../components/SelectClient';
import Loading from '../../components/Loading';
import SuccessAlert from '../../components/SuccessAlert';
import ErrorAlert from '../../components/ErrorAlert';
import ModalUser from '../../components/ModalUser';
import InputValor from '../../components/InputValor';


export default function NewCharge() {
    const { handleSubmit, register, control, formState: { errors, isValid }, reset } = useForm({ mode: "onChange" });
    const { updateProfileSuccess, setUpdateProfileSuccess } = useContext(AuthContext);
    const [clients, setClients] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const [error, setError] = useState(false);

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
        setCarregando(true);

        const response = await fetch("https://api-desafio-05.herokuapp.com/cobrancas", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                "charset": "utf-8",
                'Authorization': `Bearer ${localStorage.getItem('token')} `
            },
            body: JSON.stringify(dados)
        });

        setCarregando(false);

        const resposta = await response.json();

        if (!response.ok) {
            setOpenErrorAlert(true)
            setError(resposta);
            return;
        }

        setOpenSuccessAlert(true);
        reset();
    }

    return (
        <div className="container-main">
            <SideBar />
            <div className='main-clients'>
                <UserMenu />
                <ModalUser />
                <SuccessAlert
                    openSuccessAlert={updateProfileSuccess}
                    setOpenSuccessAlert={setUpdateProfileSuccess}
                    message="Perfil atualizado com sucesso!" />
                <div className="clientContainerContent">
                    <h1 className="newClientTitle">/ / CRIAR COBRANÇA</h1>
                    <form className="new-charge-form" onSubmit={handleSubmit(addCharge)}>
                        <div className="input-div">
                            <label htmlFor="cliente">Cliente</label>
                            <SelectClient clients={clients}
                                control={control}
                                id="cliente" />
                        </div>
                        <div className="input-div">
                            <label htmlFor="nome">Descrição</label>
                            <input
                                id="descricao"
                                type="textfield"
                                className={errors.descricao?.type === 'required' ? "input-error custom-input" : "custom-input"}
                                placeholder={errors.descricao ? "Campo obrigatório!" : "Referente ao pagamento da compra online"}
                                {...register("descricao", { required: true })} />
                            <span className='description-alert'>A descrição informada será impressa no boleto.</span>
                        </div>
                        <div className="input-div">
                            <label htmlFor="nome">Status</label>
                            <SelectStatus
                                control={control} />
                        </div>
                        <div className="valor-vencimento">
                            <div className='flex-column'>
                                <label htmlFor="valor">Valor</label>
                                <InputValor
                                    control={control} />
                            </div>
                            <div className='flex-column'>
                                <label htmlFor="vencimento">Vencimento</label>
                                <CustomDatePicker
                                    control={control}
                                />
                            </div>
                        </div>
                        <div className="flex-row">
                            <button className="btn-white-pink" onClick={() => reset()}>Cancelar</button>
                            <button className={isValid ? "btn-pink" : "btn-disabled"} disabled={!isValid} type="submit">Criar Cobrança</button>
                        </div>
                    </form>
                </div>
                <Loading carregando={carregando} />
                <SuccessAlert
                    openSuccessAlert={openSuccessAlert}
                    setOpenSuccessAlert={setOpenSuccessAlert}
                    message="Cobrança cadastrada com sucesso!" />
                <ErrorAlert
                    openErrorAlert={openErrorAlert}
                    setOpenErrorAlert={setOpenErrorAlert}
                    error={error} />
            </div>
        </div>
    )
}