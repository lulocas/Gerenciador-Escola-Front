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
import FuncionariosC from './Pages/FuncionariosC';
import AdicionarFuncionario from './Pages/AdicionarFuncionario';
import EditarProfessor from './Pages/EditarProfessor';
import AdicionarCoordenacao from './Pages/AdicionarCoordenacao';
import ProfessorInicial from './Pages/ProfessorInicial';
import AdicionarNotas from './Pages/AdicionarNotas';
import Aluno from './Pages/Aluno';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/pag-principal-coordenacao" element={<RotaProtegida><PagPrincipal /></RotaProtegida>} />
                <Route path="/pag-principal-aluno" element={<RotaProtegida><Aluno /></RotaProtegida>} />
                <Route path="/pag-principal-professor" element={<RotaProtegida><ProfessorInicial /></RotaProtegida>} />
                <Route path="/pag-principal-professor/adicionar-notas/:id" element={<RotaProtegida><AdicionarNotas /></RotaProtegida>} />
                <Route path="/mostrar-aluno" element={<RotaProtegida><MostrarAluno /></RotaProtegida>} /> 
                <Route path="/mostrar-aluno/info-alunos-c/:id" element={<RotaProtegida><InfoAlunosC /></RotaProtegida>} />
                <Route path="/mostrar-aluno/adicionar-aluno" element={<RotaProtegida><AdicionarAluno /></RotaProtegida>} />
                <Route path="/turmas-coordenacao" element={<RotaProtegida><TurmasC /></RotaProtegida>} />
                <Route path="/turmas-coordenacao/:turma" element={<RotaProtegida><MostrarTurmaC /></RotaProtegida>} />
                <Route path="/funcionarios-coordenacao" element={<RotaProtegida><FuncionariosC /></RotaProtegida>} />
                <Route path="/funcionarios-coordenacao/adcionar-funcionario" element={<RotaProtegida><AdicionarFuncionario /></RotaProtegida>} />
                <Route path="/funcionarios-coordenacao/editar-professor/:id" element={<RotaProtegida><EditarProfessor /></RotaProtegida>} />
                <Route path="/funcionarios-coordenacao/editar-coordenacao/:id" element={<RotaProtegida><AdicionarCoordenacao /></RotaProtegida>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;