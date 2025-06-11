import { useState, useEffect } from "react";
import './navBar.css';

function NavBar(){
    const [nome, setNome] = useState("");

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario");
        if (usuarioSalvo) {
            const usuarioObjeto = JSON.parse(usuarioSalvo); 
            setNome(usuarioObjeto.nome); 
        }
    }, []);

    return(
        <div className="nav">
            <button className="logOut">sair</button>
            <button className="icon">.</button>
            <p className="nomeTitulo">Luísa de Andrade Deschamps</p>
        </div>
    );
}

export default NavBar;