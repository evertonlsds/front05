import './style.css';

import Logo from '../../images/logoDark.svg'
import Home from '../../images/home.svg';
import Money from '../../images/money.svg';
import Users from '../../images/users.svg';
import { useHistory } from 'react-router';



export default function SideBar() {

  const history = useHistory();

  return (
    <div className="sidebarMenu">
      <img className="logo" src={Logo} alt="logo" />
      <div className="menuOption" onClick={() => history.push("/Home")}>
        <img src={Home} alt="homeLogo" />
        <span>HOME</span>
      </div>
      <div className="menuOption" onClick={() => history.push("/charges")} >
        <img src={Money} alt="chargesLogo" />
        <span>COBRANÇAS</span>
      </div>
      <div className="menuOption" onClick={() => history.push("/clients")}>
        <img src={Users} alt="clientsLogo" />
        <span>CLIENTES</span>
      </div>
      <div className="buttonDiv" >
        <button className="btn-pink" type="submit">Criar cobrança</button>
      </div>
    </div >
  )
}