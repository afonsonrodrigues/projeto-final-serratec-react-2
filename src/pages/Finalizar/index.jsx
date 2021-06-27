import { useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../components/http";
import MensagemAcerto from "../Login/MensagemAcerto";

import './estilos.css';

const Finalizar = ({ limparCarrinho }) => {
    const { id } = useParams();

    const [pagamento, setPagamento] = useState("");
    const [pagamentos] = useState(["PIX", "BOLETO", "CREDITO", "DEBITO"]);
    const [mensagem, setMensagem] = useState("");
    const [entrega, setEntrega] = useState('')

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
                console.log(response);
                setMensagem("Compra efetuada com sucesso");
                setEntrega(response.data)
                verificarResultado(entrega)
                limparCarrinho()
            })
            .catch((erro) => {
                console.log(erro);
            });
    };

    const verificarResultado = (entrega) => {
        if (entrega) {
            return "Foiii"
        }

        return (
            <form onSubmit={finalizarPedido}>
                <h3>Finalizar</h3>
                <label className="text-center mb-4">Forma de Pagamento:</label>
                <select className="mb-4" value={pagamento} onChange={manipuladorPagamento}>
                    <option>--------</option>
                    {pagamentos.map((pgto, indice) => (
                        <option key={indice} value={pgto}>
                            {pgto}
                        </option>
                    ))}
                </select>
                <button>Finalizar</button>
                {mensagem && <MensagemAcerto msg={mensagem} entrega={entrega}/>}
            </form>
        )

    }

    return (
        <div className="main">
            {verificarResultado(entrega)}
        </div>
    );
};
export default Finalizar;
