import './styles.css';
import SideBar from '../../components/SideBar';
import CardHome from '../../images/card-home.svg';
import UsersCard from '../../images/users.svg';

function Main() {
  return (
    <div className="container-main">
      <SideBar />
      <div className="homeContent">
        <div className="card-1">
          <div className="title-card">
          <img src={CardHome} alt="card"/>
            <div className="title-icon">
              <img src={UsersCard} alt="icon"/>
              </div>
              </div>
              <div className="rectangle1-card1">
                <p>em dia</p>
              </div>
              <div className="rectangle2-card1">
                <p>em dia</p>
              </div>
        </div>
        <div className="card-2">
          <div className="title-card2">
          <img src={CardHome} alt="card"/>
            <div className="title-icon">
              <img src={UsersCard} alt="icon"/>
              </div>
              </div>
              <div className="rectangle1-card2">
                <p>em dia</p>
              </div>
              <div className="rectangle2-card2">
                <p>em dia</p>
              </div>
              <div className="rectangle3-card2">
                <p>em dia</p>
              </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
