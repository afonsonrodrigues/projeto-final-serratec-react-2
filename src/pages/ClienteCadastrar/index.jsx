import "./estilos.css";
import CardFormulario from "../../components/CardFormulario";
import http from "../../components/http";
import { useState } from "react";
import logoLogin from "../../assets/img/logoLogin.png";
import axios from "axios";

const ClienteCadastrar = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [senha, setSenha] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");

    const cpfHandle = (evento) => {
        if (evento.target.value.length <= 11) setCpf(evento.target.value);
    };
    const cepHandle = (evento) => {
        if (evento.target.value.length <= 8) setCep(evento.target.value);
    };

    const obterCep = (evento) => {
        if (!evento.target.value) return;

        const url = `https://viacep.com.br/ws/${evento.target.value}/json/`;
        axios
            .get(url)
            .then((response) => {
                if (!response.data.erro) {
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
            email: email,
            username: userName,
            senha: senha,
            cpf: cpf,
            telefone: telefone,
            dataNascimento: dataNascimento,
            endereco: {
                cep: cep,
                rua: rua,
                numeroResidencia: numero,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
            },
        };
        console.log(usuario);
        http.post("cliente", usuario)
            .then((response) => {
                console.log(response.data);
                console.log(usuario);
                localStorage.setItem("token", response.data.access_token);
                alert(`Usuário ${nome} cadastrada com sucesso!`);
                setNome("");
                setEmail("");
                setUserName("");
                setSenha("");
                setCpf("");
                setTelefone("");
                setDataNascimento("");
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
                <form className="formCadastro" onSubmit={efetuarCadastro}>
                    <img src={logoLogin} alt="Logo login" />
                    <h3>Cadastro</h3>
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
                        <label>Email</label>
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(evento) => setEmail(evento.target.value)}
                            placeholder="Digite seu email"
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
                            minLength="5"
                            placeholder="Digite seu nome de usuário"
                        />
                    </div>
                    <div>
                        <label>Senha</label>
                        <input
                            required
                            type="password"
                            value={senha}
                            onChange={(evento) => setSenha(evento.target.value)}
                            placeholder="Crie uma senha de 8 a 15 digitos"
                        />
                    </div>
                    <div>
                        <label>CPF</label>
                        <input
                            required
                            type="number"
                            value={cpf}
                            onChange={cpfHandle}
                            placeholder="Apenas os 11 digitos"
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
                        <label>Data de Nascimento</label>
                        <input
                            required
                            type="data"
                            value={dataNascimento}
                            onChange={(evento) =>
                                setDataNascimento(evento.target.value)
                            }
                            placeholder="YYYY-MM-DD"
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
                    <div></div>
                    <button>Cadastrar</button>
                </form>
            </CardFormulario>
        </div>
    );
};

export default ClienteCadastrar;
