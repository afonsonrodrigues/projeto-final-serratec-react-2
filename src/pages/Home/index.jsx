import './estilos.css'
import {Link} from 'react-router-dom'
import imagem2 from "../../assets/img/Promocao1.webp"
import imagem1 from "../../assets/img/Produtos1.png"
const Home = () => {
    return( 
        <>
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active clicavel" data-bs-interval="3000">
            <Link to={"/produtos"}><img src={imagem1} className="d-block w-100 " alt="..."/></Link>
          </div>
          <div className="carousel-item " data-bs-interval="3000">
            <img src={imagem2} className="d-block w-100" alt="..."/>
          </div>
        </div>
      </div>
        <div className="centralizar">
            <h3>Ainda não possui uma conta no nosso site?</h3>
            <h5>Não perca tempo, cadastre-se agora mesmo para ter acesso a todos os produtos de nossa loja e aproveitar a incrível promoção "É raro mas acontece com frequência"! </h5>
            <Link to={"/cliente-cadastro"}><button>Cadastre-se</button></Link>
            <hr/>
        </div>
        <div className="centralizar">
            <h3>Sobre nós</h3>
            <h5>Somos os grupo 6 da residência de software da Serratec, da turma de Nova Friburgo. Integrantes: Afonso Rodrigues, Davi Faustino, João Stael, José Quaresma e Thamires Ramos.</h5>
        </div>
        </>
    )
}

export default Home;