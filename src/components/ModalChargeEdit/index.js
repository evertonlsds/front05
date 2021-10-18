import './styles.css';
import CloseIcon from '../../images/close.svg';
import { useForm } from 'react-hook-form';
//import { AuthContext } from '../../routes.js';
import CustomDatePicker from '../../components/CustomDatePicker';
import SelectStatus from '../../components/SelectStatus';
import SelectClient from '../../components/SelectClient';
//import Loading from '../../components/Loading';
//import SuccessAlert from '../../components/SuccessAlert';
//import ErrorAlert from '../../components/ErrorAlert';
//import ModalUser from '../../components/ModalUser';
import InputValor from '../../components/InputValor';
import Trash from '../../images/trash.svg';
import { useEffect, useState } from 'react';


function ModalChargeEdit({ setOpenModalChargeEdit, openModalChargeEdit, selectedChargeID }) {


    const { handleSubmit, register, control, formState: { errors }, reset } = useForm({ mode: "onChange" });
    const [selectedCharge, setSelectedCharge] = useState([]);

    async function getCharge() {
        console.log('comecei')

        const response = await fetch("https://api-desafio-05.herokuapp.com/cobrancas", {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                "charset": "utf-8",
                'Authorization': `Bearer ${localStorage.getItem('token')} `
            },
        });

        const resposta = await response.json();

        setSelectedCharge(resposta.cobrancasDoUsuario.filter(cobranca => cobranca.id === selectedChargeID))
        console.log(selectedCharge)

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
                        <form className="new-charge-form" onSubmit={handleSubmit()}>
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
                                    defaultValue={selectedCharge[0].descricao}
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
                                        defaultValue={selectedCharge[0].valor} />
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
                </div>

            }
        </>
    )
}



export default ModalChargeEdit;