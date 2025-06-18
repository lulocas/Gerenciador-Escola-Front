import NavBar from "../../Components/NavBar";
import { useEffect, useState } from 'react';
import './mostrarAluno.css';
import { useNavigate } from "react-router-dom";


function MostrarAluno(){
    const [alunos, setAlunos] = useState([]);
    const [alunosFiltrados, setAlunosFiltrados] = useState([]);
    const [botaoAtivo, setBotaoAtivo] = useState("Todos");
    const [nome, setNome] = useState("");
    const navigate = useNavigate();

    useEffect(() =>{
        async function carregarApi(){
            const url = "http://localhost:8080/escola/alunos";

            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log("Dados recebidos da API:", json);
                const alunosOrdenados = json.sort((a, b) => a.nome.localeCompare(b.nome));

                setAlunos(alunosOrdenados); 
                setAlunosFiltrados(alunosOrdenados);
            } catch (error) {
                console.error("Erro ao carregar API:", error);
            }
        }

        carregarApi();

    }, [])

    const filtrarPorAno = (turma) => {
        setBotaoAtivo(turma);
        if (turma === "Todos") {
            setAlunosFiltrados(alunos); 
        } else {
            const filtrados = alunos.filter((aluno) => aluno.turma === turma);
            setAlunosFiltrados(filtrados);
        }
    };

    const filtrarPorNome = (nomeAluno) => {
        if (!nomeAluno.trim()) {  
            setAlunosFiltrados(alunos); 
            return;
        }

        const filtrados = alunos.filter((aluno) => 
            aluno.nome.toLowerCase().includes(nomeAluno.toLowerCase()) 
        );

        setAlunosFiltrados(filtrados);
    }


    return(
        <>
             <NavBar></NavBar>
            <button className="botaoVoltar" onClick={() => navigate(`/pag-principal-coordenacao`)}>Voltar</button>
            <h3>Lista de Alunos:</h3>
            <div className="barraNav">
                <input placeholder="Digite o nome do aluno..." type="text" name="nome" value={nome} 
                            onChange={(e) => { setNome(e.target.value); filtrarPorNome(e.target.value); }}   required></input>
            </div>
            <div className="botoesOrdenar">
                <button className={`btnOrd ${botaoAtivo === "Todos" ? "ativo" : ""}`} onClick={() => filtrarPorAno("Todos")}>Todos</button>
                <button className={`btnOrd ${botaoAtivo === "1º ano" ? "ativo" : ""}`} onClick={() => filtrarPorAno("1º ano")}>1º ano</button>
                <button className={`btnOrd ${botaoAtivo === "2º ano" ? "ativo" : ""}`} onClick={() => filtrarPorAno("2º ano")}>2º ano</button>
                <button className={`btnOrd ${botaoAtivo === "3º ano" ? "ativo" : ""}`} onClick={() => filtrarPorAno("3º ano")}>3º ano</button>
                <button className={`btnOrd ${botaoAtivo === "4º ano" ? "ativo" : ""}`} onClick={() => filtrarPorAno("4º ano")}>4º ano</button>
                <button className={`btnOrd ${botaoAtivo === "5º ano" ? "ativo" : ""}`} onClick={() => filtrarPorAno("5º ano")}>5º ano</button>
                <button className="botaoCriarAluno" onClick={() => navigate(`/mostrar-aluno/adicionar-aluno`)}>Add</button>
            </div>
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
                        {alunosFiltrados.map((aluno) => (
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
        </>
    );
}

export default MostrarAluno;