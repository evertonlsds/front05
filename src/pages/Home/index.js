import './styles.css';
import SideBar from '../../components/SideBar';
import UsersCard from '../../images/users.svg';
import Money from '../../images/money.svg';
import Usuario from '../../images/usuario.svg';
import Logout from '../../images/log-out.svg';
import EditIcon from '../../images/edit-icon.svg';
import { useState} from 'react';
import { Popover } from '@mui/material';

function Main() {
  const [openUserMenu, setOpenUserMenu] = useState(false);

  function handleCloseUserMenu () {
    setOpenUserMenu (false);
  }

  return (
    <div className="container-main">
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
        <img src={Usuario}
        alt='usuario-menu'
        id='user-menu'
        className='icon-usuario' 
        onClick={() => setOpenUserMenu(true)} />
        <Popover
          id='menu-user'
          open={openUserMenu}
          onClose={handleCloseUserMenu}
          anchorReference='anchorPosition'
          anchorPosition={{ top: 80, left: 1300 }}>
            <div className='flex-column user-menu'>
              <div className='row-menu'>
                <img src={EditIcon} alt="edit" />
                <button className='btn-usermenu'>Editar</button>
              </div>
              <div className='row-menu'>
                <img src={Logout} alt="logout" />
                <button className='btn-usermenu'>Deslogar</button>
              </div>
            </div>
        </Popover>
      </div>
    </div>
  );
}

export default Main;
