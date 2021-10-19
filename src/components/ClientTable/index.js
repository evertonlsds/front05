import './styles.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EmailIcon from '../../images/email-icon.svg'
import PhoneIcon from '../../images/phone-icon.svg'
import EditIcon from '../../images/edit-icon.svg';
import ArrowDown from '../../images/arrow-sort-down.svg';
import { Fragment } from 'react';

export default function ClientTable({ clients, setOpenModalClient, setOpenModalEditClient, setSelectedClientID, selectedClientID, sortByName, setSortByName, getClients }) {

    function handleModalClientOpen(client) {
        setOpenModalClient(true);
        setSelectedClientID(client);
    }
    function handleModalEditClientOpen(client) {
        setOpenModalEditClient(true);
        setSelectedClientID(client);
    }
    function handleSortByName() {
        setSortByName(!sortByName);
        getClients();
    }


    return (
        <TableContainer>
            <Table sx={{ minWidth: 1050 }} size="small" aria-label="clients table">
                <TableHead className='container-legends'>
                    <TableRow>
                        <TableCell className='legends'>Cliente <img src={ArrowDown} alt='sort-arrow' onClick={() => handleSortByName()} style={{ 'cursor': 'pointer' }} /></TableCell>
                        <TableCell className='legends'>Cobranças Feitas</TableCell>
                        <TableCell className='legends'>Cobranças Recebidas</TableCell>
                        <TableCell className='legends'>Status</TableCell>
                        <TableCell className='legends'></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className='clienttable-body'>
                    {clients.map((client) => (
                        <Fragment key={client.id}>
                            <TableRow>
                                <TableCell className='linha' />
                                <TableCell className='linha' />
                                <TableCell className='linha' />
                                <TableCell className='linha' />
                                <TableCell className='linha' />
                            </TableRow>
                            <TableRow
                                style={{ backgroundColor: '#FFFFFF' }}
                                data-id={client.id}
                                value={client.id}
                                id={client.id}

                            >
                                <TableCell scope="row">
                                    <div className='flex-column'>
                                        <h3 className='client-name' onClick={(e) => handleModalClientOpen(client.id)}>{client.nome}</h3>
                                        <div className='client-details'>
                                            <img src={EmailIcon} alt='email-icon' />
                                            <p className='clientcard-text'>{client.email}</p>
                                        </div>
                                        <div className='client-details'>
                                            <img src={PhoneIcon} alt='email-icon' />
                                            <p className='clientcard-text'>{client.telefone}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="left"><p className='clientcard-text'>R$ {client.cobrancasFeitas}</p></TableCell>
                                <TableCell align="left"><p className='clientcard-text'>R$ {client.cobrancasPagas}</p></TableCell>
                                <TableCell align="left" >
                                    <p className={client.status === "EM DIA" ? 'clientcard-status clientcard-status-green' : 'clientcard-status clientcard-status-red'}>
                                        {client.status}
                                    </p>
                                </TableCell>
                                <TableCell align="left">
                                    <img src={EditIcon} alt='edit-icon' style={{ 'cursor': 'pointer' }} onClick={(e) => handleModalEditClientOpen(client.id)} />
                                </TableCell>
                            </TableRow>
                        </Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}