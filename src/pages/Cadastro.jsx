import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { Link, useNavigate } from "react-router-dom";

import { auth } from "../firebase";

import "./Cadastro.css";


function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);


  async function handleCadastro(e) {
    e.preventDefault();

    setErro("");


    // =========================
    // VALIDAÇÕES
    // =========================

    if (!nome.trim()) {
      setErro("Digite seu nome.");
      return;
    }

    if (!email.trim()) {
      setErro("Digite seu e-mail.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }


    try {
      setCarregando(true);


      // =========================
      // CRIAR USUÁRIO NO FIREBASE
      // =========================

      const resultado = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        senha
      );


      // =========================
      // SALVAR NOME DO USUÁRIO
      // =========================

      await updateProfile(resultado.user, {
        displayName: nome.trim(),
      });


      console.log("Usuário criado com sucesso!");
      console.log("UID:", resultado.user.uid);
      console.log("Nome:", resultado.user.displayName);
      console.log("E-mail:", resultado.user.email);


      // =========================
      // IR PARA HOME
      // =========================

      navigate("/");


    } catch (error) {

      console.error("================================");
      console.error("ERRO AO CRIAR CONTA");
      console.error("Código:", error.code);
      console.error("Mensagem:", error.message);
      console.error("================================");


      // =========================
      // TRATAMENTO DOS ERROS
      // =========================

      switch (error.code) {

        case "auth/email-already-in-use":
          setErro(
            "Este e-mail já está cadastrado."
          );
          break;


        case "auth/invalid-email":
          setErro(
            "Digite um e-mail válido."
          );
          break;


        case "auth/weak-password":
          setErro(
            "A senha precisa ter pelo menos 6 caracteres."
          );
          break;


        case "auth/operation-not-allowed":
          setErro(
            "O cadastro por e-mail e senha está desativado no Firebase. Ative esse método em Authentication > Sign-in method."
          );
          break;


        case "auth/network-request-failed":
          setErro(
            "Não foi possível conectar ao Firebase. Verifique sua internet."
          );
          break;


        case "auth/too-many-requests":
          setErro(
            "Muitas tentativas. Aguarde um pouco e tente novamente."
          );
          break;


        default:
          setErro(
            `Erro do Firebase: ${error.code || "desconhecido"}`
          );
          break;
      }


    } finally {

      setCarregando(false);

    }
  }


  return (
    <div className="cadastro-page">

      <div className="cadastro-container">


        {/* =========================
            LOGO
        ========================= */}

        <div className="cadastro-logo">

          <span>🍴</span>

          <h1>Receitaí</h1>

        </div>


        {/* =========================
            CARD
        ========================= */}

        <div className="cadastro-card">


          <div className="cadastro-header">

            <h2>
              Crie sua conta!
            </h2>

            <p>
              Cadastre-se para descobrir
              receitas deliciosas.
            </p>

          </div>


          <form onSubmit={handleCadastro}>


            {/* =========================
                NOME
            ========================= */}

            <div className="form-group">

              <label htmlFor="nome">
                Nome
              </label>

              <input
                id="nome"
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) =>
                  setNome(e.target.value)
                }
                disabled={carregando}
                autoComplete="name"
              />

            </div>


            {/* =========================
                E-MAIL
            ========================= */}

            <div className="form-group">

              <label htmlFor="email">
                E-mail
              </label>

              <input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                disabled={carregando}
                autoComplete="email"
              />

            </div>


            {/* =========================
                SENHA
            ========================= */}

            <div className="form-group">

              <label htmlFor="senha">
                Senha
              </label>

              <input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) =>
                  setSenha(e.target.value)
                }
                disabled={carregando}
                autoComplete="new-password"
              />

            </div>


            {/* =========================
                CONFIRMAR SENHA
            ========================= */}

            <div className="form-group">

              <label htmlFor="confirmarSenha">
                Confirmar senha
              </label>

              <input
                id="confirmarSenha"
                type="password"
                placeholder="Digite a senha novamente"
                value={confirmarSenha}
                onChange={(e) =>
                  setConfirmarSenha(e.target.value)
                }
                disabled={carregando}
                autoComplete="new-password"
              />

            </div>


            {/* =========================
                ERRO
            ========================= */}

            {erro && (
              <div className="cadastro-error">
                {erro}
              </div>
            )}


            {/* =========================
                BOTÃO
            ========================= */}

            <button
              type="submit"
              className="cadastro-button"
              disabled={carregando}
            >

              {carregando
                ? "Criando conta..."
                : "Criar minha conta"}

            </button>


          </form>


          {/* =========================
              LINK PARA LOGIN
          ========================= */}

          <div className="cadastro-footer">

            <p>
              Já possui uma conta?
            </p>

            <Link to="/login">
              Entrar na minha conta
            </Link>

          </div>


        </div>

      </div>

    </div>
  );
}


export default Cadastro;