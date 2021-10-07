import './styles.css';
import SideBar from '../../components/SideBar';
import UserMenu from '../../components/UserMenu';
import ClientTable from '../../components/ClientTable';
import { useHistory } from 'react-router';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../routes.js';

export default function Clients() {
    const history = useHistory();
    const [clients, setClients] = useState([]);
    const { token } = useContext(AuthContext);

    async function getClients() {

        const response = await fetch("https://api-desafio-05.herokuapp.com/clientes", {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                "charset": "utf-8",
                'Authorization': `Bearer ${token} `
            },
        });

        const resposta = await response.json();

        setClients(resposta);
        console.log(resposta)
    }

    useEffect(() => {
        getClients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='flex-row'>
            <SideBar />
            <div className='main-clients'>
                <UserMenu />
                <div>
                    <button className="btn-white-pink" onClick={() => history.push('/newclient')}>Adicionar Cliente</button>
                </div>
                <ClientTable clients={clients} />
            </div>
        </div>
    )
}
