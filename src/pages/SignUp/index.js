import './styles.css'
import '../../styles/form.css'

import Logo from'../../images/logo.svg'
import ErroCadastro from '../../components/erroMessage';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form';



function SignUp(){
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [erroCadastro, setErroCadastro] = useState(false);


  const history = useHistory();

  async function cadastro(dados){

    console.log(dados)
    const response = await fetch("https://api-desafio-05.herokuapp.com/usuarios", {
      method: 'POST',
      headers: {"Content-Type": "application/json", "charset": "utf-8"},
      body: JSON.stringify(dados)
    });
    await response.json();
    if(response.status > 299){
      setErroCadastro(true);
      console.log(erroCadastro)
      return;
    }
    history.push("/");
  }

    return(
        <div className= "container-form  ">
          <form className= " formSingUp " onSubmit={handleSubmit(cadastro)}>
            <div className="logo-signUp mb-lg">
              <img src={Logo} alt="logo"/>
            </div>
            <div>
              <div className="flex-column ">
                <label htmlFor="nome">Nome</label>
                <input id="nome" type= "text" {...register("nome", {required: true})}/>
                {errors.nome?.type === 'required' && <span style={{color: "red", marginTop: 10}}>Campo obrigatorio</span>}
                <span className="input-line"></span>
                <label htmlFor="email">Email</label>
                <input id="email" type= "text" placeholder="exemplo@gmail.com" {...register("email", {required: true})} />
                {errors.email?.type === 'required' && <span style={{color: "red", marginTop: 10}}>Campo obrigatorio</span>}
                <span className="input-line"></span>
                <div className="flex-column light-label input-password">
                  <label htmlFor="password">Senha</label>
                  <input id="password" maxLength="23" type= {showPassword ? 'text' : 'password'} {...register("senha", {required: true})} />
                  {errors.senha?.type === 'required' && <span style={{color: "red", marginTop: 10}}>Campo obrigatorio</span>}
                  <FontAwesomeIcon 
                  icon={showPassword ? faEye : faEyeSlash}
                  className="eye-password"
                  onClick={() => setShowPassword(!showPassword)}
                  />
                  <span className="input-line"></span>
                </div>
              </div>
              {erroCadastro ? <ErroCadastro /> : ""}
              <div className="button-align">
              <button className="btn-pink" type="submit">Criar conta</button>
              </div>
            </div>
          </form>
          <div className="footer-signIn light-label  ">
            <p>Já possui uma conta?  <a href="/">Acesse agora!</a></p> 
          </div>
        </div>
    )
}

export default SignUp;