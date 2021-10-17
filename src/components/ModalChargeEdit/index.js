import './styles.css';
import CloseIcon from '../../images/close.svg';
import { useState } from 'react';
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


function ModalChargeEdit(){

    const [openModalChargeEdit, setOpenModalChargeEdit] = useState([]);
    const { handleSubmit, register, control, formState: { errors, isValid }, reset } = useForm({ mode: "onChange" });
    
    return(
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
                        <div className="trash">
                                <img src={Trash} alt='trash'/>
                                  <div className="balloon">
                                    
                                  </div>
                                </div>
                        <div className="flex-row">
                            <button className="btn-white-pink" onClick={() => reset()}>Cancelar</button>
                            <button className={isValid ? "btn-pink" : "btn-disabled"} disabled={!isValid} type="submit">Criar Cobrança</button>
                        </div>
                    </form>
                        </div>
                        </div>
                        
        }
</>
    )
}



export default ModalChargeEdit;