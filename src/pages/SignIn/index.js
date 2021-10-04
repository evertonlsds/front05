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
import { Alert, Snackbar } from '@mui/material';



function SignIn() {
  //const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { logIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const history = useHistory();

  async function onSubmit(data) {

    const response = await fetch("https://api-desafio-05.herokuapp.com/login", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json', "charset": "utf-8"
      }
    });

    const dados = await response.json();

    if (!response.ok) {
      setError(dados)
      return
    }
    const { token } = dados;

    logIn(token);

    history.push('/home')
  }

  function handleAlertClose() {
    setError('');
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
          <div className="flex-column ">
            <label htmlFor="email">Email</label>
            <input id="email" maxLength="33" type="text" placeholder="exemplo@gmail.com"{...register('email', { required: true })} />
            <span className="input-line"></span>
            {errors.email?.type === 'required' && <span className="error">É preciso informar um email!</span>}
          </div>
          <div className="flex-column light-label input-password">
            <label htmlFor="password">Senha</label>
            <input id="password" maxLength="23" type={showPassword ? 'text' : 'password'} {...register("senha", { required: true })} />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              className="eye-password"
              onClick={() => setShowPassword(!showPassword)}
            />
            <span className="input-line"></span>
            {errors.senha?.type === 'required' && <span className="error">É preciso informar uma senha!</span>}
          </div>
          <div className="button-align">
            <button className="btn-pink" onClick={handleSubmit(onSubmit)}>Entrar</button>
          </div>
          <Snackbar open={error}
            autoHideDuration={5000}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={handleAlertClose} severity="error" variant="filled">
              {error}
            </Alert>
          </Snackbar>
        </div>
      </form >
      <div className="footer-signIn light-label  ">
        <p>Não tem uma conta?  <a href="/cadastro">Cadastre-se!</a></p>
      </div>
    </div >
  )
}


export default SignIn;