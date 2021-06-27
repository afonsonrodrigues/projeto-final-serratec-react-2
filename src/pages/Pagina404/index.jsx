import imagem from '../../assets/img/404.jpg'
import { Link } from 'react-router-dom'
import './estilos.css'
const Pagina404=()=>{
return(
    <div className="d-flex flex-column align-items-center pg404">
        <img src={imagem} alt="ERRO 404"/>
        <Link to={'/'}><button className="w-100">Volte ao início</button></Link>
    </div>
)
}
export default Pagina404;