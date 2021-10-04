import './style.css';

import Logo from'../../images/logoDark.svg'
import Home from '../../images/home.svg';
import Money from '../../images/money.svg';
import Users from '../../images/users.svg';


export default function SideBar(){
    return(
      <div className="sidebarMenu">
        <img className="logo"src={Logo} alt="logo"/>
        <div className="menuOption">
          <img src={Home} alt="homeLogo" />
          <span>HOME</span>
        </div>
        <div className="menuOption">
          <img src={Money} alt="homeLogo" />
          <span>COBRANÇAS</span>
        </div>
        <div className="menuOption">
          <img src={Users} alt="homeLogo" />
          <span>CLIENTES</span>
        </div>
        <div className="buttonDiv">
          <button className="btn-pink" type="submit">Criar cobrança</button>
        </div>
      </div>
    )
}