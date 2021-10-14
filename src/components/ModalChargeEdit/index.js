import './styles.css';
import CloseIcon from '../../images/close.svg';
import { useState } from 'react';


function ModalChargeEdit(){

    const [openModalChargeEdit, setOpenModalChargeEdit] = useState([]);

    return(
        <>
        {openModalChargeEdit &&
            <div className="modalChargeEdit">
              <div className="modalContatChargeEdit">
                      <img src={CloseIcon}
                        alt="close"
                        className="closeIcon"
                        onClick={() => setOpenModalChargeEdit(false)}
                        />
                        </div>
                        </div>
                        
        }
</>
    )
}



export default ModalChargeEdit;