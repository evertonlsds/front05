import './styles.css';
import EmailIcon from '../../images/email-icon.svg'
import PhoneIcon from '../../images/phone-icon.svg'
import EditIcon from '../../images/edit-icon.svg';


export default function ClientCard() {


    return (
        <div className='main-clientcard'>
            <div className='flex-column'>
                <h3 className='client-name'>Client Name</h3>
                <div className='client-details'>
                    <img src={EmailIcon} alt='email-icon' />
                    <p className='clientcard-text'>email@email.com</p>
                </div>
                <div className='client-details'>
                    <img src={PhoneIcon} alt='email-icon' />
                    <p className='clientcard-text'>(DDD) 00000-0000</p>
                </div>
            </div>
            <p className='clientcard-text'>R$ 00.000,00</p>
            <p className='clientcard-text'>R$ 00.000,00</p>
            <p className='clientcard-status clientcard-status-green'>EM DIA</p>
            <img src={EditIcon} alt='edit-icon' style={{ 'cursor': 'pointer' }} />
        </div>
    )
}