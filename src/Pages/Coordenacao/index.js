import NavBar from "../../Components/NavBar";

function PagPrincipal(){
    return(
        <>
            <NavBar></NavBar>
            <div className="botoesC">
                <button className="botoesDirecionamento">Alunos</button>
                <button className="botoesDirecionamento">Turma</button>
                <button className="botoesDirecionamento">Funcionários</button>
            </div>
        </>
    );
}

export default PagPrincipal;