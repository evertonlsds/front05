import './styles.css';
import SideBar from '../../components/SideBar';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import SuccessAlert from '../../components/SuccessAlert';
import ErrorAlert from '../../components/ErrorAlert';
import UserMenu from '../../components/UserMenu';
import { getCityByCEP } from '../../service/viaCEP';
import Loading from '../../components/Loading';



function NewClient() {
  const { handleSubmit, register, formState: { errors }, reset } = useForm();
  const [error, setError] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");


  async function loadCityByCEP(myCep) {
    const cityByCep = await getCityByCEP(myCep)
    setCity(cityByCep)

  }

  useEffect(() => {
    if (cep.length < 9 && city.length > 0) {
      setCity("")
    }

    if (cep.indexOf('-') !== -1) {
      if (cep.length === 9) {
        loadCityByCEP(cep);
      }
      return
    }

    if (cep.length === 8) {
      loadCityByCEP(cep);
    }

  }, [cep])// eslint-disable-line react-hooks/exhaustive-deps

  async function newClient(dados) {
    setCarregando(true);

    const response = await fetch("https://api-desafio-05.herokuapp.com/clientes", {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        "charset": "utf-8",
        'Authorization': `Bearer ${localStorage.getItem('token')} `
      },

      body: JSON.stringify(dados)
    });
    const resposta = await response.json();

    setCarregando(false);

    if (!response.ok) {
      setError(resposta);
      setOpenErrorAlert(true);
      return;
    }

    setOpenSuccessAlert(true);
    setCarregando(false);
    reset();
  }

  return (
    <div className="container-main">
      <SideBar />
      <UserMenu />
      <div className="clientContainerContent">
        <h1 className="newClientTitle">/ / ADICIONAR CLIENTE</h1>
        <div className="newClientFormDiv">
          <form className="formNewClient" onSubmit={handleSubmit(newClient)}>
            <div className="inputDiv">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                type="text"
                className={errors.nome?.type === 'required' ? "input-error inputNewClient" : "inputNewClient"}
                placeholder={errors.nome ? "Campo obrigatório!" : ""}
                {...register("nome", { required: true })} />
            </div>
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                className={errors.email?.type === 'required' ? "input-error inputNewClient" : "inputNewClient"}
                placeholder={errors.email ? "Campo obrigatório!" : ""}
                {...register("email", { required: true })} />
            </div>
            <div className="dualInput">
              <div className="inputDiv">
                <label htmlFor="cpf">CPF</label>
                <input
                  id="cpf"
                  type="text"
                  className={errors.cpf?.type === 'required' ? "input-error inputNewClient" : "inputNewClient"}
                  placeholder={errors.cpf ? "Campo obrigatório!" : ""}
                  {...register("cpf", { required: true })} />
              </div>
              <div className="inputDiv">
                <label htmlFor="telefone">Telefone</label>
                <input
                  id="telefone"
                  type="text"
                  className={errors.telefone?.type === 'required' ? "input-error inputNewClient" : "inputNewClient"}
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
                  maxLength={9}
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className="inputNewClient"
                />
              </div>
              <div className="inputDiv">
                <label htmlFor="logradouro">Logradouro</label>
                <input
                  id="logradouro"
                  type="text"
                  className="inputNewClient"
                  {...register("logradouro")} />
              </div>
            </div>
            <div className="dualInput">
              <div className="inputDiv">
                <label htmlFor="bairro">Bairro</label>
                <input
                  id="bairro"
                  type="text"
                  className="inputNewClient"
                  {...register("bairro")} />
              </div>
              <div className="inputDiv">
                <label htmlFor="cidade">Cidade</label>
                <input
                  id="cidade"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="inputNewClient"
                />
              </div>
            </div>
            <div className="dualInput">
              <div className="inputDiv">
                <label htmlFor="complemento">Complemento</label>
                <input
                  id="complemento"
                  type="text"
                  className="inputNewClient"
                  {...register("complemento")} />
              </div>
              <div className="inputDiv">
                <label htmlFor="referencia">Ponto de Referência</label>
                <input
                  id="referencia"
                  type="text"
                  className="inputNewClient"
                  {...register("refencia")} />
              </div>
            </div>
            <div className="buttonsDiv">
              <button className="btn-white-pink" onClick={() => reset()}>Cancelar</button>
              <button className="btn-pink" type="submit">Adicionar Cliente</button>
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
        <Loading carregando={carregando} />
      </div>
    </div>
  )
}
export default NewClient;