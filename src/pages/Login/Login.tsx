//imports de funções
import { useState } from "react";
import { useNavigate } from "react-router";
import  axios from "axios";

//imports de estilos
// MODO ANTIGO import "./Login.module.css";
import styles from "./Login.module.css"; // MODO novo com CSS modules
import stylesIndex from "../../index.module.css"; // MODO novo com CSS modules
import swal from "sweetalert2";



function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//função para validar os dados na API
async function fazerLogin(event: React.SubmitEvent) {
  try {
    event.preventDefault();
    await axios.post("http://localhost:8888/auth/login", {
      email: email,
      senha: password,
    });
    swal.fire({
      title: "Login realizado com sucesso!",
      icon: "success",
      showConfirmButton: false,
      timer: 2000
    });
    navigate("/mesas");
  } catch (error) {
    swal.fire({
      title: error.response.data.error,
      icon: "error",
    });
  }

}

  return (
  <form className={styles.container} onSubmit={fazerLogin}>
    <span className={styles.logo}>🍽️</span>
    <h1 className={styles.nome}>Sabor e Arte</h1>
    <p className={styles.subtitulo}>Acesse o Painel do Restaurante</p>

    <div className={stylesIndex.containerInput}>
      <label>E-mail</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
    </div>

    <div className={stylesIndex.containerInput}>
      <label>Senha</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
    </div>

    <button>Entrar</button>
  </form>
  );
}

export default Login;