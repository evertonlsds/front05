import './styles.css';
import '../../styles/modal.css';
import '../../styles/form.css'
import { useState, useEffect } from 'react';
import CloseIcon from '../../images/close.svg'
import EmailIcon from '../../images/email-icon.svg'
import PhoneIcon from '../../images/phone-icon.svg'
import Line from '../../images/line.svg'
import ChargeCard from '../ChargeCard';

function ModalClient({ openModalClient, setOpenModalClient, selectedClientID }) {

    const [selectedClient, setSelectedClient] = useState([]);

    async function getClient() {

        const response = await fetch(`https://api-desafio-05.herokuapp.com/clientes/${selectedClientID}`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                "charset": "utf-8",
                'Authorization': `Bearer ${localStorage.getItem('token')} `
            },
            body: JSON.stringify()
        });
        const resposta = await response.json();

        setSelectedClient(resposta);

        if (!response.ok) {
            return;
        }

    };
    useEffect(() => {
        getClient();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedClientID])

    return (
        <>
            {openModalClient &&
                <div className="modal-container">
                    <div className="modal-content-client">
                        <div className="first-row">
                            <div className="client-profile">
                                <h3 className='client-name-modal'>{selectedClient.nome}</h3>
                                <p className='client-info'>{selectedClient.cpf}</p>
                            </div>
                            <img src={CloseIcon} alt='close-icon' style={{ "cursor": "pointer" }} onClick={() => setOpenModalClient(false)} />
                        </div>
                        <div className='main-content'>
                            <div className="modal-client">
                                <div className='client-details'>
                                    <img src={EmailIcon} alt='email-icon' />
                                    <p className='client-info'>{selectedClient.email}</p>
                                    <img src={PhoneIcon} alt='email-icon' />
                                    <p className='client-info'>{selectedClient.telefone}</p>
                                </div>
                                <div className='client-adress'>
                                    <div className='flex-column'>
                                        <p className='client-legend'>CEP</p>
                                        <p className='client-info'>{selectedClient.cep}</p>
                                    </div>
                                    <div className='flex-column'>
                                        <p className='client-legend'>Bairro</p>
                                        <p className='client-info'>{selectedClient.bairro}</p>
                                    </div>
                                    <div className='flex-column'>
                                        <p className='client-legend'>Cidade</p>
                                        <p className='client-info'>{selectedClient.cidade}</p>
                                    </div>
                                </div>
                                <div className='flex-column'>
                                    <p className='client-legend'>Logradouro</p>
                                    <p className='client-info'>{selectedClient.logradouro}</p>
                                </div>
                                <div className='client-adress'>
                                    <div className='flex-column'>
                                        <p className='client-legend'>Complemento</p>
                                        <p className='client-info'>{selectedClient.complemento}</p>
                                    </div>
                                    <div className='flex-column'>
                                        <p className='client-legend'>Ponto de Referência</p>
                                        <p className='client-info'>{selectedClient.referencia}</p>
                                    </div>
                                </div>
                            </div>
                            <img src={Line} alt='line' />
                            <div className='client-charges'>
                                {selectedClient.cobrancas && selectedClient.cobrancas.map((cobranca) => (<ChargeCard cobranca={cobranca} />))}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}



export default ModalClient;