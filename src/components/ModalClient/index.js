import './styles.css';
import '../../styles/modal.css';
import '../../styles/form.css'
import CloseIcon from '../../images/close.svg'
import EmailIcon from '../../images/email-icon.svg'
import PhoneIcon from '../../images/phone-icon.svg'
import Line from '../../images/line.svg'
import ChargeCard from '../ChargeCard';

function ModalClient({ openModalClient, setOpenModalClient }) {

    // async function obterCliente(id) {

    //     const response = await fetch(`https://api-desafio-05.herokuapp.com/clientes/${id}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': "application/json",
    //             "charset": "utf-8",
    //             'Authorization': `Bearer ${localStorage.getItem('token')} `
    //         },
    //         body: JSON.stringify()
    //     });
    //     const resposta = await response.json();

    //     if (!response.ok) {
    //         return;
    //     }

    // }

    return (
        <>
            {openModalClient &&
                <div className="modal-container">
                    <div className="modal-content">
                        <div className="first-row">
                            <div className="client-profile">
                                <h3 className='client-name-modal'>Adriano Silva</h3>
                                <p className='client-info'>000.000.000-00</p>
                            </div>
                            <img src={CloseIcon} alt='close-icon' style={{ "cursor": "pointer" }} onClick={() => setOpenModalClient(false)} />
                        </div>
                        <div className='main-content'>
                            <div className="modal-client">
                                <div className='client-details'>
                                    <img src={EmailIcon} alt='email-icon' />
                                    <p className='client-info'>email@email.com</p>
                                    <img src={PhoneIcon} alt='email-icon' />
                                    <p className='client-info'>(DDD) 0000-0000</p>
                                </div>
                                <div className='client-adress'>
                                    <div className='flex-column'>
                                        <p className='client-legend'>CEP</p>
                                        <p className='client-info'>00000-000</p>
                                    </div>
                                    <div className='flex-column'>
                                        <p className='client-legend'>Bairro</p>
                                        <p className='client-info'>Rio Vermelho</p>
                                    </div>
                                    <div className='flex-column'>
                                        <p className='client-legend'>Cidade</p>
                                        <p className='client-info'>Salvador</p>
                                    </div>
                                </div>
                                <div className='flex-column'>
                                    <p className='client-legend'>Logradouro</p>
                                    <p className='client-info'>Rua da Paciência</p>
                                </div>
                                <div className='client-adress'>
                                    <div className='flex-column'>
                                        <p className='client-legend'>Complemento</p>
                                        <p className='client-info'>00000-000</p>
                                    </div>
                                    <div className='flex-column'>
                                        <p className='client-legend'>Ponto de Referência</p>
                                        <p className='client-info'>Rio Vermelho</p>
                                    </div>
                                </div>
                            </div>
                            <img src={Line} alt='line' />
                            <div className='client-charges'>
                                <ChargeCard />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}



export default ModalClient;