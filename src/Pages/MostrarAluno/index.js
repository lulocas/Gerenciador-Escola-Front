import NavBar from "../../Components/NavBar";
import { useEffect, useState } from 'react';
import './mostrarAluno.css';

function MostrarAluno(){
    const [alunos, setAlunos] = useState([]);

    useEffect(() =>{
        async function carregarApi(){
            const url = "http://localhost:8080/escola/alunos";

            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log("Dados recebidos da API:", json);
                setAlunos(json); 
            } catch (error) {
                console.error("Erro ao carregar API:", error);
            }
        }

        carregarApi();

    }, [])
    
    return(
        <>
             <NavBar></NavBar>
            <h3>Lista de Alunos:</h3>
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
                            <a>
                                <tr key={aluno.id}>
                                    <td>{aluno.cpf}</td>
                                    <td>{aluno.email}</td>
                                    <td>{aluno.telefone}</td>
                                    <td>{aluno.nome}</td>
                                </tr>
                            </a>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default MostrarAluno;