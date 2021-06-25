import './estilos.css'

const Logo = (props) => {
  return (
    <section className="principal fundo">
      <div>
        <img src={props.src} alt={props.alt} />
        {/* <h1>{props.titulo}</h1> */}
      </div>
    </section>
  )
}

export default Logo;