import CardFormulario from "../../components/CardFormulario";
import http from "../../components/http";
import { useState, useEffect } from "react";
import logoLogin from "../../assets/img/logoLogin.png";
import { useHistory } from "react-router-dom";

const ClienteEditar = () => {
    const id = localStorage.getItem("id");
    const [nome, setNome] = useState("");
    const [userName, setUserName] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const history = useHistory();

    useEffect(() => {
        http.get("cliente/detalhe/" + id).then((response) => {
            setNome(response.data.nome);
            setUserName(response.data.username);
            setTelefone(response.data.telefone);
            setCep(response.data.endereco.cep);
            setRua(response.data.endereco.rua);
            setNumero(response.data.endereco.numeroResidencia);
            setBairro(response.data.endereco.bairro);
            setCidade(response.data.endereco.cidade);
            setEstado(response.data.endereco.estado);
            console.log(response.data);
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
            username: userName,
            telefone: telefone,
            endereco: {
                cep: cep,
                rua: rua,
                numeroResidencia: numero,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
            },
            id: id,
        };
        console.log(usuario);
        http.put("cliente/" + id, usuario)
            .then((response) => {
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
                history.push("/");
            })
            .catch((erro) => {
                console.log("Algo deu erro");
                console.log(erro);
            });
    };

    return (
        <div>
            <CardFormulario>
                <form className="formCadastro" onSubmit={efetuarCadastro}>
                    <img src={logoLogin} alt="Logo login" />
                    <h3>Editar Cadastro</h3>
                    <div className=" d-flex flex-row flex-wrap justify-content-around">
                        <div className="cadastro1">
                            <div>
                                <label>Nome</label>
                                <input
                                    className="form-control py-2 px-4"
                                    required
                                    type="text"
                                    value={nome}
                                    onChange={(evento) =>
                                        setNome(evento.target.value)
                                    }
                                    placeholder="Digite seu nome completo"
                                />
                            </div>
                            <div>
                                <label>Username</label>
                                <input
                                    className="form-control py-2 px-4"
                                    required
                                    type="text"
                                    value={userName}
                                    onChange={(evento) =>
                                        setUserName(evento.target.value)
                                    }
                                    minLength="5"
                                    placeholder="Digite seu nome de usuário"
                                />
                            </div>
                            <div>
                                <label>Telefone</label>
                                <input
                                    className="form-control py-2 px-4"
                                    required
                                    type="number"
                                    value={telefone}
                                    onChange={(evento) =>
                                        setTelefone(evento.target.value)
                                    }
                                    placeholder="(XX) 99999-9999"
                                />
                            </div>
                        </div>
                        <div className="cadastro2">
                            <div>
                                <label>Cep</label>
                                <input
                                    className="form-control py-2 px-4"
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
                                    className="form-control py-2 px-4"
                                    required
                                    type="text"
                                    value={rua}
                                    onChange={(evento) =>
                                        setRua(evento.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label>Numero Residência</label>
                                <input
                                    className="form-control py-2 px-4"
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
                                    className="form-control py-2 px-4"
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
                                    className="form-control py-2 px-4"
                                    required
                                    type="text"
                                    value={cidade}
                                    onChange={(evento) =>
                                        setCidade(evento.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <button>Salvar</button>
                </form>
            </CardFormulario>
        </div>
    );
};

export default ClienteEditar;
