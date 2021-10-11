import './styles.css';



export default function ChargeCard({ cobranca }) {


    return (
        <div className='main-chargecard'>
            <div className='charge-info'>
                <div className='charge-details'>
                    <h3 className='charge-id-client'>#{cobranca.id}</h3>
                    <p className='chargecard-text'>{cobranca.descricao}</p>
                </div>
                <p className='chargecard-text'>R$ {cobranca.valor}</p>
            </div>
            <div className='charge-info'>
                <p className='chargecard-text'>{cobranca.vencimento}</p>
                <p className='chargecard-status chargecard-status-green'>{cobranca.status}</p>
            </div>
        </div>
    )
}