import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    setErro("");

    if (!email || !senha) {
      setErro("Preencha o e-mail e a senha.");
      return;
    }

    try {
      setCarregando(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        senha
      );

      // Login realizado com sucesso
      navigate("/");
    } catch (error) {
      console.error("Erro no login:", error);

      switch (error.code) {
        case "auth/invalid-credential":
          setErro("E-mail ou senha incorretos.");
          break;

        case "auth/user-not-found":
          setErro("Não existe uma conta com este e-mail.");
          break;

        case "auth/wrong-password":
          setErro("Senha incorreta.");
          break;

        case "auth/invalid-email":
          setErro("Digite um e-mail válido.");
          break;

        case "auth/too-many-requests":
          setErro(
            "Muitas tentativas. Aguarde alguns minutos e tente novamente."
          );
          break;

        default:
          setErro(
            "Não foi possível entrar na conta. Tente novamente."
          );
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="login-page">

      <div className="login-container">

        <div className="login-logo">
          🍴
        </div>

        <h1>Receitaí</h1>

        <div className="login-card">

          <h2>Bem-vindo de volta!</h2>

          <p className="login-subtitle">
            Entre na sua conta para continuar descobrindo
            receitas deliciosas.
          </p>

          <form onSubmit={handleLogin}>

            <div className="form-group">

              <label htmlFor="email">
                E-mail
              </label>

              <input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />

            </div>

            <div className="form-group">

              <label htmlFor="senha">
                Senha
              </label>

              <input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="current-password"
              />

            </div>

            {erro && (
              <div className="login-error">
                {erro}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={carregando}
            >
              {carregando
                ? "Entrando..."
                : "Entrar"}
            </button>

          </form>

          <div className="login-register">

            <p>
              Ainda não possui uma conta?
            </p>

            <Link to="/cadastro">
              Criar minha conta
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;