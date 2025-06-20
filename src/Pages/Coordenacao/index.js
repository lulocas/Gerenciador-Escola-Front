import NavBar from "../../Components/NavBar";
import './pagIni.css';
import turma from "../../assets/escola.png";
import alunoIcon from "../../assets/aluna.png";
import funcionario from "../../assets/oficina.png";
import { useNavigate } from "react-router-dom";

function PagPrincipal(){
    const navigate = useNavigate();
    return(
        <>
            <NavBar></NavBar>
            <div className="botoesC">
                <button className="botoesDirecionamento" onClick={() => navigate("/mostrar-aluno")}><img src={alunoIcon} className="iconBtn"/> Alunos</button>
                <button className="botoesDirecionamento" onClick={() => navigate("/turmas-coordenacao")}><img src={turma} className="iconBtn"/> Turmas</button>
                <button className="botoesDirecionamento" onClick={() => navigate("/funcionarios-coordenacao")}><img src={funcionario} className="iconBtn"/> Funcionários</button>
            </div>
        </>
    );
}

export default PagPrincipal;