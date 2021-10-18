import './styles.css';
import { useEffect } from 'react';



export default function SearchInput({ charges, setSearchedCharges, table, getCharges, clients, setSearchedClients, setSearched, getClients, updateSuccess }) {

    useEffect(() => {
        searchByClick(document.getElementById("input-search").value);
        // eslint-disable-next-line
    }, [updateSuccess]);

    function searchByInput(e) {
        if (table === 'charges') {
            if (!e.target.value) {
                setSearched(false);
                getCharges();
            }
            if (e.keyCode === 13) {
                const localCharges = [...charges];
                const chargesSearched = localCharges.filter(charge => charge.nome.includes(e.target.value));
                setSearched(true);
                setSearchedCharges(chargesSearched);
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
                console.log(clientsSearched)
            }
        }
    }
    function searchByClick(value) {
        if (table === 'charges') {
            if (!value) {
                setSearched(false);
                getCharges();
            }
            const localCharges = [...charges];
            const chargesSearched = localCharges.filter(charge => charge.nome.includes(value));
            setSearched(true);
            setSearchedCharges(chargesSearched);
        }
        if (table === 'clients') {
            if (!value) {
                setSearched(false);
                getClients();
            }
            const localClients = [...clients];
            const clientsSearched = localClients.filter(client => client.nome.includes(value) || client.email.includes(value) || client.cpf.includes(value));
            setSearched(true);
            setSearchedClients(clientsSearched);
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