import './styles.css';
import SideBar from '../../components/SideBar';
import UserMenu from '../../components/UserMenu';
import ClientTable from '../../components/ClientTable';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../routes.js';
import ModalClient from '../../components/ModalClient';
import ModalUser from '../../components/ModalUser';
import SuccessAlert from '../../components/SuccessAlert';
import ModalEditClient from '../../components/ModalEditClient';
import ErrorAlert from '../../components/ErrorAlert';
import ChargeTable from '../../components/ChargeTable';
import Arrow from '../../images/arrow.svg'
import { Popover } from '@mui/material';


export default function Reports() {
    const { updateProfileSuccess, setUpdateProfileSuccess, report, setReport } = useContext(AuthContext);
    const [clients, setClients] = useState([]);
    const [openModalClient, setOpenModalClient] = useState(false);
    const [openModalEditClient, setOpenModalEditClient] = useState(false);
    const [selectedClientID, setSelectedClientID] = useState([]);
    const [updateClientSuccess, setUpdateClientSuccess] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const [error, setError] = useState('');
    const [charges, setCharges] = useState([]);
    const [openMenuReport, setOpenMenuReport] = useState(false);
    const [anchorMenuReport, setAnchorMenuReport] = useState(null);

    function handleOpenMenuReport(event) {
        setAnchorMenuReport(event.currentTarget)
        setOpenMenuReport(true);
    }
    function handleClientsClick() {
        setReport('clients');
        setOpenMenuReport(false);
    }
    function handleChargesClick() {
        setReport('charges');
        setOpenMenuReport(false);
    }

    async function getClients() {

        const response = await fetch("https://api-desafio-05.herokuapp.com/clientes", {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                "charset": "utf-8",
                'Authorization': `Bearer ${localStorage.getItem('token')} `
            },
        });

        const resposta = await response.json();

        setClients(resposta.clientesDoUsuario);

        if (!report) {
            setReport('clients')
        }
    }

    useEffect(() => {
        getClients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getClients();
        // eslint-disable-next-line
    }, [updateClientSuccess])

    async function getCharges() {

        const response = await fetch("https://api-desafio-05.herokuapp.com/cobrancas", {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                "charset": "utf-8",
                'Authorization': `Bearer ${localStorage.getItem('token')} `
            },
        });

        const resposta = await response.json();

        setCharges(resposta.cobrancasDoUsuario);
    }

    useEffect(() => {
        getCharges();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='flex-row'>
            <SideBar />
            <div className='main-clients'>
                <ModalEditClient
                    openModalEditClient={openModalEditClient}
                    setOpenModalEditClient={setOpenModalEditClient}
                    selectedClientID={selectedClientID}
                    setUpdateClientSuccess={setUpdateClientSuccess}
                    setOpenErrorAlert={setOpenErrorAlert}
                    setError={setError} />
                <UserMenu />
                <ModalUser />
                <SuccessAlert
                    openSuccessAlert={updateProfileSuccess}
                    setOpenSuccessAlert={setUpdateProfileSuccess}
                    message="Perfil atualizado com sucesso!" />
                <SuccessAlert
                    openSuccessAlert={updateClientSuccess}
                    setOpenSuccessAlert={setUpdateClientSuccess}
                    message="Cliente atualizado com sucesso!" />
                <ErrorAlert
                    openErrorAlert={openErrorAlert}
                    setOpenErrorAlert={setOpenErrorAlert}
                    error={error} />
                <div>
                    <div className='label-div'>
                        <h2 className='reports-label' onClick={(e) => handleOpenMenuReport(e)}>CLIENTES</h2>
                        <Popover
                            id='menu-user'
                            open={openMenuReport}
                            onClose={() => setOpenMenuReport(false)}
                            anchorEl={anchorMenuReport}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}>
                            <div className='report-menu-box'>
                                <div className='row-menu-filter' onClick={() => handleClientsClick()}>
                                    <p className={report === 'clients' ? 'report-menu pink' : 'report-menu'}>Clientes</p>
                                </div>
                                <div className='row-menu-filter' onClick={() => handleChargesClick()}>
                                    <p className={report === 'charges' ? 'report-menu pink' : 'report-menu'}>Cobranças</p>
                                </div>
                            </div>
                        </Popover>
                        <img src={Arrow} alt='arrow' />
                        <h2 className='reports-label'>EM DIA</h2>
                    </div>
                    <ModalClient openModalClient={openModalClient} setOpenModalClient={setOpenModalClient} selectedClientID={selectedClientID} />
                </div>
                {report === 'clients' && <ClientTable clients={clients}
                    setOpenModalClient={setOpenModalClient}
                    setOpenModalEditClient={setOpenModalEditClient}
                    setSelectedClientID={setSelectedClientID}
                    selectedClientID={selectedClientID} />}

                {report === 'charges' &&
                    <ChargeTable charges={charges} />
                }
            </div>

        </div>
    )
}