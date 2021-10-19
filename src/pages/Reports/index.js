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
import ModalChargeEdit from '../../components/ModalChargeEdit';
import SearchInput from '../../components/SearchInput';
import Loading from '../../components/Loading';


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
    const [sortByName, setSortByName] = useState(false);
    const [openModalChargeEdit, setOpenModalChargeEdit] = useState(false);
    const [selectedChargeID, setSelectedChargeID] = useState([]);
    const [updateChargeSuccess, setUpdateChargeSuccess] = useState(false);
    const [selectedCharge, setSelectedCharge] = useState([]);
    const [allClients, setAllClients] = useState([]);
    const [searched, setSearched] = useState(false);
    const [searchedCharges, setSearchedCharges] = useState([]);
    const [deleteChargeSuccess, setDeleteChargeSuccess] = useState(false);
    const [searchedClients, setSearchedClients] = useState([]);
    const [carregando, setCarregando] = useState(false);

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
        setSearched(false);
        setClientStatus('EM DIA');
        setOpenMenuStatus(false);
        setLabel("EM DIA");
        getClients();
    }
    function handleInadimplenteClick() {
        setSearched(false);
        setClientStatus('INADIMPLENTE');
        setOpenMenuStatus(false);
        setLabel("INADIMPLENTES")
        getClients();
    }
    function handlePendentesClick() {
        setSearched(false);
        setChargeStatus('PENDENTE');
        setOpenMenuStatus(false);
        setLabel("PENDENTES");
    }
    function handleVencidasClick() {
        setSearched(false);
        setChargeStatus('VENCIDA');
        setOpenMenuStatus(false);
        setLabel("VENCIDAS");
    }
    function handlePagasClick() {
        setSearched(false);
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
        console.log('getclients')
        setCarregando(true);

        if (!report) {
            setReport('clients')
        }
        if (!clientStatus) {
            setClientStatus('EM DIA')
        }
        if (!label) {
            setStatusLabel();
        }

        const response = await fetch("https://api-desafio-05.herokuapp.com/clientes", {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                "charset": "utf-8",
                'Authorization': `Bearer ${localStorage.getItem('token')} `
            },
        });

        const resposta = await response.json();

        setAllClients(resposta.clientesDoUsuario);

        const clientesFiltrados = resposta.clientesDoUsuario.filter(client => client.status === clientStatus);

        if (sortByName) {
            sortReport(clientesFiltrados);
            sortReport(searchedClients);
        }

        if (!searched) {
            setSearchedClients(clientesFiltrados)
            setClients(clientesFiltrados);
        }

        setCarregando(false);
        setClients(clientesFiltrados);


    }

    useEffect(() => {
        getClients();
        // eslint-disable-next-line
    }, [searched, updateClientSuccess, clientStatus, sortByName])

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

        if (sortByName) {
            sortReport(cobrancasFiltradas);
            sortReport(searchedCharges);
        }

        if (!searched) {
            setSearchedCharges(cobrancasFiltradas)
            setCharges(cobrancasFiltradas);
        }

    }

    useEffect(() => {
        getCharges();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searched, updateChargeSuccess, deleteChargeSuccess, chargeStatus, sortByName])

    function sortReport(tipo) {
        tipo.sort(function (a, b) {
            return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0)
        })
    };

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
                <ModalChargeEdit
                    openModalChargeEdit={openModalChargeEdit}
                    setOpenModalChargeEdit={setOpenModalChargeEdit}
                    selectedChargeID={selectedChargeID}
                    selectedCharge={selectedCharge}
                    setUpdateChargeSuccess={setUpdateChargeSuccess}
                    setOpenErrorAlert={setOpenErrorAlert}
                    setError={setError}
                    clients={allClients}
                    setDeleteChargeSuccess={setDeleteChargeSuccess} />
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
                <SuccessAlert
                    openSuccessAlert={updateChargeSuccess}
                    setOpenSuccessAlert={setUpdateChargeSuccess}
                    message="Cobrança atualizada com sucesso!" />
                <SuccessAlert
                    openSuccessAlert={deleteChargeSuccess}
                    setOpenSuccessAlert={setDeleteChargeSuccess}
                    message="Cobrança excluída com sucesso!" />
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
                    {report === 'charges' ? <SearchInput
                        table={'reports'}
                        charges={charges}
                        clients={clients}
                        setSearchedClients={setSearchedClients}
                        setSearchedCharges={setSearchedCharges}
                        getCharges={getCharges}
                        getClients={getClients}
                        updateSuccess={updateChargeSuccess}
                        setSearched={setSearched}
                        placeholder={'Procurar por Nome ou ID'} /> :
                        <SearchInput
                            table={'reports'}
                            charges={charges}
                            clients={clients}
                            setSearchedClients={setSearchedClients}
                            setSearchedCharges={setSearchedCharges}
                            getCharges={getCharges}
                            getClients={getClients}
                            updateSuccess={updateChargeSuccess}
                            setSearched={setSearched}
                            placeholder={'Procurar por Nome, email ou CPF'} />}
                    <ModalClient
                        openModalClient={openModalClient}
                        setOpenModalClient={setOpenModalClient}
                        selectedClientID={selectedClientID} />
                </div>
                {
                    report === 'clients' && (searchedClients.length > 0 ?
                        <ClientTable clients={searchedClients}
                            setOpenModalClient={setOpenModalClient}
                            setOpenModalEditClient={setOpenModalEditClient}
                            setSelectedClientID={setSelectedClientID}
                            selectedClientID={selectedClientID}
                            getClients={getClients}
                            setSortByName={setSortByName}
                            sortByName={sortByName} /> : <p>Não foram encontrados clientes.</p>)
                }

                {
                    report === 'charges' && (searchedCharges.length > 0 ?
                        <ChargeTable charges={searchedCharges}
                            setChargesByName={setSortByName}
                            chargesByName={sortByName}
                            getCharges={getCharges}
                            setOpenModalChargeEdit={setOpenModalChargeEdit}
                            setSelectedChargeID={setSelectedChargeID}
                            selectedChargeID={selectedChargeID}
                            selectedCharge={selectedCharge}
                            setSelectedCharge={setSelectedCharge} /> : <p>Não foram encontradas cobranças.</p>)
                }
            </div>
            <Loading carregando={carregando} />
        </div >
    )
}