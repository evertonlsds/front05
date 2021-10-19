import './styles.css';
import CloseIcon from '../../images/close.svg';
import { useForm } from 'react-hook-form';
import CustomDatePicker from '../../components/CustomDatePicker';
import SelectStatus from '../../components/SelectStatus';
import SelectClient from '../../components/SelectClient';
import Loading from '../../components/Loading';
import InputValor from '../../components/InputValor';
import Trash from '../../images/trash.svg';
import { useEffect, useState } from 'react';
import TooltipChargeDelete from '../TooltipChargeDelete';
import { Popover } from '@mui/material';


function ModalChargeEdit({ setOpenModalChargeEdit, openModalChargeEdit, selectedChargeID, setOpenErrorAlert, setError, setUpdateChargeSuccess, clients, setDeleteChargeSuccess }) {


    const { handleSubmit, register, control, formState: { errors }, reset } = useForm({ mode: "onChange" });
    const [selectedCharge, setSelectedCharge] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
    const [anchorDeleteConfirmation, setAnchorDeleteConfirmation] = useState(null);

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

        if (!response.ok) {
            setOpenErrorAlert(true);
            setError(resposta);
            return;
        }
        setUpdateChargeSuccess(true);
        setOpenModalChargeEdit(false);

    }
    async function deleteCharge() {
        setCarregando(true);

        const response = await fetch(`https://api-desafio-05.herokuapp.com/cobrancas/${selectedChargeID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json",
                "charset": "utf-8",
                'Authorization': `Bearer ${localStorage.getItem('token')} `
            },
        });

        const resposta = await response.json();
        setCarregando(false);

        if (!response.ok) {
            setOpenErrorAlert(true);
            setError(resposta);
            return;
        }
        setDeleteChargeSuccess(true);
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

    function handleOpenDeleteConfirmation(event) {
        setAnchorDeleteConfirmation(event.currentTarget)
        setOpenDeleteConfirmation(true);
    }


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
                        <form className="edit-charge-form" onSubmit={handleSubmit(updateCharge)}>
                            <div className="input-div">
                                <label htmlFor="cliente">Cliente</label>
                                <SelectClient
                                    control={control}
                                    id="cliente_id"
                                    clients={clients} />
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
                                    <div className=" trash-container">
                                        <div className="trash" onClick={(e) => handleOpenDeleteConfirmation(e)}>
                                            <img src={Trash} alt='trash' />
                                            <p className='delete-charge-text'>Excluir cobrança</p>
                                        </div>
                                        <Popover
                                            id='menu-user'
                                            open={openDeleteConfirmation}
                                            onClose={() => setOpenDeleteConfirmation(false)}
                                            anchorEl={anchorDeleteConfirmation}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}>
                                            <TooltipChargeDelete setOpenDeleteConfirmation={setOpenDeleteConfirmation}
                                                deleteCharge={deleteCharge} />
                                        </Popover>
                                    </div>
                                </div>
                                <div className='flex-column'>
                                    <label htmlFor="vencimento">Vencimento</label>
                                    <CustomDatePicker
                                        control={control}
                                        defaultValue={selectedCharge.vencimento}
                                    />
                                </div>
                            </div>
                            <div className="flex-row " >
                                <button className="btn-white-pink" type='reset' onClick={() => reset()}>Cancelar</button>
                                <button className="btn-pink" type="submit">Editar Cobrança</button>
                            </div>
                        </form>
                    </div>
                    <Loading carregando={carregando} />
                </div >

            }
        </>
    )
}



export default ModalChargeEdit;