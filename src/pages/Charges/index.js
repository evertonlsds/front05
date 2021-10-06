import './styles.css';
import SideBar from '../../components/SideBar';
import UserMenu from '../../components/UserMenu';
import ChargeCard from '../../components/ChargeCard';


export default function Charges() {

    return (
        <div className='flex-row'>
            <SideBar />
            <div className='main-charges'>
                <UserMenu />
                <div className='cards-container'>
                    <div className='container-legends'>
                        <p className='legends'> ID</p>
                        <p className='legends' style={{ 'padding-right': '50px' }}> Cliente</p>
                        <p className='legends' style={{ 'padding-right': '70px' }}> Descrição</p>
                        <p className='legends'> Valor</p>
                        <p className='legends'> Status</p>
                        <p className='legends'> Vencimento</p>
                    </div>
                    <ChargeCard />
                    <ChargeCard />
                </div>
            </div>
        </div>
    )
}