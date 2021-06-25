import './estilos.css'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
  return (<nav className="navbar">
    <ul>
      {props.navbar.map(item =>
        <li key={item.titulo}>
          <Link to={item.link}>{item.titulo}</Link>
        </li>
      )}
    </ul>
  </nav>
  )
}

export default Navbar