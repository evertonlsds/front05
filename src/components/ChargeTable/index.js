import './styles.css';
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
                        <>
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
                                <TableCell align="left">{charge.id}</TableCell>
                                <TableCell align="left">{charge.nome}</TableCell>
                                <TableCell align="left">{charge.descricao}</TableCell>
                                <TableCell align="left">{charge.valor}</TableCell>
                                <TableCell align="left">{charge.nome}</TableCell>
                                <TableCell align="left">{charge.vencimento}</TableCell>
                            </TableRow>

                        </>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}