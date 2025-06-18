import NavBar from "../../Components/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./addNotas.css";

function AdicionarNotas(){
    const { id } = useParams(); 
    const [aluno, setAluno] = useState(null);
    const [notas, setNotas] = useState([]);
    const navigate = useNavigate();
    const materiasFixas = ["Matemática", "Português", "Geografia", "História", "Ciências", "Inglês"];


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

    const salvarEdicao = async () => {
            try {
                for (const nota of notas) {
                const payload = {
                    materia: nota.materia,
                    nota1: nota.nota1 ? Number(nota.nota1) : null,
                    nota2: nota.nota2 ? Number(nota.nota2) : null,
                    nota3: nota.nota3 ? Number(nota.nota3) : null,
                    aluno: { id } 
                };

                const url = nota.id
                    ? `http://localhost:8080/escola/notas/${nota.id}`
                    : `http://localhost:8080/escola/notas`;

                const method = nota.id ? "PUT" : "POST";

                const response = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Erro ao ${method === "POST" ? "criar" : "atualizar"} nota de ${nota.materia}: ${errorText}`);
                }
                }

                alert("Notas salvas com sucesso!");
                navigate("/pag-principal-professor");
            } catch (error) {
                console.error(error);
                alert("Erro ao salvar uma ou mais notas. Veja o console para detalhes.");
            }
        };

    const atualizarNota = (materia, campo, valor) => {
        setNotas((prevNotas) => {
            const index = prevNotas.findIndex((n) => n.materia === materia);
            if (index !== -1) {
            
            const atualizada = [...prevNotas];
            atualizada[index] = { ...atualizada[index], [campo]: valor };
            return atualizada;
            } else {
            
            return [...prevNotas, { materia, [campo]: valor }];
            }
        });
    };

    if (!aluno) return (<><NavBar></NavBar><p className="carregar">Carregando...</p></>);

    return(
        <>
            <NavBar></NavBar>
            <button className="botaoVoltar" onClick={() => navigate(`/pag-principal-professor`)}>Voltar</button>
            <div className="principInfo">
                <h3>{aluno.nome}</h3>
                <h2>Matrícula: {aluno.matricula}</h2>
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
                            {materiasFixas.map((materia, index) => {
                                const notaExistente = notas.find((n) => n.materia === materia) || {
                                    materia,
                                    nota1: "",
                                    nota2: "",
                                    nota3: ""
                                };

                                return (
                                    <tr key={index}>
                                        <td>{materia}</td>
                                        <td>
                                        <input className="notasInput"
                                            type="text"
                                            name="nota1"
                                            value={notaExistente.nota1}
                                            onChange={(e) => atualizarNota(materia, "nota1", e.target.value)}
                                        />
                                        </td>
                                        <td>
                                        <input className="notasInput"
                                            type="text"
                                            name="nota2"
                                            value={notaExistente.nota2}
                                            onChange={(e) => atualizarNota(materia, "nota2", e.target.value)}
                                        />
                                        </td>
                                        <td>
                                        <input className="notasInput"
                                            type="text"
                                            name="nota3"
                                            value={notaExistente.nota3}
                                            onChange={(e) => atualizarNota(materia, "nota3", e.target.value)}
                                        />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <button className="btnSalvarNota" type="button" onClick={salvarEdicao}>Salvar</button>
                </div>
            </div>
        </>
    );
}

export default AdicionarNotas;