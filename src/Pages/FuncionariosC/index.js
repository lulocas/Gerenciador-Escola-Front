import NavBar from "../../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function FuncionariosC(){ 
    const [coordenacao, setCoordenacao] = useState(null);
    const navigate = useNavigate();
    const [professores, setProfessores] = useState(null);
    const [nome, setNome] = useState("");
    const [professoresFiltrados, setProfessoresFiltrados] = useState([]);
    const [coordenacaoFiltrada, setCoordenacaoFiltrada] = useState([]);

    useEffect(() => {
        async function buscarDados() {

            try {
                const [responseCoordenacao, responseProfessores] = await Promise.all([
                    fetch(`http://localhost:8080/escola/coordenacao`),
                    fetch(`http://localhost:8080/escola/professores`)
                ]);

                const jsonCoordenacao = await responseCoordenacao.json();
                const jsonProfessores = await responseProfessores.json();

                setCoordenacao(jsonCoordenacao);
                setProfessores(jsonProfessores);
                setProfessoresFiltrados(jsonProfessores);
                setCoordenacaoFiltrada(jsonCoordenacao);

            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        }

        buscarDados();
    }, []);

    const filtrarPorNome = (nome) => {
        if (!nome.trim()) {
            setProfessoresFiltrados(professores);
            setCoordenacaoFiltrada(coordenacao);
            return;
        }

        const filtro = nome.toLowerCase();

        const filtradosProfessores = professores.filter((p) =>
            p.nome.toLowerCase().includes(filtro)
        );
        const filtradosCoordenacao = coordenacao.filter((c) =>
            c.nome.toLowerCase().includes(filtro)
        );

        setProfessoresFiltrados(filtradosProfessores);
        setCoordenacaoFiltrada(filtradosCoordenacao);
    };

    if (!professores) return (<><NavBar></NavBar><p className="carregar">Carregando...</p></>);

    return(
        <>
            <NavBar></NavBar>
            <button className="botaoVoltar" onClick={() => navigate(`/pag-principal-coordenacao`)}>Voltar</button>
            <h3>Funcionários</h3>
            <div className="barraNav">
                <input placeholder="Digite o nome do funcionário..." type="text" name="nome" value={nome} 
                            onChange={(e) => { setNome(e.target.value); filtrarPorNome(e.target.value); }}   required></input>
            </div>
            <button className="botaoCriar" onClick={() => navigate(`/funcionarios-coordenacao/adcionar-funcionario`)}>Add</button>
            <h2 className="h2Turma">Professores:</h2>
            <div className="divTabela">
                    <table className="tabelaAlunos">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Turma</th>
                            </tr>
                        </thead>
                        <tbody>
                            {professoresFiltrados.length > 0 ? (
                                professoresFiltrados.map((professor) => (
                                    <tr key={professor.id} onClick={() => navigate(`/funcionarios-coordenacao/editar-professor/${professor.id}`)} className="linha-click">
                                        <td>{professor.nome}</td>
                                        <td>{professor.cpf}</td>
                                        <td>{professor.email}</td>
                                        <td>{professor.telefone}</td>
                                        <td>{professor.turma}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">Nenhum professor encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            <div>
                <h2 className="h2Turma">Coordenação:</h2>
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
                            {coordenacaoFiltrada.length > 0 ? (
                                coordenacaoFiltrada.map((coordenador) => (
                                    <tr key={coordenador.id} onClick={() => navigate(`/funcionarios-coordenacao/editar-coordenacao/${coordenador.id}`)} className="linha-click">
                                        <td>{coordenador.nome}</td>
                                        <td>{coordenador.cpf}</td>
                                        <td>{coordenador.email}</td>
                                        <td>{coordenador.telefone}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">Nenhum coordenador encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default FuncionariosC;