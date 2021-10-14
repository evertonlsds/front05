import './style.css';
import Usuario from '../../images/usuario.svg';
import Logout from '../../images/log-out.svg';
import EditIcon from '../../images/edit-icon.svg';
import { useState, useContext } from 'react';
import { Popover } from '@mui/material';
import { AuthContext } from '../../routes.js';



export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState('');
  const { logOut, setModalOpen, setPerfil } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  async function getProfile() {
    const response = await fetch("https://api-desafio-05.herokuapp.com/perfil", {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        "charset": "utf-8",
        'Authorization': `Bearer ${localStorage.getItem('token')} `
      },
    });
    const resposta = await response.json();
    setPerfil(resposta);

  }
  function handleUserMenu(event) {
    setAnchorEl(event.currentTarget);
    setOpen(true)
  }

  function handleModalOpen() {
    getProfile();
    setOpen(false);
    setModalOpen(true);
  }

  return (
    <>
      <img src={Usuario}
        alt='usuario-menu'
        id='user-menu'
        className='icon-usuario'
        onClick={(e) => handleUserMenu(e)} />
      <Popover
        id='menu-user'
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <div className='flex-column user-menu'>
          <div className='row-menu'>
            <img src={EditIcon} alt="edit" />
            <button className='btn-usermenu' onClick={() => handleModalOpen()}>Editar</button>
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