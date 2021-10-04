import './styles.css';
import SideBar from '../../components/SideBar';
import UsersCard from '../../images/users.svg';
import Money from '../../images/money.svg';
import ModalUser from '../../components/ModalUser';

function Main() {
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
      </div>
    </div>
  );
}

export default Main;
