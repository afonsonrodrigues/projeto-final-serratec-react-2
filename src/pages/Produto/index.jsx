import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./estilos.css";
import http from "../../components/http";
import { useHistory } from "react-router-dom";


const Produto = (props) => {
    const { id } = useParams();
    const [produto, setProduto] = useState({});
        
    useEffect(() => {
        http.get("/produto/id/" + id).then((response) =>
            setProduto(response.data)
        );
    }, [id]);

    const history = useHistory();

    const adicionarCarrinho = (evento) => {
        evento.preventDefault()
        if (localStorage.getItem('token')) {
            return (
                props.adicionaProduto({
                    id: produto.id,
                    nome: produto.nome,
                    preco: produto.preco,
                    codigo: produto.codigo,
                    quantidade: 1,
                })
            )
        }
        return history.push("/login")
    };

    return (
        <form onSubmit={adicionarCarrinho}>
            <div className="container mt-5">
                <div className="row row-cols-2 produtoDetalhado">
                    <div className="col inf">
                        <img
                            className="imagem"
                            src={produto.imagemBase64}
                            alt={produto.nome}
                        />
                    </div>
                    <div className="col card card-body inf">
                        <h1 className="produto">{produto.nome}</h1>
                        <h3 className="preco">R$ {produto.preco}</h3>
                        <button className="buttonDetalhes" onClick={adicionarCarrinho}>
                            Adicionar ao carrinho
                        </button>
                    </div>
                    <div className="row cardDescricao">
                        <div className="col descricao collapse-show card card-body">
                            <p>
                                {" "}
                                <strong>
                                    Descrição do produto:
                                    <hr />
                                </strong>
                                {produto.descricao}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};
export default Produto;
