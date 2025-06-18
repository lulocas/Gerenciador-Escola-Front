import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastro from './Pages/Cadastro';
import Login from './Pages/Login';
import RotaProtegida from "./Components/RotasProtegidas";
import PagPrincipal from "./Pages/Coordenacao";
import MostrarAluno from './Pages/MostrarAluno';
import InfoAlunosC from "./Pages/InfoAlunosC";
import AdicionarAluno from "./Pages/AdicionarAluno";
import TurmasC from './Pages/TurmasC';
import MostrarTurmaC from './Pages/MostrarTurmaC';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/pag-principal-coordenacao" element={<RotaProtegida><PagPrincipal /></RotaProtegida>} />
                <Route path="/mostrar-aluno" element={<RotaProtegida><MostrarAluno /></RotaProtegida>} /> 
                <Route path="/mostrar-aluno/info-alunos-c/:id" element={<RotaProtegida><InfoAlunosC /></RotaProtegida>} />
                <Route path="/mostrar-aluno/adicionar-aluno" element={<RotaProtegida><AdicionarAluno /></RotaProtegida>} />
                <Route path="/turmas-coordenacao" element={<RotaProtegida><TurmasC /></RotaProtegida>} />
                <Route path="/turmas-coordenacao/:turma" element={<RotaProtegida><MostrarTurmaC /></RotaProtegida>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;