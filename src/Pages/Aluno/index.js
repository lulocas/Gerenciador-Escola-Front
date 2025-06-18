import NavBar from "../../Components/NavBar";
import { useEffect, useState } from "react";

function Aluno(){
    const [matricula, setMatricula] = useState("");
    const [ id, setId ] = useState(null);
    const [aluno, setAluno] = useState(null);
    const [notas, setNotas] = useState([]);
    const materiasFixas = ["Matemática", "Português", "Geografia", "História", "Ciências", "Inglês"];

    useEffect(() => {
        const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
        setId(usuarioSalvo.id);
        setMatricula(usuarioSalvo.matricula);

        async function buscarAluno() {
            const response = await fetch(`http://localhost:8080/escola/alunos`);
            const responseNotas = await fetch(`http://localhost:8080/escola/notas`);
            const jsonNotas = await responseNotas.json();
            const json = await response.json();
            setAluno(json); 

            const filtrados = jsonNotas.filter((nota) => nota.alunoId === usuarioSalvo.id);
                setNotas(filtrados);
        }
        
        buscarAluno();
    }, );

    const obterNotasPorMateria = (materia) => {
        const registro = notas.find((n) => n.materia === materia);
        return {
            nota1: registro?.nota1 || "",
            nota2: registro?.nota2 || "",
            nota3: registro?.nota3 || ""
        };
    };

    return(
        <>
            <NavBar></NavBar>
            <h3 className="matriculaAluno">Matrícula: {matricula}</h3>
            <div className="divTabela">
                <table className="tabelaAlunos">
                    <thead>
                        <tr>
                            <th>Matéria</th>
                            <th>Nota 1</th>
                            <th>Nota 2</th>
                            <th>Nota 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materiasFixas.map((materia, index) => {
                            const { nota1, nota2, nota3 } = obterNotasPorMateria(materia);
                            return (
                            <tr key={index}>
                                <td>{materia}</td>
                                <td>{nota1}</td>
                                <td>{nota2}</td>
                                <td>{nota3}</td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Aluno;