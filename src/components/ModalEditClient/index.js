import './styles.css';
import CloseIcon from '../../images/close.svg';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import SuccessAlert from '../../components/SuccessAlert';
import ErrorAlert from '../../components/ErrorAlert';
import InputMasked from '../../components/InputMasked';



 function ModalEditClient({open =true , setOpen}) {
  const { handleSubmit, register, formState: { errors, isValid }, reset, control } = useForm({ mode: "onChange" });
  const [error] = useState('');
 // const { updateProfileSuccess, setUpdateProfileSuccess } = useContext(AuthContext);
  
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  


      return(
        <>
          {open &&
            <div className="modal">
              <div className= "modal-content">
                  <img src = {CloseIcon}
                      alt="close"
                      className = "close-icon"
                      onClick={() => setOpen(false)}
                    />
                    <div className="editClientFormDiv">
                   <form className="formEditClient" onSubmit={handleSubmit(ModalEditClient)}>
                     
            <div className="inputDivEditClient">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                type="text"
                className={errors.nome?.type === 'required' ? "input-error inputEditClient" : "inputEditClient"}
                placeholder={errors.nome ? "Campo obrigatório!" : ""}
                {...register("nome", { required: true })} />
            </div>
            <div className="inputDivEditClient">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                className={errors.email?.type === 'required' ? "input-error inputEditClient" : "inputEditClient"}
                placeholder={errors.email ? "Campo obrigatório!" : ""}
                {...register("email", { required: true })} />
            </div>
            <div className="dualInputEditClient">
              <div className="inputDivEditClient">
                <label htmlFor="cpf">CPF</label>
                <InputMasked control={control}
                  mask="999.999.999-99"
                  name="cpf"
                  class={errors.cpf?.type === 'required' ? "input-error inputEditClient" : "inputEditClient"}
                  placeholder={errors.cpf ? "Campo obrigatório!" : ""} />
              </div>
              <div className="inputDivEditClient">
                <label htmlFor="telefone">Telefone</label>
                <InputMasked control={control}
                  mask="(999) 9999-9999"
                  name="telefone"
                  class={errors.telefone?.type === 'required' ? "input-error inputEditClient" : "inputEditClient"}
                  placeholder={errors.telefone ? "Campo obrigatório!" : ""} />
              </div>
            </div>
            <div className="dualInputEditClient">
              <div className="inputDivEditClient">
                <label htmlFor="cep">CEP</label>
                <input
                  id="cep"
                  type="text"
                  maxLength={9}
                  className="inputEditClient"
                />
              </div>
              <div className="inputDivEditClient">
                <label htmlFor="logradouro">Logradouro</label>
                <input
                  id="logradouro"
                  type="text"
                  className="inputEditClient"
                  {...register("logradouro")} />
              </div>
            </div>
            <div className="dualInputEditClient">
              <div className="inputDiveditClient">
                <label htmlFor="bairro">Bairro</label>
                <input
                  id="bairro"
                  type="text"
                  className="inputEditClient"
                  {...register("bairro")} />
              </div>
              <div className="inputDivEditClient">
                <label htmlFor="cidade">Cidade</label>
                <input
                  id="cidade"
                  type="text"
                  className="inputEditClient"
                />
              </div>
            </div>
            <div className="dualInputEditClient">
              <div className="inputDivEditClient">
                <label htmlFor="complemento">Complemento</label>
                <input
                  id="complemento"
                  type="text"
                  className="inputEditClient"
                  {...register("complemento")} />
              </div>
              <div className="inputDivEditClient">
                <label htmlFor="referencia">Ponto de Referência</label>
                <input
                  id="referencia"
                  type="text"
                  className="inputEditClient"
                  {...register("refencia")} />
              </div>
            </div>
            <div className="buttonsDivEditClient">
              <button className="btn-white-pink" onClick={() => reset()}>Cancelar</button>
              <button className={isValid ? "btn-pink" : "btn-disabled"} disabled={!isValid} type="submit">Editar Cliente</button>
            </div>
            <SuccessAlert
              openSuccessAlert={openSuccessAlert}
              setOpenSuccessAlert={setOpenSuccessAlert}
              message="Cliente cadastrado com sucesso!" />
            <ErrorAlert
              openErrorAlert={openErrorAlert}
              setOpenErrorAlert={setOpenErrorAlert}
              error={error} />
          </form>
          </div>
          <div/>
              </div>
            </div>

          }
        </>
    )
}


export default ModalEditClient;