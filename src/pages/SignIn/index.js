import './styles.css';
import '../../styles/form.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Logo from '../../images/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react';
import { AuthContext } from '../../routes.js';
import { Alert, Snackbar, CircularProgress, Backdrop } from '@mui/material';



function SignIn() {
  //const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { logIn, open, setOpen } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [carregando, setCarregando] = useState(false);
  const history = useHistory();

  async function onSubmit(data) {

    setCarregando(true);

    const response = await fetch("https://api-desafio-05.herokuapp.com/login", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json', "charset": "utf-8"
      }
    });

    const dados = await response.json();

    if (!response.ok) {
      setError(dados);
      setCarregando(false);
      return
    }

    const { token, usuario } = dados;

    logIn(token, usuario);

    setCarregando(false);

    history.push('/home')
  }

  function handleAlertClose() {
    setError('');
    setOpen(false);
  }

  return (

    <div className="container-form ">
      <form
        className=" form form-sign-in"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="logo mb-lg">
          <img src={Logo} alt="logo" />
        </div>
        <div>
          <div className="flex-column">
            <label htmlFor="email">Email</label>
            <input id="email"
              maxLength="33"
              type="text"
              className={errors.email?.type === 'required' && "input-error"}
              placeholder={errors.email?.type === 'required' ? "Campo obrigatório!" : "exemplo@gmail.com"}
              {...register('email', { required: true })} />
            <span className="input-line"></span>
          </div>
          <div className="flex-column light-label input-password">
            <label htmlFor="password">Senha</label>
            <input id="password"
              maxLength="23"
              type={showPassword ? 'text' : 'password'}
              className={errors.senha?.type === 'required' && "input-error"}
              placeholder={errors.senha ? "Campo obrigatório!" : ""}
              {...register("senha", { required: true })} />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              className="eye-password"
              onClick={() => setShowPassword(!showPassword)}
            />
            <span className="input-line"></span>
          </div>
          <div className="button-align">
            <button className="btn-pink" onClick={handleSubmit(onSubmit)}>Entrar</button>
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
          <Snackbar open={open}
            autoHideDuration={8000}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={handleAlertClose}
              severity="success"
              variant="filled">
              Cadastro concluído com sucesso!
            </Alert>
          </Snackbar>
        </div>
      </form >
      <div className="footer-signIn light-label  ">
        <p>Não tem uma conta?  <a href="/cadastro">Cadastre-se!</a></p>
      </div>
      <Backdrop open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div >
  )
}


export default SignIn;