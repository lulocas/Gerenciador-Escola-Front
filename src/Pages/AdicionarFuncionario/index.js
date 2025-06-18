import NavBar from "../../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import "./adicionarF.css";

function AdicionarFuncionario(){
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    const [formacao, setFormacao] = useState("");
    const [turma, setTurma] = useState("");

    const salvarProfessor = async (e) => {
        e.preventDefault();
        const url = `http://localhost:8080/escola/professores`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    senha,
                    nome,
                    telefone,
                    formacao,
                    turma, 
                    cpf
                })
            });

            if (response.ok) {
                alert("Professor adicionado com sucesso!");
                navigate("/funcionarios-coordenacao");
            } else {
                alert("Erro ao criar professor.");
            }
        } catch (error) {
            alert("Erro ao conectar com o servidor.");
        }
    };

    const salvarCoordenacao = async (e) => {
        e.preventDefault();
        const url = `http://localhost:8080/escola/coordenacao`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    senha,
                    nome,
                    telefone,
                    formacao, 
                    cpf
                })
            });

            if (response.ok) {
                alert("Funcionário adicionado com sucesso!");
                navigate("/funcionarios-coordenacao");
            } else {
                alert("Erro ao criar funcionário.");
            }
        } catch (error) {
            alert("Erro ao conectar com o servidor.");
        }
    };

    const [selecionado, setSelecionado] = useState("");
    
    const handleChange = (event) => {
        setSelecionado(event.target.name); 
    }; 

    const verificar = async (e) =>{
        e.preventDefault();
        
        if(selecionado === "optionP"){
            await salvarProfessor(e);
        }else if(selecionado === "optionC"){
            await salvarCoordenacao(e);
        }else{
            alert("Precidsa marcar quem vai adicionar");
        }
    }

    return(
        <>
            <NavBar></NavBar>
            <button className="botaoVoltar" onClick={() => navigate(`/funcionarios-coordenacao`)}>Voltar</button>
            <h3>Adicionar funcionário:</h3>
            <div className="checkBoxesF">
                <p className="adicionarQuem">Quer adicionar:</p>
                <label htmlFor="optionC"><input type="checkbox" name="optionC" onChange={handleChange} checked={selecionado === "optionC"} />Coordenação</label>
                <label htmlFor="optionP"> <input type="checkbox" name="optionP" onChange={handleChange} checked={selecionado === "optionP"} />Professor</label>        
            </div>
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
                    <label>Formação:</label>
                    <input  type="text" name="formacao" placeholder="Ex.: pedagogia" value={formacao} onChange={(e) => setFormacao(e.target.value)}/>
                </div>

                <div className="divsform">
                    <label>Turma:</label>
                    <input type="text" name="ano" value={turma}  min="1" max="5" placeholder="Ex.: 1º ano"  onChange={(e) => setTurma(e.target.value)}/>
                </div>

                <button className="btnSalvarInfo" type="button" onClick={verificar}>Salvar</button>
            </div>
        </>
    );
}

export default AdicionarFuncionario;