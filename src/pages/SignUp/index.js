import './styles.css'
import '../../styles/form.css'
import Logo from '../../images/logo.svg'
import { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../routes.js';
import Loading from '../../components/Loading';
import ErrorAlert from '../../components/ErrorAlert';


function SignUp() {
  const { handleSubmit, register, formState: { errors, isValid} } = useForm({mode: "onChange"});
  const [showPassword, setShowPassword] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [error, setError] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { setOpenRegisterSuccess } = useContext(AuthContext);


  const history = useHistory();

  async function cadastro(dados) {
    setCarregando(true);

    const response = await fetch("https://api-desafio-05.herokuapp.com/usuarios", {
      method: 'POST',
      headers: { "Content-Type": "application/json", "charset": "utf-8" },
      body: JSON.stringify(dados)
    });
    const resposta = await response.json();

    if (!response.ok) {
      setOpenErrorAlert(true);
      setError(resposta);
      setCarregando(false);
      return;
    }

    setOpenRegisterSuccess(true);
    setCarregando(false);
    history.push("/");
  }

  return (
    <div className="container-form ">
      <form className=" formSingUp" onSubmit={handleSubmit(cadastro)}>
        <div className="logo-signUp mb-lg">
          <img src={Logo} alt="logo" />
        </div>
        <div>
          <div className="flex-column ">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              className={errors.nome?.type === 'required' ? "input-error" : ""}
              placeholder={errors.nome ? "Campo obrigatório!" : ""}
              {...register("nome", { required: true })} />
            <span className="input-line"></span>
            <label htmlFor="email">Email</label>
            <input id="email"
              type="text"
              className={errors.email?.type === 'required' ? "input-error" : ""}
              placeholder={errors.email?.type === 'required' ? "Campo obrigatório!" : "exemplo@gmail.com"}
              {...register("email", { required: true })} />
            <span className="input-line"></span>
            <div className="flex-column light-label input-password">
              <label htmlFor="password">Senha</label>
              <input id="password"
                maxLength="23"
                type={showPassword ? 'text' : 'password'}
                className={errors.senha?.type === 'required' ? "input-error" : ""}
                placeholder={errors.senha ? "Campo obrigatório!" : ""}
                {...register("senha", { required: true })} />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="eye-password"
                onClick={() => setShowPassword(!showPassword)}
              />
              <span className="input-line"></span>
            </div>
          </div>
          <div className="button-align">
            <button className={isValid ? "btn-pink" : "btn-disabled"} type="submit" disabled={!isValid}>Criar conta</button>
          </div>
          <ErrorAlert
            openErrorAlert={openErrorAlert}
            setOpenErrorAlert={setOpenErrorAlert}
            error={error} />
        </div>
      </form>
      <div className="footer-signIn light-label  ">
        <p>Já possui uma conta?  <a href="/">Acesse agora!</a></p>
      </div>
      <Loading carregando={carregando} />
    </div>
  )
}

export default SignUp;