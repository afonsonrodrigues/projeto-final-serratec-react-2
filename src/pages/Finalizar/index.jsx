import { useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../components/http";
import MensagemAcerto from "../Login/MensagemAcerto";

import "./estilos.css";

const Finalizar = ({ limparCarrinho }) => {
    const { id } = useParams();

    const [pagamento, setPagamento] = useState("");
    const [pagamentos] = useState(["PIX", "BOLETO", "CREDITO", "DEBITO"]);
    const [mensagem, setMensagem] = useState("");
    const [entrega, setEntrega] = useState("");

    const formatter = new Intl.NumberFormat("pr-BR", {
        style: "currency",
        currency: "BRL",
    });

    const manipuladorPagamento = (evento) => {
        setPagamento(evento.target.value);
    };

    const finalizarPedido = (evento) => {
        evento.preventDefault();
        const pedido = {
            numeroPedido: id,
            formaPagemento: pagamento,
        };
        http.post("pedido/finalizar", pedido)
            .then((response) => {
                console.log(response.data);
                setMensagem("Compra efetuada com sucesso");
                setEntrega(response.data);
                verificarResultado(entrega);
                limparCarrinho();
            })
            .catch((erro) => {
                console.log(erro);
            });
    };

    const verificarResultado = (entrega) => {
        if (entrega) {
            return (
                <>
                    <p>
                        Olá, {entrega.cliente.nome}, seu pedido foi finalizado
                        com sucesso!!!
                    </p>
                    <p>Número do pedido: {entrega.codigoPedido}</p>
                    <p>Data do pedido: {entrega.dataPedido}</p>
                    <p>Data da entrega: {entrega.dataEntrega}</p>
                    <div className="d-flex flex-row justify-content-center container flex-wrap">
                        {entrega.itens.map((item) => (
                            <div className="card cardFinalizar m-3">
                                <div className="card-header">{item.nome}</div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        Qtd: {item.quantidade}
                                    </li>
                                    <li className="list-group-item">
                                        Valor unitário:{" "}
                                        {formatter.format(item.preco)}
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                    <p>
                        {" "}
                        Valor total do pedido:{" "}
                        {formatter.format(entrega.totalPedido)}
                    </p>
                </>
            );
        }

        return (
            <form onSubmit={finalizarPedido}>
                <h3>Finalizar</h3>
                <label className="text-center mb-4">Forma de Pagamento:</label>
                <select
                    className="mb-4"
                    value={pagamento}
                    onChange={manipuladorPagamento}
                >
                    <option>--------</option>
                    {pagamentos.map((pgto, indice) => (
                        <option key={indice} value={pgto}>
                            {pgto}
                        </option>
                    ))}
                </select>
                <button>Finalizar</button>
                {mensagem && (
                    <MensagemAcerto msg={mensagem} entrega={entrega} />
                )}
            </form>
        );
    };

    return <div className="main">{verificarResultado(entrega)}</div>;
};
export default Finalizar;
