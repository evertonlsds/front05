import './styles.css';
import SideBar from '../../components/SideBar';
import UserMenu from '../../components/UserMenu';
import ChargeTable from '../../components/ChargeTable';
import { useState, useEffect } from 'react';


export default function Charges() {
    const [charges, setCharges] = useState([]);

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
            <div className='main-charges'>
                <UserMenu />
                <div className='cards-container2'>
                    <ChargeTable charges={charges} />
                </div>
            </div>
        </div>
    )
}