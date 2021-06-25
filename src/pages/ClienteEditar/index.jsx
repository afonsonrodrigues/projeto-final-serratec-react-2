import CardFormulario from "../../components/CardFormulario";
import Logo from "../../components/Logo";
import imagemLogo from "../../assets/img/logo_petshop.png";
import { useParams } from "react-router-dom";
import http from "../../components/http";
import { useState, useEffect } from "react";

const ClienteEditar = () => {
    const logo = {
        src: imagemLogo,
        alt: "imagem da logo do petshop",
        titulo: "Petshop Serratec",
    };

    const { id } = useParams();
    const [nome, setNome] = useState("");
    const [userName, setUserName] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");

    useEffect(() => {
        http.get("cliente/" + id).then((response) => {
            setNome(response.data.nome);
            setUserName(response.data.userName);
            setTelefone(response.data.telefone);
            setCep(response.data.cep);
            setRua(response.data.rua);
            setNumero(response.data.numero);
            setBairro(response.data.bairro);
            setCidade(response.data.cidade);
            setEstado(response.data.estado);
        });
    }, [id]);

    const cepHandle = (evento) => {
        if (evento.target.value.length <= 8) setCep(evento.target.value);
    };

    const obterCep = (evento) => {
        if (!evento.target.value) return;

        const url = `https://viacep.com.br/ws/${evento.target.value}/json/`;
        http.get(url)
            .then((response) => {
                if (!response.data.erro) {
                    setCep(response.data.cep);
                    setRua(response.data.logradouro);
                    setBairro(response.data.bairro);
                    setCidade(response.data.localidade);
                    setEstado(response.data.uf);
                }
            })
            .catch();
    };

    const efetuarCadastro = (evento) => {
        evento.preventDefault();
        const usuario = {
            nome: nome,
            userName: userName,
            telefone: telefone,
            cep: cep,
            rua: rua,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            id: id,
        };
        http.put("cliente/" + id, usuario)
            .then((response) => {
                console.log(response.data);
                alert(`Usuário ${nome} atualizado com sucesso!`);
                setNome("");
                setUserName("");
                setTelefone("");
                setCep("");
                setRua("");
                setNumero("");
                setBairro("");
                setCidade("");
                setEstado("");
            })
            .catch((erro) => {
                console.log("Algo deu erro");
                console.log(erro);
            });
    };

    return (
        <div>
            <CardFormulario>
                <h1>Edição de Cadastro</h1>
                <form className="formCadastro" onSubmit={efetuarCadastro}>
                    <div>
                        <label>Nome</label>
                        <input
                            required
                            type="text"
                            value={nome}
                            onChange={(evento) => setNome(evento.target.value)}
                            placeholder="Digite seu nome completo"
                        />
                    </div>
                    <div>
                        <label>Username</label>
                        <input
                            required
                            type="text"
                            value={userName}
                            onChange={(evento) =>
                                setUserName(evento.target.value)
                            }
                            placeholder="Digite seu nome de usuário"
                        />
                    </div>
                    <div>
                        <label>Telefone</label>
                        <input
                            required
                            type="number"
                            value={telefone}
                            onChange={(evento) =>
                                setTelefone(evento.target.value)
                            }
                            placeholder="(XX) 99999-9999"
                        />
                    </div>
                    <div>
                        <label>Cep</label>
                        <input
                            required
                            type="number"
                            value={cep}
                            onBlur={obterCep}
                            onChange={cepHandle}
                            placeholder="Apenas os 8 digitos"
                        />
                    </div>
                    <div>
                        <label>Rua</label>
                        <input
                            required
                            type="text"
                            value={rua}
                            onChange={(evento) => setRua(evento.target.value)}
                        />
                    </div>
                    <div>
                        <label>Numero Residência</label>
                        <input
                            required
                            type="number"
                            value={numero}
                            onChange={(evento) =>
                                setNumero(evento.target.value)
                            }
                            placeholder="Digite o número da sua residência"
                        />
                    </div>
                    <div>
                        <label>Bairro</label>
                        <input
                            required
                            type="text"
                            value={bairro}
                            onChange={(evento) =>
                                setBairro(evento.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label>Cidade</label>
                        <input
                            required
                            type="text"
                            value={cidade}
                            onChange={(evento) =>
                                setCidade(evento.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label>Estado</label>
                        <input
                            required
                            type="text"
                            value={estado}
                            onChange={(evento) =>
                                setEstado(evento.target.value)
                            }
                        />
                    </div>
                    <button>Salvar</button>
                </form>
            </CardFormulario>
        </div>
    );
};

export default ClienteEditar;
