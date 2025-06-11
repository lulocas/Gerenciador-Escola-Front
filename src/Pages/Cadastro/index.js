import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mail from "../../assets/mail.png";
import lock from "../../assets/lock.png";

function Cadastro(){
    const [coordenacao, setCoordenacao] = useState([]);
        const [professores, setProfessores] = useState([]);
        const [alunos, setAlunos] = useState([]);
        const [email, setEmail] = useState("");
        const [cpf, setCpf] = useState("");
        const [senha, setSenha] = useState("");
        const [id, setId] = useState("");
        const [showPassword, setShowPassword] = useState(false);
        const navigate = useNavigate();
        const urlC = "http://localhost:8080/escola/coordenacao";
        const urlP = "http://localhost:8080/escola/professores";
        const urlA = "http://localhost:8080/escola/alunos";
        
            useEffect(() => {
                async function carregarApi() {
        
                    try {
                        const responseP = await fetch(urlP);
                        const jsonP = await responseP.json();
                        console.log("Dados recebidos da API:", jsonP);
                        setProfessores(jsonP); 
    
                        const responseC = await fetch(urlC);
                        const jsonC = await responseC.json();
                        console.log("Dados recebidos da API:", jsonC);
                        setCoordenacao(jsonC);
    
                        const responseA = await fetch(urlA);
                        const jsonA = await responseA.json();
                        console.log("Dados recebidos da API:", jsonA);
                        setAlunos(jsonA);
                    } catch (error) {
                        console.error("Erro ao carregar API:", error);
                    }
                }
        
                carregarApi();
            }, [])
    
            const [selecionado, setSelecionado] = useState("");
    
            const handleChange = (event) => {
                setSelecionado(event.target.name); 
            };   

        const cadastrar = (url, usuarioEncontrado) => async (e) => {
            e.preventDefault();
            url = `${url}/${usuarioEncontrado.id}/credenciais`;

            try {
                const response = await fetch(url, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email,
                        senha 
                    })
                });

                if (response.ok) {
                    alert("Cadastro realizado com sucesso! Agora faça seu login.");
                    navigate("/");
                } else {
                    alert("Erro ao cadastrar usuário.");
                }
            } catch (error) {
                alert("Erro ao conectar com o servidor.");
            }
        };

    
            const verificar= async (e) =>{
                console.log(email);
                let usuarioEncontrado = null;
                e.preventDefault();
    
                if(selecionado === "optionP"){
                    for (let i = 0; i < professores.length; i++) {
                        if (professores[i] && professores[i].cpf) {
                            if (professores[i].cpf === cpf) {
                                usuarioEncontrado = professores[i];
                                console.log("Usuario encontrado:", usuarioEncontrado);
                                await cadastrar(urlP, usuarioEncontrado)(e);
                                break;
                            }
                        } else {
                            console.error("Usuário sem estrutura esperada:", professores[i]);
                        }
                    }
                }else if(selecionado ==="optionC"){
                    for (let i = 0; i < coordenacao.length; i++) {
                        if (coordenacao[i] && coordenacao[i].cpf) {
                            if (coordenacao[i].cpf === cpf) {
                                usuarioEncontrado = coordenacao[i];
                                console.log("Usuario encontrado:", usuarioEncontrado);
                                await cadastrar(urlC, usuarioEncontrado)(e);
                                break;
                            }
                        } else {
                            console.error("Usuário sem estrutura esperada:", coordenacao[i]);
                        }
                    }
                }else if(selecionado === "optionA"){
                    for (let i = 0; i < alunos.length; i++) {
                        if (alunos[i] && alunos[i].cpf) {
                            if (alunos[i].cpf === cpf) {
                                usuarioEncontrado = alunos[i];
                                console.log("Usuario encontrado:", usuarioEncontrado);
                                await cadastrar(urlA, usuarioEncontrado)(e);
                                break;
                            }
                        } else {
                            console.error("Usuário sem estrutura esperada:", alunos[i]);
                        }
                    }
                }
            }


    return (
        <div className="main">
            <div className="caixaLog">
                <form className="inputsLog" onSubmit={verificar}>
                    <p className="voceE">Você é:</p>
                    <div className="checkBoxes">
                        <label htmlFor="optionC"><input type="checkbox" name="optionC" onChange={handleChange} checked={selecionado === "optionC"} />Coordenação</label>
                        

                        <label htmlFor="optionP"> <input type="checkbox" name="optionP" onChange={handleChange} checked={selecionado === "optionP"} />Professor</label>
                        

                        <label htmlFor="optionA"><input type="checkbox" name="optionA" onChange={handleChange} checked={selecionado === "optionA"} />Aluno</label>
                          
                    </div>
                    <label className="labelLogin" htmlFor="cpf">CPF</label>
                    <input className="inputsLogin" type="text" name="cpf" placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(e.target.value)}  required></input>
                    <label className='labelLogin' htmlFor="email">Email</label>
                    <div className='iconeDiv'>
                        <input className="inputsLogin" type="email" name="email" placeholder="seunoma@email.com" value={email} 
                            onChange={(e) => setEmail(e.target.value)}  required></input>
                        <img src={mail} className="inputIcon"/>
                    </div>
                    <label className='labelLogin' htmlFor="senha">Senha</label>
                    <div className='iconeDiv'>
                        <input className="inputsLogin" type={showPassword ? "text" : "password"} name="senha" placeholder='Password' value={senha} 
                            onChange={(e) => setSenha(e.target.value)} required>
                        </input>
                        <img src={lock} className="inputIcon"/>
                    </div>
                    <div className='mostrarSenha'>
                        <input type="checkbox" id="mostrarSenha" checked={showPassword} 
                            onChange={(e) => setShowPassword(e.target.checked)} />
                        <label htmlFor="mostrarSenha">Mostrar a senha.</label>
                    </div>
                    <button className='botao' type="submit">Cadastrar</button>
                </form>

                    

                    <button className='botaoCadastro' onClick={() => navigate("/")}>Login</button>

            </div>
        </div>
    );
}

export default Cadastro;