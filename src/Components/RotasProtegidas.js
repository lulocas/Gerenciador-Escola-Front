import { Navigate } from "react-router-dom";

function RotaProtegida({ children }) {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    return usuario ? children : <Navigate to="/" />;
}

export default RotaProtegida;