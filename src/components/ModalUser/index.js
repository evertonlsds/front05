import './styles.css';
import '../../styles/modal.css';
import '../../styles/form.css'
import CloseIcon from '../../images/close.svg'
import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../routes.js';
import Loading from '../Loading';
import ErrorAlert from '../ErrorAlert';
import InputMasked from '../InputMasked';



function ModalUser() {
  const { handleSubmit, register, formState: { errors }, control } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { setUpdateProfileSuccess, modalOpen, setModalOpen, perfil, setPerfil } = useContext(AuthContext);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  async function atualizarPerfil(dados) {
    setCarregando(true);
    const response = await fetch("https://api-desafio-05.herokuapp.com/perfil", {
      method: 'PUT',
      headers: {
        'Content-Type': "application/json",
        "charset": "utf-8",
        'Authorization': `Bearer ${localStorage.getItem('token')} `
      },
      body: JSON.stringify(dados)
    });
    const resposta = await response.json();
    setCarregando(false);

    if (!response.ok) {
      setError(resposta);
      setOpenErrorAlert(true);
      return;
    }
    setUpdateProfileSuccess(true);
    setModalOpen(false);
    setPerfil(resposta);
  }

  return (
    <>
      {modalOpen &&
        <div className="modal">
          <div className="modal-content">
            <form className=" formSingUp" onSubmit={handleSubmit(atualizarPerfil)}>
              <div className=" mb-lg">
                <img src={CloseIcon} className='close-icon' alt="fechar" onClick={() => setModalOpen(false)} />
                <h1> / / EDITAR USUÁRIO </h1>
              </div>
              <div>
                <div className="flex-column ">
                  <label htmlFor="nome">Nome</label>
                  <input
                    id="nome"
                    type="text"
                    className={errors.nome?.type === 'required' ? "input-error" : ""}
                    placeholder={perfil.nome}
                    {...register("nome")} />
                  <span className="input-line"></span>
                  <label htmlFor="email">Email</label>
                  <input id="email"
                    type="text"
                    placeholder={perfil.email}
                    {...register("email")} />
                  <span className="input-line"></span>
                  <div className="flex-column light-label input-password">
                    <label htmlFor="password">Nova Senha</label>
                    <input id="password"
                      maxLength="23"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Deixar vazio para não editar"
                      {...register("senha")} />
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      className="eye-password"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                    <span className="input-line"></span>
                    <label htmlFor="phone">Telefone</label>
                    <input
                      id="phone"
                      type="number"
                      placeholder={perfil.telefone}
                      {...register("telefone")} />
                    <span className="input-line"></span>
                    <label htmlFor="cpf">CPF</label>
                    <InputMasked control={control} mask="999.999.999-99" name="cpf" />
                    <span className="input-line"></span>
                  </div>
                </div>
                <div className="button-align">
                  <button className="btn-pink" type="submit">Editar conta</button>
                </div>
                <ErrorAlert
                  openErrorAlert={openErrorAlert}
                  setOpenErrorAlert={setOpenErrorAlert}
                  error={error} />
              </div>
            </form>
          </div>
          <Loading carregando={carregando} />
        </div>
      }
    </>
  )
}



export default ModalUser;