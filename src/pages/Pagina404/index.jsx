import imagem from '../../assets/img/404.jpg'
import { Link } from 'react-router-dom'
import './estilos.css'
const Pagina404=()=>{
return(
    <>
    <img src={imagem} alt="ERRO 404"/>
    <Link to={'/'}><button>Volte ao início</button></Link>
    </>
)
}
export default Pagina404;