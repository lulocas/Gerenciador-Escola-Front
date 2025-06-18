import NavBar from "../../Components/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './infoAlunosC.css';

function InfoAlunosC(){
    const { id } = useParams(); 
    const [aluno, setAluno] = useState(null);
    const [notas, setNotas] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function buscarAluno() {
            const response = await fetch(`http://localhost:8080/escola/alunos/${id}`);
            const responseNotas = await fetch(`http://localhost:8080/escola/notas/${id}`);
            const jsonNotas = await responseNotas.json();
            const json = await response.json();
            setNotas(Array.isArray(jsonNotas) ? jsonNotas : []);
            setAluno(json); 
        }
        
        buscarAluno();
    }, [id]);

    const handleChange = (e) => {
        setAluno({
            ...aluno,
            [e.target.name]: e.target.value
        });
    };

    const salvarEdicao = async () => {
        const response = await fetch(`http://localhost:8080/escola/alunos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aluno)
        });

        if (response.ok) {
            alert("Aluno atualizado com sucesso!");
            navigate("/mostrar-aluno"); 
        }
    };

    const deletarAluno = async () => {
    const url = `http://localhost:8080/escola/alunos/${id}`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
        });

        if (response.ok) {
            alert("Aluno deletado com sucesso!");
            navigate("/mostrar-aluno");
        } else {
            alert("Erro ao deletar aluno.");
        }
    } catch (error) {
        alert("Erro ao conectar com o servidor.");
    }
};

    if (!aluno) return (<><NavBar></NavBar><p className="carregar">Carregando...</p></>);

    return(
        <>
            <NavBar></NavBar>
            <div className="principInfo">
                <button className="botaoVoltar" onClick={() => navigate(`/mostrar-aluno`)}>Voltar</button>
                <h3>{aluno.nome}</h3>
                <h2>Matrícula: {aluno.matricula}</h2>
                <div className="infosAlunoC">
                    <div className="formAlunoInfo">
                    
                        <div className="divsform">
                            <label>Nome:</label>
                            <input type="text" name="nome" value={aluno.nome} onChange={handleChange} />
                        </div>

                        <div className="divsform">
                            <label>CPF:</label>
                            <input type="text" name="cpf" value={aluno.cpf} onChange={handleChange} />
                        </div>

                        <div className="divsform">
                            <label>Email:</label>
                            <input type="email" name="email" value={aluno.email} onChange={handleChange} />
                        </div>

                        <div className="divsform">
                            <label>Senha:</label>
                            <input type="text" name="senha" value={aluno.senha} onChange={handleChange} />
                        </div>

                        <div className="divsform">
                            <label>Telefone:</label>
                            <input className="telefoneInput" type="text" name="telefone" value={aluno.telefone} onChange={handleChange} />
                        </div>

                        <div className="divsform">
                            <label>Ano Escolar:</label>
                            <input className="inputMenor" type="number" name="ano" value={aluno.ano} onChange={handleChange} min="1" max="5" />
                        </div>

                        <div className="divsform">
                            <label>Ano Escolar:</label>
                            <input className="inputMenor" type="number" name="turma" value={aluno.turma} onChange={handleChange} min="1" max="5" />
                        </div>

                        <div className="divsform">
                            <label>Número de faltas:</label>
                            <input className="inputMenor" type="number" name="faltas" value={aluno.numFaltas} onChange={handleChange} />
                        </div>

                        <button className="btnSalvarInfo" type="button" onClick={salvarEdicao}>Salvar</button>
                        <button className="btnDeletarA" type="button" onClick={deletarAluno}>Deletar</button>
                    </div>
                </div>
                <div className="tabelaNotasC">
                    <table className="tabelaAluno">
                        <thead>
                            <tr>
                                <th>Materia</th>
                                <th>Nota 1</th>
                                <th>Nota 2</th>
                                <th>Nota 3</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notas.map((nota) => (
                                    <tr key={nota.id}>
                                        <td>{nota.materia}</td>
                                        <td>{nota.nota1}</td>
                                        <td>{nota.nota2}</td>
                                        <td>{nota.nota3}</td>
                                    </tr>
                            ))}
                        </tbody>
                </table>
                </div>
            </div>
        </>
    );
}

export default InfoAlunosC;