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


export default function Clients() {
    const history = useHistory();
    const { updateProfileSuccess, setUpdateProfileSuccess } = useContext(AuthContext);
    const [clients, setClients] = useState([]);
    const [openModalClient, setOpenModalClient] = useState(false);
    const [selectedClientID, setSelectedClientID] = useState([]);

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
    }

    useEffect(() => {
        getClients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='flex-row'>
            <SideBar page='clients' />
            <div className='main-clients'>
                <UserMenu />
                <ModalUser />
                <SuccessAlert
                    openSuccessAlert={updateProfileSuccess}
                    setOpenSuccessAlert={setUpdateProfileSuccess}
                    message="Perfil atualizado com sucesso!" />
                <div>
                    <button className="btn-white-pink" onClick={() => history.push('/newclient')}>Adicionar Cliente</button>
                    <ModalClient openModalClient={openModalClient} setOpenModalClient={setOpenModalClient} selectedClientID={selectedClientID} />
                </div>
                <ClientTable clients={clients} setOpenModalClient={setOpenModalClient} setSelectedClientID={setSelectedClientID} selectedClientID={selectedClientID} />
            </div>

        </div>
    )
}
