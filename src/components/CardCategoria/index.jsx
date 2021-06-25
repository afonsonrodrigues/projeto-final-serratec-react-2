import "./estilos.css";
import { Link } from "react-router-dom";

const CardCategoria = (props) => {
    return (
        <Link className="card cardCategoria" to={`/${props.url}/${props.id}`}>
            {props.nome}
        </Link>
    );
};

export default CardCategoria;
