import './style.css';

import Logo from'../../images/logoDark.svg'
import Home from '../../images/home.svg';
import Money from '../../images/money.svg';
import Users from '../../images/users.svg';
import { useHistory } from 'react-router';



export default function SideBar(){

  const history = useHistory();

    return(
      <div className="sidebarMenu">
        <img className="logo"src={Logo} alt="logo"/>
        <div className="menuOption">
          <img src={Home} alt="homeLogo" />
          <span>HOME</span>
        </div>
        <div className="menuOption">
          <img src={Money} alt="billingsLogo" />
          <span>COBRANÇAS</span>
        </div>
        <div className="menuOption" onClick={() => history.push("/newClient")}>
          <img src={Users} alt="clientsLogo" />
          <span>CLIENTES</span>
        </div>
        <div className="buttonDiv">
          <button className="btn-pink" type="submit">Criar cobrança</button>
        </div>
      </div>
    )
}