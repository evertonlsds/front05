import './styles.css';
import { useEffect } from 'react';



export default function SearchInput({ charges, setCharges, table, getCharges, clients, setSearchedClients, setSearched, getClients, updateClientSuccess }) {

    useEffect(() => {
        searchByClick(document.getElementById("input-search").value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateClientSuccess]);

    function searchByInput(e) {
        if (table === 'charges') {
            if (!e.target.value) {
                getCharges();
            }
            if (e.keyCode === 13) {
                const localCharges = [...charges];
                const chargesSearched = localCharges.filter(charge => charge.nome.includes(e.target.value));
                setCharges(chargesSearched);
            }
        }
        if (table === 'clients') {
            if (!e.target.value) {
                getClients();
            }
            if (e.keyCode === 13) {
                const localClients = [...clients];
                const clientsSearched = localClients.filter(client => client.nome.includes(e.target.value) || client.email.includes(e.target.value) || client.cpf.includes(e.target.value));
                setSearched(true);
                setSearchedClients(clientsSearched);
            }
        }
    }
    function searchByClick(value) {
        if (table === 'charges') {
            if (!value) {
                getCharges();
            }
            const localCharges = [...charges];
            const chargesSearched = localCharges.filter(charge => charge.nome.includes(value));
            setCharges(chargesSearched);
        }
    }

    return (
        <div className='search-container'>
            <input type='text'
                className='search-input'
                id="input-search" onKeyDown={(e) => searchByInput(e)}
                placeholder='Procurar por Nome, E-mail ou CPF'></input>
            <button className='search-button'
                onClick={(e) => searchByClick(document.getElementById("input-search").value)}>BUSCAR</button>
        </div>
    )
}