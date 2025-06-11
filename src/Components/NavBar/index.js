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

    const logout = () => {
        localStorage.removeItem("usuario"); 
        alert("Logout realizado com sucesso!");
        window.location.href = "/"; 
    };

    return(
        <div className="nav">
            <button onClick={logout} className="logOut">sair</button>
            <button className="icon">.</button>
            <p className="nomeTitulo">Luísa de Andrade Deschamps</p>
        </div>
    );
}

export default NavBar;