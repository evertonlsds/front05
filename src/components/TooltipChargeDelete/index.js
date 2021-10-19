import './styles.css';


function TooltipChargeDelete({ deleteCharge }) {
  return (
    <div className="tooltip">
      <div className="seta"></div>
      <p>Apagar item?</p>
      <div className="buttons">
        <button className="button-yes" type='button' onClick={() => deleteCharge()}>Sim</button>
        <button className="button-no" type='button'>Não</button>
      </div>

    </div>

  )
}



export default TooltipChargeDelete;