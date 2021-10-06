import './styles.css';
import SideBar from '../../components/SideBar';
import UserMenu from '../../components/UserMenu';
import ClientCard from '../../components/ClientCard';
import { useHistory } from 'react-router';

export default function Clients() {
    const history = useHistory();

    return (
        <div className='flex-row'>
            <SideBar />
            <div className='main-clients'>
                <UserMenu />
                <div>
                    <button className="btn-white-pink" onClick={() => history.push('/newclient')}>Adicionar Cliente</button>
                </div>
                <div className='cards-container'>
                    <div className='container-legends'>
                        <p className='legends' style={{ 'padding-right': '100px' }}> Cliente</p>
                        <p className='legends'> Cobranças Feitas</p>
                        <p className='legends'> Cobranças Recebidas</p>
                        <p className='legends'> Status</p>
                    </div>
                    <ClientCard />
                    <ClientCard />
                </div>
            </div>
        </div>
    )
}
