import './styles.css';



export default function ChargeCard() {


    return (
        <div className='main-chargecard'>
            <h3 className='client-id'>#12</h3>
            <p className='chargecard-text'>Nome do Cliente</p>
            <p className='chargecard-text'>Descrição da cobrança</p>
            <p className='chargecard-text'>R$ 00.000,00</p>
            <p className='chargecard-status chargecard-status-green'>PAGO</p>
            <p className='chargecard-text'>12/12/2020</p>
        </div>
    )
}