import './styles.css';
import SideBar from '../../components/SideBar';
import UserMenu from '../../components/UserMenu';
import ModalUser from '../../components/ModalUser';
import ChargeTable from '../../components/ChargeTable';
import SuccessAlert from '../../components/SuccessAlert';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../routes.js';
import ModalChargeEdit from '../../components/ModalChargeEdit';


export default function Charges() {
    const [charges, setCharges] = useState([]);
    const { updateProfileSuccess, setUpdateProfileSuccess } = useContext(AuthContext);

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
            <SideBar page='charges' />
            <div className='main-charges'>
            <ModalChargeEdit/>
                <UserMenu />
                <ModalUser />
                <SuccessAlert
                    openSuccessAlert={updateProfileSuccess}
                    setOpenSuccessAlert={setUpdateProfileSuccess}
                    message="Perfil atualizado com sucesso!" />
                <div className='cards-container2'>
                    <ChargeTable charges={charges} />
                </div>
            </div>
        </div>
    )
}