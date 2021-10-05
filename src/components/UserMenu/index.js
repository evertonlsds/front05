import './style.css';
import Usuario from '../../images/usuario.svg';
import Logout from '../../images/log-out.svg';
import EditIcon from '../../images/edit-icon.svg';
import { useState, useContext } from 'react';
import { Popover } from '@mui/material';
import { AuthContext } from '../../routes.js';



export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(false);
  const { logOut, setModalOpen } = useContext(AuthContext);
  function handleUserMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  return (
    <>
      <img src={Usuario}
        alt='usuario-menu'
        id='user-menu'
        className='icon-usuario'

        onClick={handleUserMenu} />
      <Popover
        id='menu-user'
        open={anchorEl}
        onClose={() => setAnchorEl(false)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <div className='flex-column user-menu'>
          <div className='row-menu'>
            <img src={EditIcon} alt="edit" />
            <button className='btn-usermenu' onClick={() => setModalOpen(true)}>Editar</button>
          </div>
          <div className='row-menu' onClick={() => logOut()}>
            <img src={Logout} alt="logout" />
            <button className='btn-usermenu'>Deslogar</button>
          </div>
        </div>
      </Popover>
    </>
  )
}