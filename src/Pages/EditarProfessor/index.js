import NavBar from "../../Components/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function EditarProfessor(){
    const { id } = useParams(); 
    const [professor, setProfessor] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscarProfessor() {
            const response = await fetch(`http://localhost:8080/escola/professores/${id}`);
            const json = await response.json();
            setProfessor(json); 
        }
        
        buscarProfessor();
    }, [id]);

    const handleChange = (e) => {
        setProfessor({
            ...professor,
            [e.target.name]: e.target.value
        });
    };

    const salvarEdicao = async () => {
        const response = await fetch(`http://localhost:8080/escola/professores/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(professor)
        });

        if (response.ok) {
            alert("Professor atualizado com sucesso!");
            navigate("/funcionarios-coordenacao"); 
        }
    };

    const deletar = async () => {
        const url = `http://localhost:8080/escola/professores/${id}`;

        try {
            const response = await fetch(url, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Professor deletado com sucesso!");
                navigate("/funcionarios-coordenacao");
            } else {
                alert("Erro ao deletar professor.");
            }
        } catch (error) {
            alert("Erro ao conectar com o servidor.");
        }
    };

    if (!professor) return (<><NavBar></NavBar><p className="carregar">Carregando...</p></>);

    return(
        <>
            <NavBar></NavBar>
            <div className="principInfo">
                <button className="botaoVoltar" onClick={() => navigate(`/funcionarios-coordenacao`)}>Voltar</button>
                <h3>{professor.nome}</h3>
                <div className="infosAlunoC">
                    <div className="formAlunoInfo">
                        
                        <div className="divsform">
                            <label>Nome:</label>
                            <input type="text" name="nome" value={professor.nome} onChange={handleChange} />
                        </div>

                        <div className="divsform">
                            <label>CPF:</label>
                            <input type="text" name="cpf" value={professor.cpf} onChange={handleChange} />
                        </div>

                        <div className="divsform">
                            <label>Email:</label>
                            <input type="email" name="email" value={professor.email} onChange={handleChange} />
                        </div>

                        <div className="divsform">
                            <label>Senha:</label>
                            <input type="text" name="senha" value={professor.senha} onChange={handleChange} />
                        </div>

                        <div className="divsform">
                            <label>Telefone:</label>
                            <input className="telefoneInput" type="text" name="telefone" value={professor.telefone} onChange={handleChange} />
                        </div>

                        <div className="divsform">
                            <label>Formação:</label>
                            <input type="text" name="formacao" value={professor.formacao} onChange={handleChange}/>
                        </div>

                        <div className="divsform">
                            <label>Turma:</label>
                            <input className="inputMenor" type="text" name="turma" value={professor.turma} onChange={handleChange} />
                        </div>

                        <button className="btnSalvarInfo" type="button" onClick={salvarEdicao}>Salvar</button>
                        <button className="btnDeletarA" type="button" onClick={deletar}>Deletar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditarProfessor;