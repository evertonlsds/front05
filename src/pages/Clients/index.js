import './styles.css';
import SideBar from '../../components/SideBar';
import UserMenu from '../../components/UserMenu';
import { useHistory } from 'react-router';

export default function Clients() {
    const history = useHistory();

    return (
        <div className='flex-row'>
            <SideBar />
            <UserMenu />
            <div>
                <button className="btn-white-pink" onClick={() => history.push('/newclient')}>Adicionar Cliente</button>
            </div>
        </div>
    )
}
