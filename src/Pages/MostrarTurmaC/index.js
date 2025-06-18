import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import { useNavigate } from "react-router-dom";
import './mostrarTurma.css';

function MostrarTurmaC(){
    const { turma } = useParams(); 
    const [alunos, setAlunos] = useState(null);
    const navigate = useNavigate();
    const [professor, setProfessor] = useState(null);

    useEffect(() => {
        async function buscarDados() {
            const turmaEncoded = encodeURIComponent(turma);

            try {
                const [responseAlunos, responseProfessores] = await Promise.all([
                    fetch(`http://localhost:8080/escola/alunos`),
                    fetch(`http://localhost:8080/escola/professores`)
                ]);

                const jsonAlunos = await responseAlunos.json();
                const jsonProfessores = await responseProfessores.json();

                // Filtrar os alunos pela turma
                const alunosFiltrados = jsonAlunos.filter((aluno) => aluno.turma === turma);
                setAlunos(alunosFiltrados);

                // Filtrar os professores pela turma
                const professorFiltrado = jsonProfessores.filter((professor) => professor.turma === turma);
                setProfessor(professorFiltrado.length > 0 ? professorFiltrado[0] : null);

            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        }

        buscarDados();
    }, [turma]);

    if (!alunos) return <p>Nenhum aluno encontrado para essa turma.</p>;

    return(
        <>
            <NavBar></NavBar>
            <button className="botaoVoltar" onClick={() => navigate(`/turmas-coordenacao`)}>Voltar</button>
            <h3>Turma {turma}</h3>
            <h2 className="h2Turma">Professor:</h2>
            <div className="divTabela">
                    <table className="tabelaAlunos">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Email</th>
                                <th>Telefone</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={professor.id} onClick={() => navigate(`/mostrar-aluno/info-alunos-c/${professor.id}`)} className="linha-click">
                                <td>{professor.nome}</td>
                                <td>{professor.cpf}</td>
                                <td>{professor.email}</td>
                                <td>{professor.telefone}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <div>
                <h2 className="h2Turma">Alunos:</h2>
                <div className="divTabela">
                    <table className="tabelaAlunos">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Email</th>
                                <th>Telefone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alunos.map((aluno) => (
                                    <tr key={aluno.id} onClick={() => navigate(`/mostrar-aluno/info-alunos-c/${aluno.id}`)} className="linha-click">
                                        <td>{aluno.nome}</td>
                                        <td>{aluno.cpf}</td>
                                        <td>{aluno.email}</td>
                                        <td>{aluno.telefone}</td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        
        </>
    );
}

export default MostrarTurmaC;