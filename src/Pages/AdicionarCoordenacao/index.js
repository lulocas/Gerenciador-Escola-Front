import NavBar from "../../Components/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AdicionarCoordenacao(){
    const { id } = useParams(); 
    const [coordenacao, setCoordenacao] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscarProfessor() {
            const response = await fetch(`http://localhost:8080/escola/coordenacao/${id}`);
            const json = await response.json();
            setCoordenacao(json); 
        }
        
        buscarProfessor();
    }, [id]);

    const handleChange = (e) => {
        setCoordenacao({
            ...coordenacao,
            [e.target.name]: e.target.value
        });
    };

    const salvarEdicao = async () => {
        const response = await fetch(`http://localhost:8080/escola/coordenacao/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(coordenacao)
        });

        if (response.ok) {
            alert("coordenacaor atualizado com sucesso!");
            navigate("/funcionarios-coordenacao"); 
        }
    };

    const deletar = async () => {
        const url = `http://localhost:8080/escola/coordenacao/${id}`;

        try {
            const response = await fetch(url, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("coordenacao deletado com sucesso!");
                navigate("/funcionarios-coordenacao");
            } else {
                alert("Erro ao deletar coordenacao.");
            }
        } catch (error) {
            alert("Erro ao conectar com o servidor.");
        }
    };

    if (!coordenacao) return (<><NavBar></NavBar><p className="carregar">Carregando...</p></>);

    return(
        <>
            <NavBar></NavBar>
            <div className="principInfo">
                <button className="botaoVoltar" onClick={() => navigate(`/funcionarios-coordenacao`)}>Voltar</button>
                <h3>{coordenacao.nome}</h3>
                <div className="infosAlunoC">
                    <div className="formAlunoInfo">
                        
                        <div className="divsform">
                            <label>Nome:</label>
                            <input type="text" name="nome" value={coordenacao.nome} onChange={handleChange} />
                        </div>

                        <div className="divsform">
                            <label>CPF:</label>
                            <input type="text" name="cpf" value={coordenacao.cpf} onChange={handleChange} />
                        </div>

                        <div className="divsform">
                            <label>Email:</label>
                            <input type="email" name="email" value={coordenacao.email} onChange={handleChange} />
                        </div>

                        <div className="divsform">
                            <label>Senha:</label>
                            <input type="text" name="senha" value={coordenacao.senha} onChange={handleChange} />
                        </div>

                        <div className="divsform">
                            <label>Telefone:</label>
                            <input className="telefoneInput" type="text" name="telefone" value={coordenacao.telefone} onChange={handleChange} />
                        </div>

                        <div className="divsform">
                            <label>Formação:</label>
                            <input type="text" name="formacao" value={coordenacao.formacao} onChange={handleChange}/>
                        </div>

                        <button className="btnSalvarInfo" type="button" onClick={salvarEdicao}>Salvar</button>
                        <button className="btnDeletarA" type="button" onClick={deletar}>Deletar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdicionarCoordenacao;