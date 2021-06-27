import { Link } from "react-router-dom";
import "./estilo.css";
import { useHistory } from "react-router-dom";


const CardProdutos = (props) => {
    const formatter = new Intl.NumberFormat("pr-BR", {
        style: "currency",
        currency: "BRL",
    });

    const history = useHistory();

    const adicionar = () => {
        if (props.token) {
            return (
                props.adicionaProduto({
                    id: props.id,
                    nome: props.nome,
                    preco: props.preco,
                    codigo: props.codigo,
                    quantidade: 1,
                })
            )
        }
        return history.push("/login")
    };

    return (
        <div className="card cardProduto">
            <img src={props.imagem} className="card-img-top" alt="..."></img>
            <div className="card-body">
                <h5 className="card-title">{props.nome}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    {formatter.format(props.preco)}
                </li>
            </ul>
            <div className="card-body">
                <Link to={`/produto/id/${props.id}`}>Ver detalhes</Link>
            </div>
            <button
                className="btn btn-warning btnAdicionar"
                onClick={adicionar}
            >
                <i className="fas fa-shopping-cart"></i> Adicionar ao Carrinho
            </button>
        </div>
    );
};

export default CardProdutos;
