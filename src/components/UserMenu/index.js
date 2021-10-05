import './style.css';
import Usuario from '../../images/usuario.svg';
import Logout from '../../images/log-out.svg';
import EditIcon from '../../images/edit-icon.svg';
import { useState, useContext, useRef } from 'react';
import { Popover } from '@mui/material';
import { AuthContext } from '../../routes.js';



export default function UserMenu() {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { logOut, setModalOpen } = useContext(AuthContext);
  const anchorEl = useRef();

  function handleCloseUserMenu() {
    setOpenUserMenu(false);
  }

  return (
    <>
      <img src={Usuario}
        alt='usuario-menu'
        id='user-menu'
        className='icon-usuario'
        onClick={() => setOpenUserMenu(true)}
        ref={anchorEl} />
      <Popover
        id='menu-user'
        open={openUserMenu}
        onClose={handleCloseUserMenu}
        anchorEl={anchorEl}>
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