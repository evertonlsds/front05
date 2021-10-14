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
    const { updateProfileSuccess, setUpdateProfileSuccess, report, setReport, clientStatus, setClientStatus, chargeStatus, setChargeStatus } = useContext(AuthContext);
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
    const [openMenuStatus, setOpenMenuStatus] = useState(false);
    const [anchorMenuStatus, setAnchorMenuStatus] = useState(null);
    const [label, setLabel] = useState('');

    function handleOpenMenuReport(event) {
        setAnchorMenuReport(event.currentTarget)
        setOpenMenuReport(true);
    }
    function handleClientsClick() {
        setReport('clients');
        setOpenMenuReport(false);
        setLabel(clientStatus);
        if (!clientStatus) {
            setClientStatus('EM DIA');
            setLabel('EM DIA');
        }
    }
    function handleChargesClick() {
        setReport('charges');
        setOpenMenuReport(false);
        setLabel(chargeStatus);
        if (!chargeStatus) {
            setChargeStatus('PENDENTE')
            setLabel('PENDENTES')
        }
    }
    function handleOpenMenuStatus(event) {
        setAnchorMenuStatus(event.currentTarget)
        setOpenMenuStatus(true);
    }
    function handleEmDiaClick() {
        setClientStatus('EM DIA');
        setOpenMenuStatus(false);
        setLabel("EM DIA");
        getClients();
    }
    function handleInadimplenteClick() {
        setClientStatus('INADIMPLENTE');
        setOpenMenuStatus(false);
        setLabel("INADIMPLENTES")
        getClients();
    }
    function handlePendentesClick() {
        setChargeStatus('PENDENTE');
        setOpenMenuStatus(false);
        setLabel("PENDENTES");
    }
    function handleVencidasClick() {
        setChargeStatus('VENCIDA');
        setOpenMenuStatus(false);
        setLabel("VENCIDAS");
    }
    function handlePagasClick() {
        setChargeStatus('PAGO');
        setOpenMenuStatus(false);
        setLabel("PAGAS");
    }
    function setStatusLabel() {
        if (report === 'clients') {
            if (clientStatus === 'EM DIA') {
                setLabel("EM DIA");
            }
            if (clientStatus === "INADIMPLENTE") {
                setLabel("INADIMPLENTES");
            }
        }
        if (report === 'charges') {
            if (chargeStatus === "PAGO") {
                setLabel("PAGAS");
            }
            if (chargeStatus === "VENCIDA") {
                setLabel("VENCIDAS");
            }
            if (chargeStatus === "PENDENTE") {
                setLabel("PENDENTES");
            }
        }
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

        const clientesFiltrados = resposta.clientesDoUsuario.filter(client => client.status === clientStatus);

        setClients(clientesFiltrados);

        if (!report) {
            setReport('clients')
        }
        if (!label) {
            setStatusLabel();
        }
    }

    useEffect(() => {
        getClients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getClients();
        // eslint-disable-next-line
    }, [clients])

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

        const cobrancasFiltradas = resposta.cobrancasDoUsuario.filter(cobranca => cobranca.status === chargeStatus);

        setCharges(cobrancasFiltradas);
    }

    useEffect(() => {
        getCharges();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getCharges();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [charges])

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
                        <h2 className='reports-label' onClick={(e) => handleOpenMenuReport(e)}>{report === 'clients' ? 'CLIENTES' : 'COBRANÇAS'}</h2>
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
                        <h2 className='reports-label' onClick={(e) => handleOpenMenuStatus(e)}>{label}</h2>
                        <Popover
                            id='menu-user'
                            open={openMenuStatus}
                            onClose={() => setOpenMenuStatus(false)}
                            anchorEl={anchorMenuStatus}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}>
                            <div className='report-menu-box'>
                                {report === 'clients' ?
                                    <>
                                        <div className='row-menu-filter' onClick={() => handleEmDiaClick()}>
                                            <p className={clientStatus === 'EM DIA' ? 'report-menu pink' : 'report-menu'}>EM DIA</p>
                                        </div>
                                        <div className='row-menu-filter' onClick={() => handleInadimplenteClick()}>
                                            <p className={clientStatus === 'INADIMPLENTE' ? 'report-menu pink' : 'report-menu'}>INADIMPLENTE</p>
                                        </div> </> :
                                    <>
                                        <div className='row-menu-filter' onClick={() => handlePendentesClick()}>
                                            <p className={chargeStatus === 'PENDENTE' ? 'report-menu pink' : 'report-menu'}>PENDENTES</p>
                                        </div>
                                        <div className='row-menu-filter' onClick={() => handleVencidasClick()}>
                                            <p className={chargeStatus === 'VENCIDA' ? 'report-menu pink' : 'report-menu'}>VENCIDAS</p>
                                        </div>
                                        <div className='row-menu-filter' onClick={() => handlePagasClick()}>
                                            <p className={chargeStatus === 'PAGO' ? 'report-menu pink' : 'report-menu'}>PAGAS</p>
                                        </div> </>}
                            </div>
                        </Popover>
                    </div>
                    <ModalClient openModalClient={openModalClient} setOpenModalClient={setOpenModalClient} selectedClientID={selectedClientID} />
                </div>
                {
                    report === 'clients' && <ClientTable clients={clients}
                        setOpenModalClient={setOpenModalClient}
                        setOpenModalEditClient={setOpenModalEditClient}
                        setSelectedClientID={setSelectedClientID}
                        selectedClientID={selectedClientID} />
                }

                {
                    report === 'charges' &&
                    <ChargeTable charges={charges} />
                }
            </div>
        </div >
    )
}