import './styles.css';



export default function ChargeCard() {


    return (
        <div className='main-chargecard'>
            <div className='charge-info'>
                <div className='charge-details'>
                    <h3 className='charge-id-client'>#12</h3>
                    <p className='chargecard-text'>Descrição da cobrança</p>
                </div>
                <p className='chargecard-text'>R$ 00.000,00</p>
            </div>
            <div className='charge-info'>
                <p className='chargecard-text'>12/12/2020</p>
                <p className='chargecard-status chargecard-status-green'>PAGO</p>
            </div>
        </div>
    )
}