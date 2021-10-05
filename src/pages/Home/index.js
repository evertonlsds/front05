import './styles.css';
import SideBar from '../../components/SideBar';
import UserMenu from '../../components/UserMenu';
import ModalUser from '../../components/ModalUser';
import UsersCard from '../../images/users.svg';
import Money from '../../images/money.svg';
import { AuthContext } from '../../routes.js';
import { useContext } from 'react';
import { Alert, Snackbar } from '@mui/material';

function Main() {
  const { updateProfileSuccess, setupdateProfileSuccess } = useContext (AuthContext);

  function handleAlertClose () {
    setupdateProfileSuccess(false)
  }

  return (
    <div className="container-main">
      <ModalUser/>
      <SideBar />
      <div className="homeContent">
        <div className="card-1">
          <div className="title-card">
            <img src={UsersCard} alt="users" />
            <span>Clientes</span>
          </div>
          <div className="rectangle1-card1">
            <p className="content-padding">Em dia</p>
            <h1 className="content-padding">0</h1>
          </div>
          <div className="rectangle2-card1">
            <p className="content-padding">Inadimplentes</p>
            <h1 className="content-padding">0</h1>
          </div>
        </div>
        <div className="card-2">
          <div className="title-card">
            <img src={Money} alt="users" />
            <span>Cobranças</span>
          </div>
          <div className="rectangle1-card2">
            <p className="content-padding">Previstas</p>
            <h1 className="content-padding">0</h1>
          </div>
          <div className="rectangle2-card2">
            <p className="content-padding">Vencidas</p>
            <h1 className="content-padding">0</h1>
          </div>
          <div className="rectangle3-card2">
            <p className="content-padding">Pagas</p>
            <h1 className="content-padding">0</h1>
          </div>
        </div>
        <UserMenu/>
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
