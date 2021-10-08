import './styles.css';
import SideBar from '../../components/SideBar';
import UserMenu from '../../components/UserMenu';
import ModalUser from '../../components/ModalUser';
import UsersCard from '../../images/users.svg';
import Money from '../../images/money.svg';
import { AuthContext } from '../../routes.js';
import { useContext, useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

function Main() {
  const { updateProfileSuccess, setupdateProfileSuccess } = useContext(AuthContext);
  const [clientesEmDia, setClientesEmDia] = useState([]);
  const [clientesInadimplentes, setClientesInadimplentes] = useState([]);
  const [cobrancasPendentes, setCobrancasPendentes] = useState([]);
  const [cobrancasVencidas, setCobrancasVencidas] = useState([]);

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
  }

  useEffect(() => {
    getClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    getCharges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleAlertClose() {
    setupdateProfileSuccess(false)
  }

  return (
    <div className="container-main">
      <ModalUser />
      <SideBar />
      <div className="homeContent">
        <div className="card-1">
          <div className="title-card">
            <img src={UsersCard} alt="users" />
            <span>Clientes</span>
          </div>
          <div className="rectangle1-card1">
            <p className="content-padding">Em dia</p>
            <h1 className="content-padding">{clientesEmDia}</h1>
          </div>
          <div className="rectangle2-card1">
            <p className="content-padding">Inadimplentes</p>
            <h1 className="content-padding">{clientesInadimplentes}</h1>
          </div>
        </div>
        <div className="card-2">
          <div className="title-card">
            <img src={Money} alt="users" />
            <span>Cobranças</span>
          </div>
          <div className="rectangle1-card2">
            <p className="content-padding">Previstas</p>
            <h1 className="content-padding">{cobrancasPendentes}</h1>
          </div>
          <div className="rectangle2-card2">
            <p className="content-padding">Vencidas</p>
            <h1 className="content-padding">{cobrancasVencidas}</h1>
          </div>
          <div className="rectangle3-card2">
            <p className="content-padding">Pagas</p>
            <h1 className="content-padding">0</h1>
          </div>
        </div>
        <UserMenu />
        <Snackbar open={updateProfileSuccess}
          autoHideDuration={8000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={handleAlertClose}
            severity="success"
            variant="filled">
            Perfil atualizado  com sucesso!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Main;
