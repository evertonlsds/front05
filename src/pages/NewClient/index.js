import './styles.css';
import SideBar from '../../components/SideBar';
import { useForm } from 'react-hook-form';


function NewClient(){

  const { handleSubmit, register, formState: { errors } } = useForm();

  return(
    <div className="container-main">
      <SideBar />
      <div className="clientContainerContent">
        <h1>/ / ADICIONAR CLIENTE</h1>
        <div className="newClientFormDiv">
          <form className="formNewClient">
            <div className="inputDiv">
              <label htmlFor="nome">Nome</label>
              <input 
              id="nome" 
              type="text"
              className={errors.nome?.type === 'required' ? "input-error" : "inputNewClient"}
              placeholder={errors.nome ? "Campo obrigatório!" : ""}
              {...register("nome", { required: true })} />
            </div>
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <input 
              id="email" 
              type="text"
              className={errors.email?.type === 'required' ? "input-error" : "inputNewClient"}
              placeholder={errors.email ? "Campo obrigatório!" : ""}
              {...register("email", { required: true })} />
            </div>
            <div className="dualInput">
              <div className="inputDiv">
                <label htmlFor="cpf">CPF</label>
                <input 
                id="cpf" 
                type="text"
                className={errors.cpf?.type === 'required' ? "input-error" : "inputNewClient"}
                placeholder={errors.cpf ? "Campo obrigatório!" : ""}
                {...register("cpf", { required: true })} />
              </div>
              <div className="inputDiv">
                <label htmlFor="telefone">Telefone</label>
                <input 
                id="telefone" 
                type="text"
                className={errors.telefone?.type === 'required' ? "input-error" : "inputNewClient"}
                placeholder={errors.telefone ? "Campo obrigatório!" : ""}
                {...register("telefone", { required: true })} />
              </div>
            </div>
            <div className="dualInput">
              <div className="inputDiv">
                <label htmlFor="cep">CEP</label>
                <input 
                id="cep" 
                type="text"
                className={errors.cep?.type === 'required' ? "input-error" : "inputNewClient"}
                placeholder={errors.cep ? "Campo obrigatório!" : ""}
                {...register("cep", { required: true })} />
              </div>
              <div className="inputDiv">
                <label htmlFor="logradouro">Logradouro</label>
                <input 
                id="logradouro" 
                type="text"
                className={errors.logradouro?.type === 'required' ? "input-error" : "inputNewClient"}
                placeholder={errors.logradouro ? "Campo obrigatório!" : ""}
                {...register("logradouro", { required: true })} />
              </div>
            </div>
            <div className="dualInput">
              <div className="inputDiv">
                <label htmlFor="bairro">Bairro</label>
                <input 
                id="bairro" 
                type="text"
                className={errors.bairro?.type === 'required' ? "input-error" : "inputNewClient"}
                placeholder={errors.bairro ? "Campo obrigatório!" : ""}
                {...register("bairro", { required: true })} />
              </div>
              <div className="inputDiv">
                <label htmlFor="cidade">Cidade</label>
                <input 
                id="cidade" 
                type="text"
                className={errors.cidade?.type === 'required' ? "input-error" : "inputNewClient"}
                placeholder={errors.cidade ? "Campo obrigatório!" : ""}
                {...register("cidade", { required: true })} />
              </div>
            </div>
            <div className="dualInput">
              <div className="inputDiv">
                <label htmlFor="complemento">Complemento</label>
                <input 
                id="complemento" 
                type="text"
                className={errors.complemento?.type === 'required' ? "input-error" : "inputNewClient"}
                placeholder={errors.complemento ? "Campo obrigatório!" : ""}
                {...register("complemento", { required: true })} />
              </div>
              <div className="inputDiv">
                <label htmlFor="ref">Ponto de Referência</label>
                <input 
                id="ref" 
                type="text"
                className={errors.ref?.type === 'required' ? "input-error" : "inputNewClient"}
                placeholder={errors.ref ? "Campo obrigatório!" : ""}
                {...register("ref", { required: true })} />
              </div>
            </div>
            <div className="buttonsDiv">
              <button className="cancelButton" type="reset">Cancelar</button>
              <button className="btn-pink" type="reset">Adiconar Cliente</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default NewClient;