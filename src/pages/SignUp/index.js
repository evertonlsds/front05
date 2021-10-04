import './styles.css'
import '../../styles/form.css'

import Logo from '../../images/logo.svg'
import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form';


function SignUp() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');


  const history = useHistory();

  async function cadastro(dados) {

    console.log(dados)
    const response = await fetch("https://api-desafio-05.herokuapp.com/usuarios", {
      method: 'POST',
      headers: { "Content-Type": "application/json", "charset": "utf-8" },
      body: JSON.stringify(dados)
    });
    const resposta = await response.json();

    if (!response.ok) {
      setError(resposta);
      return;
    }
    history.push("/");
  }

  function handleAlertClose() {
    setError('');
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
            <input id="nome" type="text" {...register("nome", { required: true })} />
            {errors.nome?.type === 'required' && <span className="error">Campo obrigatório!</span>}
            <span className="input-line"></span>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" placeholder={errors.email ? "" : "exemplo@gmail.com"} {...register("email", { required: true })} />
            {errors.email?.type === 'required' && <span className="error error2">Campo obrigatório!</span>}
            <span className="input-line"></span>
            <div className="flex-column light-label input-password">
              <label htmlFor="password">Senha</label>
              <input id="password" maxLength="23" type={showPassword ? 'text' : 'password'} {...register("senha", { required: true })} />
              {errors.senha?.type === 'required' && <span className="error">Campo obrigatório!</span>}
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="eye-password"
                onClick={() => setShowPassword(!showPassword)}
              />
              <span className="input-line"></span>
            </div>
          </div>
          <div className="button-align">
            <button className="btn-pink" type="submit">Criar conta</button>
          </div>
          <Snackbar open={error}
            autoHideDuration={5000}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={handleAlertClose}
              severity="error"
              variant="filled">
              {error}
            </Alert>
          </Snackbar>
        </div>
      </form>
      <div className="footer-signIn light-label  ">
        <p>Já possui uma conta?  <a href="/">Acesse agora!</a></p>
      </div>
    </div>
  )
}

export default SignUp;