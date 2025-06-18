import NavBar from "../../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import './adicionarAluno.css';

function AdicionarAluno(){
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    const [ano, setAno] = useState("");
    const [turma, setTurma] = useState("");

    const salvar = async (e) => {
        e.preventDefault();
        const url = `http://localhost:8080/escola/alunos`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    senha,
                    nome,
                    telefone,
                    ano,
                    turma, 
                    cpf
                })
            });

            if (response.ok) {
                alert("Aluno adicionado com sucesso!");
                navigate("/mostrar-aluno");
            } else {
                alert("Erro ao criar aluno.");
            }
        } catch (error) {
            alert("Erro ao conectar com o servidor.");
        }
    };

    return(
        <>
            <NavBar></NavBar>
            <button className="botaoVoltar" onClick={() => navigate(`/mostrar-aluno`)}>Voltar</button>
            <h3>Adicionar novo aluno:</h3>
            <div className="formAddA">
                <div className="divsform">
                    <label>Nome:</label>
                    <input type="text" name="nome" placeholder="Fulano de Tal..." value={nome} onChange={(e) => setNome(e.target.value)}/>
                </div>

                <div className="divsform">
                    <label>CPF:</label>
                    <input type="text" name="cpf" value={cpf} placeholder="000.000.000-00" onChange={(e) => setCpf(e.target.value)} />
                </div>

                <div className="divsform">
                    <label>Email:</label>
                    <input type="email" name="email" value={email} placeholder="aluno@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="divsform">
                    <label>Senha:</label>
                    <input type="text" name="senha" value={senha} placeholder="Ex.: senha123..." onChange={(e) => setSenha(e.target.value)}/>
                </div>

                <div className="divsform">
                    <label>Telefone:</label>
                    <input className="telefoneInput" type="text" name="telefone" placeholder="00 00000-0000" value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
                </div>

                <div className="divsform">
                    <label>Turma:</label>
                    <input type="text" name="ano" value={turma}  min="1" max="5" placeholder="Ex.: 1º ano"  onChange={(e) => setTurma(e.target.value)}/>
                </div>

                <div className="divsform">
                    <label>Ano Escolar:</label>
                    <input className="inputMenor" type="number" name="ano" value={ano} placeholder="1"  min="1" max="5"  onChange={(e) => setAno(e.target.value)}/>
                </div>


                <button className="btnSalvarInfo" type="button" onClick={salvar}>Salvar</button>
            </div>
        </>
    );
}

export default AdicionarAluno;