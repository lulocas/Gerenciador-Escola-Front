import NavBar from "../../Components/NavBar";
import { useNavigate } from "react-router-dom";
import './turmasC.css';

function TurmasC(){
    const navigate = useNavigate();

    return(
        <>
            <NavBar></NavBar>
            <button className="botaoVoltar" onClick={() => navigate(`/pag-principal-coordenacao`)}>Voltar</button>
            <h3>Turmas:</h3>
            <div className="botoesCTurma">
                <button className="botoesDirecionamentoT" onClick={() => navigate("/turmas-coordenacao/1º ano")}> 1º Ano</button>
                <button className="botoesDirecionamentoT" onClick={() => navigate("/turmas-coordenacao/2º ano")}>2º Ano</button>
                <button className="botoesDirecionamentoT" onClick={() => navigate("/turmas-coordenacao/3º ano")}> 3º Ano</button>
                <button className="botoesDirecionamentoT" onClick={() => navigate("/turmas-coordenacao/4º ano")}> 4º Ano</button>
                <button className="botoesDirecionamentoT" onClick={() => navigate("/turmas-coordenacao/5º ano")}> 5º Ano</button>
            </div>
        </>
    );
}

export default TurmasC;