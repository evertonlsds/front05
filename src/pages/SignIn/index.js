import './styles.css';
import '../../styles/form.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Logo from'../../images/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, context } from 'react';
import { AuthContext } from '../../routes.js';



function SignIn(){
    //const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const {register, handleSubmit} = useForm();
    const { logIn } = useContext(AuthContext);
    const history = useHistory();

    async function onSubmit(data){
      
      const response = await fetch("https://api-desafio-05.herokuapp.com/login", {
        method:'POST',
        body:JSON.stringify(data),
        headers:{
          'content-type': 'application/json', "charset": "utf-8"
        }
      });

      const {token} = await response.json();
      logIn(token);

      history.push('/home')
    }
    return(
        
        <div className= "container-form ">
            <form 
              className= " form form-sign-in"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="logo mb-lg">
                <img src={Logo} alt="logo"/>
              </div>
              <div>
                <div className="flex-column ">
                  <label htmlFor="email">Email</label>
                  <input id="email" maxLength="33" type= "text" placeholder="exemplo@gmail.com"{...register('email', {required: true})}/>
                  
                  <span className="input-line"></span>
                </div>
                <div className="flex-column light-label input-password">
                  <label htmlFor="password">Senha</label>
                  <input id="password" maxLength="23" type= {showPassword ? 'text' : 'password'} {...register("senha", {required: true})} />
                  
                  <FontAwesomeIcon 
                    icon={showPassword ? faEye : faEyeSlash}
                    className="eye-password"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  <span className="input-line"></span>
                </div>
                <div className="button-align">
                <button className="btn-pink"  onClick={handleSubmit(onSubmit)}>Entrar</button>
                </div>
              </div>
            </form>
            <div className="footer-signIn light-label  ">
              <p>Não tem uma conta?  <a href="/cadastro">Cadastre-se!</a></p> 
            </div>
          </div>
    )
}


  export default SignIn;