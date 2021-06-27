import iconeUsuario from "../../assets/icons/usuario.svg";
import logo from "../../assets/img/logo.png";
import { Link, useHistory } from "react-router-dom";

import "./estilos.css";

const Header = ({ token, onLogout,carrinho }) => {
    const history = useHistory();

    const logout = () => {
        history.push("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("email");
        onLogout()
    };

    const numeroDeProdutos = carrinho.length;

    let nome = localStorage.getItem('userName')

    const verificarLogin = (token) => {
        if (token) {
            return (
                <div className="btn-group usuarioLogado">
                    <button
                        className="btn dropdown-toggle"
                        type="button"
                        id="dropdownMenuClickableInside"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        aria-expanded="false"
                    >
                        <em>Olá,</em> <strong>{nome}</strong>
                    </button>
                    <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuClickableInside"
                    >
                        <li>
                            <Link
                                to="/cliente-editar"
                                className="dropdown-item btnLogin"
                                href="#"
                            >
                                <i className="fas fa-user-edit"></i><span className="ms-2">Editar
                                cadastro</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to=""
                                className="dropdown-item btnLogin"
                                href="#"
                            >
                                <i className="fas fa-shopping-basket"></i><span className="ms-2">Meus
                                pedidos</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="#"
                                className="dropdown-item btnLogin"
                                onClick={logout}
                            >
                                <i className="fas fa-sign-out-alt"></i><span className="ms-2">Sair</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            );
        }
        return (
            <Link to="/login" className="btnLogin">
                <img
                    className="usuarioImg"
                    src={iconeUsuario}
                    alt="Icone de usuário"
                />
                <p>Faça login ou cadastre-se</p>
            </Link>
        );
    };

    return (
        <header>
            <Link to="/" className="logo">
                <img src={logo} alt="Logo do e-commerce" />
            </Link>

            <div className="header-carrinho">
                {verificarLogin(localStorage.getItem('token'))}
                <div className="carrinho">
                    <Link to="/carrinho">
                        <i className="fas fa-shopping-cart"></i>
                    </Link>
                    <p>{numeroDeProdutos}</p>
                </div>
            </div>
        </header>
    );
};

export default Header;
