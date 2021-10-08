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

export default function ClientTable({ clients }) {
    return (
        <TableContainer>
            <Table sx={{ minWidth: 1050 }} size="small" aria-label="clients table">
                <TableHead className='container-legends'>
                    <TableRow>
                        <TableCell className='legends'>Cliente</TableCell>
                        <TableCell className='legends'>Cobranças Feitas</TableCell>
                        <TableCell className='legends'>Cobranças Recebidas</TableCell>
                        <TableCell className='legends'>Status</TableCell>
                        <TableCell className='legends'></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className='clienttable-body'>
                    {clients.map((client) => (
                        <>
                            <TableRow>
                                <TableCell className='linha' />
                                <TableCell className='linha' />
                                <TableCell className='linha' />
                                <TableCell className='linha' />
                                <TableCell className='linha' />
                            </TableRow>
                            <TableRow

                                style={{ backgroundColor: '#FFFFFF' }}
                            >
                                <TableCell scope="row">
                                    <div className='flex-column'>
                                        <h3 className='client-name'>{client.nome}</h3>
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
                                <TableCell align="left">{client.nome}</TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left" className='clientcard-status'> EM DIA</TableCell>
                                <TableCell align="left">
                                    <img src={EditIcon} alt='edit-icon' style={{ 'cursor': 'pointer' }} />
                                </TableCell>
                            </TableRow>

                        </>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}