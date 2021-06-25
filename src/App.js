import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ClienteCadastrar from "./pages/ClienteCadastrar";
import ClienteEditar from "./pages/ClienteEditar";
import Home from "./pages/Home";
import "./App.css";
import Login from "../src/pages/Login";
import Carrinho from "./pages/Carrinho";
import Produtos from "./pages/Produtos";
import Produto from "./pages/Produto";
import Footer from "../src/components/Footer";
import Categorias from "./pages/Categorias";
import { useState } from "react";
import Finalizar from "./pages/Finalizar";

import Pagina404 from "./pages/Pagina404";

function App() {
    const [token, setToken] = useState("");
    const onLogin = (token) => {
        setToken(token);
    };

    const [userName, setUserName] = useState("");

    const pegarNome = (nome) => {
        setUserName(nome);
    };

    const logout = () => {
        setToken("");
        setUserName("");
    };

    const [carrinho, setCarrinho] = useState([]);
    const adicionaProduto = (produto) => {
        setCarrinho([...carrinho, produto]);
    };
    const removerProduto = (indice) => {
        carrinho.splice(indice, 1);
        setCarrinho([...carrinho]);
    };

    const menu = [
        {
            titulo: "Inicio",
            link: "/",
        },
        {
            titulo: "Produtos",
            link: "/produtos",
        },
        {
            titulo: "Categorias",
            link: "/categorias",
        },
    ];
    return (
        <div className="App">
            <BrowserRouter>
                <Header
                    token={token}
                    onLogout={logout}
                    nome={userName}
                    carrinho={carrinho}
                />
                <Navbar navbar={menu} />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/cliente-cadastro">
                        <ClienteCadastrar />
                    </Route>
                    <Route path="/cliente-editar">
                        <ClienteEditar />
                    </Route>
                    <Route path="/login">
                        <Login onLogin={onLogin} pegarNome={pegarNome} />
                    </Route>
                    <Route path="/carrinho">
                        <Carrinho
                            produtos={carrinho}
                            removerProduto={removerProduto}
                        />
                    </Route>
                    <Route exact path="/produtos">
                        <Produtos adicionaProduto={adicionaProduto} />
                    </Route>
                    <Route path="/produto/id/:id">
                        <Produto adicionaProduto={adicionaProduto} />
                    </Route>
                    <Route path="/categorias">
                        <Categorias />
                    </Route>
                    <Route path="/finalizar/:id">
                        <Finalizar />
                    </Route>
                    <Route>
                        <Pagina404 />
                    </Route>
                </Switch>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
