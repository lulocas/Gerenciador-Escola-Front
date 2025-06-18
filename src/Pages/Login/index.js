import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mail from "../../assets/mail.png";
import lock from "../../assets/lock.png";
import './login.css';

function Login(){
    const [coordenacao, setCoordenacao] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [path, setPath] = useState("");
    
        useEffect(() => {
            async function carregarApi() {
                const urlC = "http://localhost:8080/escola/coordenacao";
                const urlP = "http://localhost:8080/escola/professores";
                const urlA = "http://localhost:8080/escola/alunos";
    
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

        const verificar= (e) =>{
            console.log(email);
            console.log(password);
            let usuarioEncontrado = null;
            e.preventDefault();

            if(selecionado === "optionP"){
                for (let i = 0; i < professores.length; i++) {
                    if (professores[i] && professores[i].email && professores[i].senha) {
                        if (professores[i].email === email && professores[i].senha === password) {
                            usuarioEncontrado = professores[i];
                            console.log("Usuario encontrado:", usuarioEncontrado);
                            setPath("/pag-principal-professor")
                            break;
                        }
                    } else {
                        console.error("Usuário sem estrutura esperada:", professores[i]);
                    }
                }
            }else if(selecionado === "optionC"){
                for (let i = 0; i < coordenacao.length; i++) {
                    if (coordenacao[i] && coordenacao[i].email && coordenacao[i].senha) {
                        if (coordenacao[i].email === email && coordenacao[i].senha === password) {
                            usuarioEncontrado = coordenacao[i];
                            console.log("Usuario encontrado:", usuarioEncontrado);
                            setPath("/pag-principal-coordenacao");
                            break;
                        }
                    } else {
                        console.error("Usuário sem estrutura esperada:", coordenacao[i]);
                    }
                }
            }else if(selecionado === "optionA"){
                for (let i = 0; i < alunos.length; i++) {
                    if (alunos[i] && alunos[i].email && alunos[i].senha) {
                        if (alunos[i].email === email && alunos[i].senha === password) {
                            usuarioEncontrado = alunos[i];
                            console.log("Usuario encontrado:", usuarioEncontrado);
                            break;
                        }
                    } else {
                        console.error("Usuário sem estrutura esperada:", alunos[i]);
                    }
                }
            }

            if (usuarioEncontrado) {
                alert("Login feito com sucesso!");
                localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
                navigate(path);
            } else {
                alert("Usuário não encontrado");
            }
        }
        

    return(
        <div className="main">
            <div className="caixaLog">
                <form className="inputsLog" onSubmit={verificar}>
                    <p className="voceE">Você é:</p>
                    <div className="checkBoxes">
                        <label htmlFor="optionC"><input type="checkbox" name="optionC" onChange={handleChange} checked={selecionado === "optionC"} />Coordenação</label>
                        

                        <label htmlFor="optionP"> <input type="checkbox" name="optionP" onChange={handleChange} checked={selecionado === "optionP"} />Professor</label>
                        

                        <label htmlFor="optionA"><input type="checkbox" name="optionA" onChange={handleChange} checked={selecionado === "optionA"} />Aluno</label>
                          
                    </div>
                    <label className='labelLogin' htmlFor="email">Email</label>
                    <div className='iconeDiv'>
                        <input className="inputsLogin" type="email" name="email" placeholder="seunoma@email.com" value={email} 
                            onChange={(e) => setEmail(e.target.value)}  required></input>
                        <img src={mail} className="inputIcon"/>
                    </div>
                    <label className='labelLogin' htmlFor="senha">Password</label>
                    <div className='iconeDiv'>
                        <input className="inputsLogin" type={showPassword ? "text" : "password"} name="senha" placeholder='Password' value={password} 
                            onChange={(e) => setPassword(e.target.value)} required>
                        </input>
                        <img src={lock} className="inputIcon"/>
                    </div>
                    <div className='mostrarSenha'>
                        <input type="checkbox" id="mostrarSenha" checked={showPassword} 
                            onChange={(e) => setShowPassword(e.target.checked)} />
                        <label htmlFor="mostrarSenha">Mostrar a senha.</label>
                    </div>
                    <p className='pPergunta'>Problemas para acessar sua conta?</p>
                    <button className='botao' type="submit">Acessar</button>

                </form>
                    <div className='linhaLogin'>
                        <div className='traco'></div>
                        <span>Ou</span>
                        <div className='traco'></div>
                    </div>

                    <button className='botaoCadastro' onClick={() => navigate("/cadastro")}>Cadastrar</button>

            </div>
        </div>
    );
}

export default Login;