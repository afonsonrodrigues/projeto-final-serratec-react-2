import CardProdutos from "../../components/CardProdutos";
import "./estilos.css";
import http from "../../components/http";
import { useState, useEffect } from "react";
const Produtos = ({ adicionaProduto }) => {
    const [produtos, setProdutos] = useState([]);

    const getProdutos = () => {
        http.get("produto/todos")
            .then((responta) => setProdutos(responta.data))
            .catch((erro) => console.log(erro));
    };
    useEffect(() => {
        getProdutos();
    }, []);
    console.log(produtos);
    return (
        <div className="container">
            <div className="row">
                {produtos.map((produto) => (
                    <CardProdutos
                        key={produto.id}
                        id={produto.id}
                        nome={produto.nome}
                        preco={produto.preco}
                        imagem={produto.imagemBase64}
                        codigo={produto.codigo}
                        adicionaProduto={adicionaProduto}
                    />
                ))}
            </div>
        </div>
    );
};

export default Produtos;
