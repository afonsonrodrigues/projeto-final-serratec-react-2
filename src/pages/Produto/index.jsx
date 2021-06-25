import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./estilos.css";
import http from "../../components/http";
const Produto = () => {
    const { id } = useParams();
    const [produto, setProduto] = useState({});
    useEffect(() => {
        http.get("/produto/id/" + id).then((response) =>
            setProduto(response.data)
        );
    }, [id]);

    const adicionarCarrinho = (evento) => {
        evento.preventDefault();
        console.log("adicionado");
    };

    return (
        <form onSubmit={adicionarCarrinho}>
            <div className="container">
                <div className="row row-cols-2">
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
                        <button className="buttonDetalhes">
                            Adicionar ao carrinho
                        </button>
                    </div>
                    <div className="row">
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
