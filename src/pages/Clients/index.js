import './styles.css';
import SideBar from '../../components/SideBar';
import UserMenu from '../../components/UserMenu';
import ClientTable from '../../components/ClientTable';
import { useHistory } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../routes.js';
import ModalClient from '../../components/ModalClient';
import ModalUser from '../../components/ModalUser';
import SuccessAlert from '../../components/SuccessAlert';
import ModalEditClient from '../../components/ModalEditClient';
import ErrorAlert from '../../components/ErrorAlert';
import SearchInput from '../../components/SearchInput';
import Loading from '../../components/Loading';


export default function Clients() {
    const history = useHistory();
    const { updateProfileSuccess, setUpdateProfileSuccess } = useContext(AuthContext);
    const [clients, setClients] = useState([]);
    const [openModalClient, setOpenModalClient] = useState(false);
    const [openModalEditClient, setOpenModalEditClient] = useState(false);
    const [selectedClientID, setSelectedClientID] = useState([]);
    const [updateClientSuccess, setUpdateClientSuccess] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const [error, setError] = useState('');
    const [sortByName, setSortByName] = useState(false);
    const [searchedClients, setSearchedClients] = useState([]);
    const [searched, setSearched] = useState(false);
    const [carregando, setCarregando] = useState(false);

    async function getClients() {
        setCarregando(true);

        const response = await fetch("https://api-desafio-05.herokuapp.com/clientes", {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                "charset": "utf-8",
                'Authorization': `Bearer ${localStorage.getItem('token')} `
            },
        });

        const resposta = await response.json();



        if (!searched) {
            setSearchedClients(resposta.clientesDoUsuario)
        }

        if (sortByName) {
            sortClientsByName(resposta.clientesDoUsuario);
            sortClientsByName(searchedClients);
        }

        setClients(resposta.clientesDoUsuario);
        setCarregando(false);
    }

    useEffect(() => {
        getClients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateClientSuccess, sortByName]);

    function sortClientsByName(clients) {
        clients.sort(function (a, b) {
            return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0)
        })
    };


    return (
        <div className='flex-row'>
            <SideBar page='clients' />
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
                    <button className="btn-white-pink" onClick={() => history.push('/newclient')}>Adicionar Cliente</button>
                    <SearchInput
                        table={'clients'}
                        clients={clients}
                        setSearchedClients={setSearchedClients}
                        setSearched={setSearched}
                        getClients={getClients}
                        updateSuccess={updateClientSuccess}
                        placeholder={'Procurar por Nome, E-mail ou CPF'}
                    />
                    <ModalClient openModalClient={openModalClient} setOpenModalClient={setOpenModalClient} selectedClientID={selectedClientID} />
                </div>
                {searchedClients.length > 0 ? <ClientTable clients={searchedClients}
                    setOpenModalClient={setOpenModalClient}
                    setOpenModalEditClient={setOpenModalEditClient}
                    setSelectedClientID={setSelectedClientID}
                    selectedClientID={selectedClientID}
                    getClients={getClients}
                    setSortByName={setSortByName}
                    sortByName={sortByName}
                /> : <p>N??o foram encontrados clientes.</p>}
            </div>
            <Loading carregando={carregando} />

        </div>
    )
}
