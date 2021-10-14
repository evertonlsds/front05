import './styles.css';
import SideBar from '../../components/SideBar';
import UserMenu from '../../components/UserMenu';
import ModalUser from '../../components/ModalUser';
import UsersCard from '../../images/users.svg';
import Money from '../../images/money.svg';
import { AuthContext } from '../../routes.js';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import SuccessAlert from '../../components/SuccessAlert';

function Main() {
  const history = useHistory();
  const { updateProfileSuccess, setUpdateProfileSuccess, setChargeStatus, setClientStatus, setReport } = useContext(AuthContext);
  const [clientesEmDia, setClientesEmDia] = useState([]);
  const [clientesInadimplentes, setClientesInadimplentes] = useState([]);
  const [cobrancasPendentes, setCobrancasPendentes] = useState([]);
  const [cobrancasVencidas, setCobrancasVencidas] = useState([]);
  const [cobrancasPagas, setCobrancasPagas] = useState([]);

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

    setClientesInadimplentes(resposta.clientesInadimplentes)
    setClientesEmDia(resposta.clientesEmDia);

  }
  async function getCharges() {

    const response = await fetch("https://api-desafio-05.herokuapp.com/cobrancas", {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        "charset": "utf-8",
        'Authorization': `Bearer ${localStorage.getItem('token')} `
      },
    });

    const resposta = await response.json();

    setCobrancasPendentes(resposta.cobrancasPendentes);
    setCobrancasVencidas(resposta.cobrancasVencidas);
    setCobrancasPagas(resposta.cobrancasPagas);
  }

  useEffect(() => {
    getClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    getCharges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleEmDiaClick() {
    setReport('clients');
    setClientStatus('EM DIA');
    history.push('/reports');
  }
  function handleInadimplentesClick() {
    setReport('clients');
    setClientStatus('INADIMPLENTE');
    history.push('/reports');
  }
  function handlePrevistasClick() {
    setReport('charges');
    setChargeStatus('PENDENTE');
    history.push('/reports');
  }
  function handlePagasClick() {
    setReport('charges');
    setChargeStatus('PAGO');
    history.push('/reports');
  }
  function handleVencidasClick() {
    setReport('charges');
    setChargeStatus('VENCIDA');
    history.push('/reports');
  }

  return (
    <div className="container-main">
      <ModalUser />
      <SideBar page='home' />
      <div className="homeContent">
        <div className="card-1">
          <div className="title-card">
            <img src={UsersCard} alt="users" />
            <span>Clientes</span>
          </div>
          <div className="rectangle1-card1" onClick={() => handleEmDiaClick()}>
            <p className="content-padding">Em dia</p>
            <h1 className="content-padding">{clientesEmDia ? clientesEmDia : 0}</h1>
          </div>
          <div className="rectangle2-card1" onClick={() => handleInadimplentesClick()}>
            <p className="content-padding">Inadimplentes </p>
            <h1 className="content-padding">{clientesInadimplentes ? clientesInadimplentes : 0}</h1>
          </div>
        </div>
        <div className="card-2">
          <div className="title-card">
            <img src={Money} alt="users" />
            <span>Cobranças</span>
          </div>
          <div className="rectangle1-card2" onClick={() => handlePrevistasClick()}>
            <p className="content-padding">Previstas</p>
            <h1 className="content-padding">{cobrancasPendentes ? cobrancasPendentes : 0}</h1>
          </div>
          <div className="rectangle2-card2" onClick={() => handleVencidasClick()}>
            <p className="content-padding">Vencidas</p>
            <h1 className="content-padding">{cobrancasVencidas ? cobrancasVencidas : 0}</h1>
          </div>
          <div className="rectangle3-card2" onClick={() => handlePagasClick()}>
            <p className="content-padding">Pagas</p>
            <h1 className="content-padding">{cobrancasPagas ? cobrancasPagas : 0}</h1>
          </div>
        </div>
        <UserMenu />
        <SuccessAlert
          openSuccessAlert={updateProfileSuccess}
          setOpenSuccessAlert={setUpdateProfileSuccess}
          message="Perfil atualizado com sucesso!" />
      </div>
    </div>
  );
}

export default Main;
