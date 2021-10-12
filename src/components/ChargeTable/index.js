import './styles.css';
import { Fragment } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export default function ChargeTable({ charges }) {
    return (
        <TableContainer>
            <Table sx={{ minWidth: 1050 }} size="small" aria-label="clients table">
                <TableHead className='container-legends'>
                    <TableRow>
                        <TableCell className='legends'>ID</TableCell>
                        <TableCell className='legends'>Cliente</TableCell>
                        <TableCell className='legends'>Descrição</TableCell>
                        <TableCell className='legends'>Valor</TableCell>
                        <TableCell className='legends'>Status</TableCell>
                        <TableCell className='legends'>Vencimento</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className='clienttable-body'>
                    {charges && charges.map((charge) => (
                        <Fragment key={charge.id}>
                            <TableRow>
                                <TableCell className='linha' />
                                <TableCell className='linha' />
                                <TableCell className='linha' />
                                <TableCell className='linha' />
                                <TableCell className='linha' />
                                <TableCell className='linha' />
                            </TableRow>
                            <TableRow

                                style={{ backgroundColor: '#FFFFFF' }}
                            >
                                <TableCell align="left" >
                                    <h3 className='charge-id'>#{charge.id}</h3>
                                </TableCell>
                                <TableCell align="left">
                                    <p className='charge-row'> {charge.nome} </p>
                                </TableCell>
                                <TableCell align="left">
                                    <p className='charge-row'>{charge.descricao}</p>
                                </TableCell>
                                <TableCell align="left">
                                    <p className='charge-row'>R$ {charge.valor}</p>
                                </TableCell>
                                <TableCell align="left">
                                    <p className={charge.status === "PENDENTE" ? 'charge-status charge-status-blue' : 'charge-status charge-status-red'}> {charge.status} </p>
                                </TableCell>
                                <TableCell align="left">
                                    <p className='charge-row'>{charge.vencimento}</p>
                                </TableCell>
                            </TableRow>

                        </Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}