import './styles.css';
import CloseIcon from '../../images/close.svg';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import InputMasked from '../../components/InputMasked';
import Loading from '../Loading';

function ModalEditClient({ openModalEditClient, setOpenModalEditClient, selectedClientID, setUpdateClientSuccess, setError, setOpenErrorAlert }) {

  const { handleSubmit, register, formState: { errors }, reset, control } = useForm({ mode: "onChange" });
  const [selectedClient, setSelectedClient] = useState([]);
  const [carregando, setCarregando] = useState(false)


  async function getClient() {

    const response = await fetch(`https://api-desafio-05.herokuapp.com/clientes/${selectedClientID}`, {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        "charset": "utf-8",
        'Authorization': `Bearer ${localStorage.getItem('token')} `
      },
      body: JSON.stringify()
    });
    const resposta = await response.json();

    setSelectedClient(resposta);

    if (!response.ok) {
      setError(resposta);
      setOpenErrorAlert(true);
      return;
    }

  }

  async function updateClient(dados) {
    setCarregando(true);

    const response = await fetch(`https://api-desafio-05.herokuapp.com/clientes/${selectedClientID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': "application/json",
        "charset": "utf-8",
        'Authorization': `Bearer ${localStorage.getItem('token')} `
      },
      body: JSON.stringify(dados)
    });
    const resposta = await response.json();

    setCarregando(false);
    setSelectedClient(resposta);

    if (!response.ok) {
      setOpenErrorAlert(true);
      setError(resposta);
      return;
    }
    reset();
    setUpdateClientSuccess(true);
    setOpenModalEditClient(false);
  };
  useEffect(() => {
    getClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClientID])


  return (
    <>
      {openModalEditClient &&
        <div className="modalEditClient">
          <div className="modalContatEditClient">
                  <img src={CloseIcon}
                    alt="close"
                    className="closeIcon"
                    onClick={() => setOpenModalEditClient(false)}
                    />
                  <div className="editClientFormDiv">
              <form className="formEditClient" onSubmit={handleSubmit(updateClient)}>
                <div className="inputDivEditClient">
                  <label htmlFor="nome">Nome </label>
                  <input
                    id="nome"
                    type="text"
                    className={errors.nome?.type === 'required' ? "input-error inputEditClient" : "inputEditClient"}
                    placeholder={selectedClient.nome}
                    {...register("nome")} />
                </div>
                <div className="inputDivEditClient">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="text"
                    className={errors.email?.type === 'required' ? "input-error inputEditClient" : "inputEditClient"}
                    placeholder={selectedClient.email}
                    {...register("email")} />
                </div>
                <div className="dualInputEditClient">
                  <div className="inputDivEditClient">
                    <label htmlFor="cpf">CPF</label>
                    <InputMasked control={control}
                      mask="999.999.999-99"
                      name="cpf"
                      class={errors.cpf?.type === 'required' ? "input-error inputEditClient" : "inputEditClient"}
                      placeholder={selectedClient.cpf} />
                  </div>
                  <div className="inputDivEditClient">
                    <label htmlFor="telefone">Telefone</label>
                    <InputMasked control={control}
                      mask="(999) 9999-9999"
                      name="telefone"
                      class={errors.telefone?.type === 'required' ? "input-error inputEditClient" : "inputEditClient"}
                      placeholder={selectedClient.telefone} />
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
                      placeholder={selectedClient.cep}
                      {...register("cep")}
                    />
                  </div>
                  <div className="inputDivEditClient">
                    <label htmlFor="logradouro">Logradouro</label>
                    <input
                      id="logradouro"
                      type="text"
                      className="inputEditClient"
                      placeholder={selectedClient.logradouro}
                      {...register("logradouro")} />
                  </div>
                </div>
                <div className="dualInputEditClient">
                  <div className="inputDivEditClient">
                    <label htmlFor="bairro">Bairro</label>
                    <input
                      id="bairro"
                      type="text"
                      className="inputEditClient"
                      placeholder={selectedClient.bairro}
                      {...register("bairro")} />
                  </div>
                  <div className="inputDivEditClient">
                    <label htmlFor="cidade">Cidade</label>
                    <input
                      id="cidade"
                      type="text"
                      className="inputEditClient"
                      placeholder={selectedClient.cidade}
                      {...register("cidade")}
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
                      placeholder={selectedClient.complemento}
                      {...register("complemento")} />
                  </div>
                  <div className="inputDivEditClient">
                    <label htmlFor="referencia">Ponto de Referência</label>
                    <input
                      id="referencia"
                      type="text"
                      className="inputEditClient"
                      placeholder={selectedClient.referencia}
                      {...register("referencia")} />
                  </div>
                </div>
                <div className="buttonsDivEditClient">
                  <button className="btn-white-pink" type='reset' onClick={() => reset()}>Cancelar</button>
                  <button className='btn-pink' type="submit">Editar Cliente</button>
                </div>
              </form>
            </div>
            <Loading carregando={carregando} />
            </div>
          </div>
        }
    </>
  )
}


export default ModalEditClient;