import Card from "../../components/CardCategoria";
import { useState, useEffect } from "react";
import http from "../../components/http";

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);

    const obterCategorias = () => {
        http.get("/categoria/todas")
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((erro) => console.log(erro));
    };

    useEffect(() => {
        obterCategorias();
    }, []);

    return (
        <div className="container">
            <div className="row">
                {categorias.map((item) => (
                    <Card
                        key={item.id}
                        id={item.id}
                        nome={item.nome}
                        url={"produtos"}
                    />
                ))}
            </div>
        </div>
    );
};

export default Categorias;
