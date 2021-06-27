import FormularioLogin from '../../components/FormularioLogin'
import './estilos.css'

const Login = (props) => {  
  return(
    <>
        <FormularioLogin onLogin={props.onLogin} />
    </>
  )

}

export default Login