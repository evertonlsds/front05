import './styles.css';


function Tooltip(){
    return(
        <div className="tooltip">
            <div className="seta"></div>
            <p>Apagar item?</p>
              <div className="buttons">
                <button className="button-yes">Sim</button>
                <button className="button-no">Não</button>
              </div>

        </div>

    )
}



export default Tooltip;