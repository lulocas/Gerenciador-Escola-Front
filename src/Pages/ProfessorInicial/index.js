import NavBar from "../../Components/NavBar";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function ProfessorInicial(){
    const [alunos, setAlunos] = useState([]);
    const [alunosFiltrados, setAlunosFiltrados] = useState([]);
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [turma, setTurma] = useState("");

    useEffect(() =>{
        const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
        setTurma(usuarioSalvo.turma);

        async function carregarApi(){
            const url = "http://localhost:8080/escola/alunos";

            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log("Dados recebidos da API:", json);
                const alunosOrdenados = json.sort((a, b) => a.nome.localeCompare(b.nome));

                setAlunos(alunosOrdenados); 
                const filtrados = alunosOrdenados.filter((aluno) => aluno.turma === usuarioSalvo.turma);
                setAlunosFiltrados(filtrados);
            } catch (error) {
                console.error("Erro ao carregar API:", error);
            }
        }

        carregarApi();

    }, [])

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
            <h3>{turma}</h3>
            <div className="barraNav">
                <input placeholder="Digite o nome do aluno..." type="text" name="nome" value={nome} 
                            onChange={(e) => { setNome(e.target.value); filtrarPorNome(e.target.value); }}   required></input>
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
                                <tr key={aluno.id} onClick={() => navigate(`/pag-principal-professor/adicionar-notas/${aluno.id}`)} className="linha-click">
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

export default ProfessorInicial;