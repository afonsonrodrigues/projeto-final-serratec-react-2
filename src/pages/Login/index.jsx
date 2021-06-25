import FormularioLogin from '../../components/FormularioLogin'
import './estilos.css'

const Login = (props) => {  
  return(
    <>
        <FormularioLogin onLogin={props.onLogin} pegarNome={props.pegarNome}/>
    </>
  )

}

export default Login