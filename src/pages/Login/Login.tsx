// MODO ANTIGO import "./Login.module.css";
import styles from "./Login.module.css"; // MODO novo com CSS modules
import stylesIndex from "../../index.module.css"; // MODO novo com CSS modules
import { useState } from "react";
import  axios from "axios";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

function fazerLogin(event) {
    event.preventDefault();

    axios.post("http://localhost:8888/auth/login", {
      email: email,
      senha: password,
    });
  }

  return (
  <form className={styles.container} onSubmit={fazerLogin}>
    <span className={styles.logo}>🍽️</span>
    <h1 className={styles.nome}>Sabor e Arte</h1>
    <p className={styles.subtitulo}>Acesse o Painel do Restaurante</p>

    <div className={stylesIndex.containerInput}>
      <label>E-mail</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
    </div>

    <div className={stylesIndex.containerInput}>
      <label>Senha</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
    </div>

    <button>Entrar</button>
  </form>
  );
}

export default Login;