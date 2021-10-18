import './styles.css';
import SideBar from '../../components/SideBar';
import UserMenu from '../../components/UserMenu';
import ModalUser from '../../components/ModalUser';
import ChargeTable from '../../components/ChargeTable';
import SuccessAlert from '../../components/SuccessAlert';
import ErrorAlert from '../../components/ErrorAlert';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../routes.js';
import ModalChargeEdit from '../../components/ModalChargeEdit';


export default function Charges() {
    const [charges, setCharges] = useState([]);
    const { updateProfileSuccess, setUpdateProfileSuccess } = useContext(AuthContext);
    const [chargesByName, setChargesByName] = useState(false);
    const [openModalChargeEdit, setOpenModalChargeEdit] = useState(false);
    const [selectedChargeID, setSelectedChargeID] = useState([]);
    const [selectedCharge, setSelectedCharge] = useState([]);
    const [updateChargeSuccess, setUpdateChargeSuccess] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const [error, setError] = useState('');

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

        if (chargesByName) {
            sortChargesByName(resposta.cobrancasDoUsuario);
        }

        setCharges(resposta.cobrancasDoUsuario);
    }

    useEffect(() => {
        getCharges();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function sortChargesByName(charges) {
        charges.sort(function (a, b) {
            return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0)
        })
    };

    return (
        <div className='flex-row'>
            <SideBar page='charges' />
            <div className='main-charges'>
                <ModalChargeEdit
                    openModalChargeEdit={openModalChargeEdit}
                    setOpenModalChargeEdit={setOpenModalChargeEdit}
                    selectedChargeID={selectedChargeID}
                    selectedCharge={selectedCharge}
                    setUpdateChargeSuccess={setUpdateChargeSuccess}
                    setOpenErrorAlert={setOpenErrorAlert}
                    setError={setError} />
                <UserMenu />
                <ModalUser />
                <SuccessAlert
                    openSuccessAlert={updateProfileSuccess}
                    setOpenSuccessAlert={setUpdateProfileSuccess}
                    message="Perfil atualizado com sucesso!" />
                <SuccessAlert
                    openSuccessAlert={updateChargeSuccess}
                    setOpenSuccessAlert={setUpdateChargeSuccess}
                    message="Cobrança atualizada com sucesso!" />
                <ErrorAlert
                    openErrorAlert={openErrorAlert}
                    setOpenErrorAlert={setOpenErrorAlert}
                    error={error} />
                <div className='cards-container2'>
                    <ChargeTable charges={charges}
                        setChargesByName={setChargesByName}
                        chargesByName={chargesByName}
                        getCharges={getCharges}
                        setOpenModalChargeEdit={setOpenModalChargeEdit}
                        setSelectedChargeID={setSelectedChargeID}
                        selectedChargeID={selectedChargeID}
                        selectedCharge={selectedCharge}
                        setSelectedCharge={setSelectedCharge} />
                </div>
            </div>
        </div>
    )
}