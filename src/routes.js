import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastro from './Pages/Cadastro';
import Login from './Pages/Login';
import RotaProtegida from "./Components/RotasProtegidas";
import PagPrincipal from "./Pages/Coordenacao";
import MostrarAluno from './Pages/MostrarAluno';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/pag-principal-coordenacao" element={<RotaProtegida><PagPrincipal /></RotaProtegida>} />
                <Route path="/mostrar-aluno" element={<RotaProtegida><MostrarAluno /></RotaProtegida>} /> 
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;