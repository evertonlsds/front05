import './styles.css';
import CloseIcon from '../../images/close.svg';
import { useForm } from 'react-hook-form';
import CustomDatePicker from '../../components/CustomDatePicker';
import SelectStatus from '../../components/SelectStatus';
import SelectClient from '../../components/SelectClient';
import Loading from '../../components/Loading';
//import SuccessAlert from '../../components/SuccessAlert';
//import ErrorAlert from '../../components/ErrorAlert';
import InputValor from '../../components/InputValor';
import Trash from '../../images/trash.svg';
import { useEffect, useState } from 'react';


function ModalChargeEdit({ setOpenModalChargeEdit, openModalChargeEdit, selectedChargeID, setOpenErrorAlert, setError, setUpdateChargeSuccess }) {


    const { handleSubmit, register, control, formState: { errors }, reset } = useForm({ mode: "onChange" });
    const [selectedCharge, setSelectedCharge] = useState([]);
    const [carregando, setCarregando] = useState(false)

    async function getCharge() {

        const response = await fetch(`https://api-desafio-05.herokuapp.com/cobrancas/${selectedChargeID}`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                "charset": "utf-8",
                'Authorization': `Bearer ${localStorage.getItem('token')} `
            },
        });

        const resposta = await response.json();

        setSelectedCharge(resposta)
        console.log(selectedCharge)

    }
    async function updateCharge(dados) {
        setCarregando(true);

        const response = await fetch(`https://api-desafio-05.herokuapp.com/cobrancas/${selectedChargeID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
                "charset": "utf-8",
                'Authorization': `Bearer ${localStorage.getItem('token')} `
            },
            body: JSON.stringify(dados)
        });

        const resposta = await response.json();

        setSelectedCharge(resposta)
        setCarregando(false);
        console.log(selectedCharge)

        if (!response.ok) {
            setOpenErrorAlert(true);
            setError(resposta);
            return;
        }
        setUpdateChargeSuccess(true);
        setOpenModalChargeEdit(false);

    }

    useEffect(() => {
        getCharge();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedChargeID])
    useEffect(() => {
        reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openModalChargeEdit])
    useEffect(() => {
        getCharge();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {openModalChargeEdit &&
                <div className="modalChargeEdit">
                    <div className="modalContatChargeEdit">
                        <img src={CloseIcon}
                            alt="close"
                            className="closeIcon"
                            onClick={() => setOpenModalChargeEdit(false)}
                        />
                        <form className="new-charge-form" onSubmit={handleSubmit(updateCharge)}>
                            <div className="input-div">
                                <label htmlFor="cliente">Cliente</label>
                                <SelectClient
                                    control={control}
                                    id="cliente"
                                    defaultValue={selectedCharge.nome} />
                            </div>
                            <div className="input-div">
                                <label htmlFor="nome">Descrição</label>
                                <input
                                    id="descricao"
                                    type="textfield"
                                    className={errors.descricao?.type === 'required' ? "input-error custom-input" : "custom-input"}
                                    placeholder={errors.descricao ? "Campo obrigatório!" : ""}
                                    defaultValue={selectedCharge.descricao}
                                    {...register("descricao")}
                                />
                                <span className='description-alert'>A descrição informada será impressa no boleto.</span>
                            </div>
                            <div className="input-div">
                                <label htmlFor="nome">Status</label>
                                <SelectStatus
                                    control={control}
                                    defaultValue={selectedCharge.status} />
                            </div>
                            <div className="valor-vencimento">
                                <div className='flex-column'>
                                    <label htmlFor="valor">Valor</label>
                                    <InputValor
                                        control={control}
                                        defaultValue={selectedCharge.valor} />
                                </div>
                                <div className='flex-column'>
                                    <label htmlFor="vencimento">Vencimento</label>
                                    <CustomDatePicker
                                        control={control}
                                        defaultValue={selectedCharge.vencimento}
                                    />
                                </div>

                            </div>
                            <div className="trash">
                                <img src={Trash} alt='trash' />
                                <div className="balloon">

                                </div>
                            </div>
                            <div className="flex-row">
                                <button className="btn-white-pink" onClick={() => reset()}>Cancelar</button>
                                <button className="btn-pink" type="submit">Editar Cobrança</button>
                            </div>
                        </form>
                    </div>
                    <Loading carregando={carregando} />
                </div>

            }
        </>
    )
}



export default ModalChargeEdit;