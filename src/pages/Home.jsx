import { useEffect, useState } from "react";

import {
  Search,
  Heart,
  Lightbulb,
  ChefHat,
  Clock,
  Star,
  ArrowRight,
  LogIn,
  LogOut,
  User,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "../firebase";

import { receitas } from "../data/receitas";

import {
  obterFavoritos,
  alternarFavorito,
} from "../utils/favoritos";

import "../App.css";
import "./Home.css";


function Home() {
  const navigate = useNavigate();


  // ==========================================
  // ESTADOS
  // ==========================================

  const [busca, setBusca] = useState("");

  const [categoria, setCategoria] = useState("Todas");

  const [favoritos, setFavoritos] = useState(
    obterFavoritos()
  );

  const [usuario, setUsuario] = useState(null);

  const [carregandoUsuario, setCarregandoUsuario] = useState(true);


  // ==========================================
  // CARREGAR USUÁRIO DO FIREBASE
  // ==========================================

  useEffect(() => {

    const cancelarObservacao = onAuthStateChanged(
      auth,
      (usuarioAtual) => {

        setUsuario(usuarioAtual);

        setCarregandoUsuario(false);

      }
    );


    return () => {
      cancelarObservacao();
    };

  }, []);


  // ==========================================
  // ATUALIZAR FAVORITOS
  // ==========================================

  useEffect(() => {

    function atualizarFavoritos() {

      setFavoritos(
        obterFavoritos()
      );

    }


    window.addEventListener(
      "favoritosAtualizados",
      atualizarFavoritos
    );


    return () => {

      window.removeEventListener(
        "favoritosAtualizados",
        atualizarFavoritos
      );

    };

  }, []);


  // ==========================================
  // FAVORITO
  // ==========================================

  function mudarFavorito(id) {

    alternarFavorito(id);

    setFavoritos(
      obterFavoritos()
    );

  }


  // ==========================================
  // SAIR DA CONTA
  // ==========================================

  async function sair() {

    try {

      await signOut(auth);

      setUsuario(null);

      navigate("/login");

    } catch (error) {

      console.error(
        "Erro ao sair da conta:",
        error
      );

    }

  }


  // ==========================================
  // FILTRO DAS RECEITAS
  // ==========================================

  const receitasFiltradas =
    receitas.filter((receita) => {

      const textoBusca =
        busca.toLowerCase().trim();


      const correspondeBusca =
        receita.nome
          .toLowerCase()
          .includes(textoBusca) ||

        receita.categoria
          .toLowerCase()
          .includes(textoBusca);


      const correspondeCategoria =
        categoria === "Todas" ||
        receita.categoria === categoria;


      return (
        correspondeBusca &&
        correspondeCategoria
      );

    });


  const receitasDestaque =
    receitasFiltradas.slice(0, 4);


  // ==========================================
  // CATEGORIAS
  // ==========================================

  const categorias = [

    {
      nome: "Todas",
      emoji: "🍽️",
    },

    {
      nome: "Massas",
      emoji: "🍝",
    },

    {
      nome: "Sobremesas",
      emoji: "🍰",
    },

    {
      nome: "Saudáveis",
      emoji: "🥗",
    },

    {
      nome: "Lanches",
      emoji: "🍔",
    },

    {
      nome: "Almoço",
      emoji: "🍛",
    },

    {
      nome: "Café da manhã",
      emoji: "☕",
    },

  ];


  // ==========================================
  // NOME PARA EXIBIR
  // ==========================================

  const nomeUsuario =
    usuario?.displayName
      ? usuario.displayName.split(" ")[0]
      : usuario?.email
        ? usuario.email.split("@")[0]
        : "";


  // ==========================================
  // TELA
  // ==========================================

  return (

    <div className="home">


      {/* ======================================
          HEADER
      ====================================== */}

      <header className="home-header">


        {/* LOGO */}

        <button
          className="logo"
          onClick={() => navigate("/")}
        >

          <ChefHat size={32} />

          <span>
            Receitaí
          </span>

        </button>


        {/* AÇÕES DO HEADER */}

        <div className="header-actions">


          {usuario ? (

            <>


              {/* USUÁRIO */}

              <div className="user-welcome">

                <div className="user-icon">

                  <User size={17} />

                </div>


                <div className="user-info">

                  <span>
                    Olá,
                  </span>

                  <strong>
                    {nomeUsuario}
                  </strong>

                </div>

              </div>


              {/* FAVORITOS */}

              <button
                className="icon-button"
                onClick={() =>
                  navigate("/favoritos")
                }
                aria-label="Meus favoritos"
              >

                <Heart size={21} />

                {favoritos.length > 0 && (

                  <span className="favorite-count">
                    {favoritos.length}
                  </span>

                )}

              </button>


              {/* SAIR */}

              <button
                className="logout-button"
                onClick={sair}
              >

                <LogOut size={18} />

                <span>
                  Sair
                </span>

              </button>


            </>

          ) : (

            <>


              {/* FAVORITOS */}

              <button
                className="icon-button"
                onClick={() =>
                  navigate("/favoritos")
                }
                aria-label="Meus favoritos"
              >

                <Heart size={21} />

                {favoritos.length > 0 && (

                  <span className="favorite-count">
                    {favoritos.length}
                  </span>

                )}

              </button>


              {/* LOGIN */}

              <button
                className="header-login"
                onClick={() =>
                  navigate("/login")
                }
              >

                <LogIn size={18} />

                <span>
                  Entrar
                </span>

              </button>


            </>

          )}


        </div>

      </header>


      {/* ======================================
          CONTEÚDO
      ====================================== */}

      <main className="home-content">


        {/* ====================================
            BOAS-VINDAS
        ==================================== */}

        <section className="welcome">


          <p className="welcome-small">

            {usuario
              ? `Olá, ${nomeUsuario}! 👋`
              : "Olá! 👋"}

          </p>


          <h1>

            O que vamos

            <br />

            cozinhar hoje?

          </h1>


          <p className="welcome-text">

            Encontre receitas deliciosas, fáceis e
            caseiras para qualquer momento.

          </p>

        </section>


        {/* ====================================
            BUSCA
        ==================================== */}

        <div className="search-box">

          <Search size={22} />

          <input
            type="text"
            value={busca}
            onChange={(e) =>
              setBusca(e.target.value)
            }
            placeholder="Buscar uma receita..."
          />

        </div>


        {/* ====================================
            CATEGORIAS
        ==================================== */}

        <section className="categories">


          <div className="section-title">

            <h2>
              Categorias
            </h2>


            {categoria !== "Todas" && (

              <button
                className="clear-category"
                onClick={() =>
                  setCategoria("Todas")
                }
              >

                Limpar filtro

              </button>

            )}

          </div>


          <div className="category-list">

            {categorias.map((item) => (

              <button
                key={item.nome}
                className={
                  categoria === item.nome
                    ? "category-active"
                    : ""
                }
                onClick={() =>
                  setCategoria(item.nome)
                }
              >

                <span>
                  {item.emoji}
                </span>

                {item.nome}

              </button>

            ))}

          </div>

        </section>


        {/* ====================================
            DICA
        ==================================== */}

        <button
          className="highlight"
          onClick={() =>
            navigate("/dicas")
          }
        >

          <div className="highlight-icon">

            <Lightbulb size={28} />

          </div>


          <div>

            <p className="highlight-label">
              DICA DO DIA
            </p>


            <h2>
              Deixe suas receitas ainda mais saborosas
            </h2>


            <p>
              Descubra truques simples para cozinhar
              melhor todos os dias.
            </p>


            <span className="highlight-link">

              Ver dicas

              <ArrowRight size={18} />

            </span>

          </div>

        </button>


        {/* ====================================
            RECEITAS
        ==================================== */}

        <section className="recipes">


          <div className="section-title">


            <div>

              <h2>

                {categoria === "Todas"
                  ? "Receitas em destaque"
                  : categoria}

              </h2>


              {busca && (

                <p className="search-result-text">

                  Resultados para "{busca}"

                </p>

              )}

            </div>


            <button
              className="see-all"
              onClick={() =>
                navigate("/receitas")
              }
            >

              Ver todas

              <ArrowRight size={17} />

            </button>


          </div>


          {receitasDestaque.length === 0 ? (

            <div className="home-empty">

              <span>
                🍳
              </span>


              <h3>
                Nenhuma receita encontrada
              </h3>


              <p>
                Tente buscar por outro nome ou categoria.
              </p>


              <button
                onClick={() => {

                  setBusca("");

                  setCategoria("Todas");

                }}
              >

                Mostrar todas

              </button>

            </div>

          ) : (

            <div className="home-recipes-grid">

              {receitasDestaque.map(
                (receita) => {

                  const favorito =
                    favoritos.includes(
                      receita.id
                    );


                  return (

                    <article
                      className="home-recipe-card"
                      key={receita.id}
                    >


                      <div className="home-recipe-image">


                        <img
                          src={receita.imagem}
                          alt={receita.nome}
                        />


                        <button
                          className={`favorite-button ${
                            favorito
                              ? "favorite-active"
                              : ""
                          }`}
                          onClick={() =>
                            mudarFavorito(
                              receita.id
                            )
                          }
                          aria-label={
                            favorito
                              ? "Remover dos favoritos"
                              : "Adicionar aos favoritos"
                          }
                        >

                          <Heart
                            size={20}
                            fill={
                              favorito
                                ? "currentColor"
                                : "none"
                            }
                          />

                        </button>


                        <span className="home-category-tag">

                          {receita.categoria}

                        </span>


                      </div>


                      <div className="home-recipe-content">


                        <h3>
                          {receita.nome}
                        </h3>


                        <p>
                          {receita.descricao}
                        </p>


                        <div className="home-recipe-meta">


                          <span>

                            <Star
                              size={16}
                              fill="currentColor"
                            />

                            {receita.nota}

                          </span>


                          <span>

                            <Clock size={16} />

                            {receita.tempo}

                          </span>


                        </div>


                        <button
                          className="home-view-recipe"
                          onClick={() =>
                            navigate(
                              `/receita/${receita.id}`
                            )
                          }
                        >

                          Ver receita

                          <ArrowRight size={17} />

                        </button>


                      </div>

                    </article>

                  );

                }
              )}

            </div>

          )}

        </section>


        {/* ====================================
            CTA FINAL
        ==================================== */}

        <section className="home-bottom">


          <div>

            <span>
              👨‍🍳
            </span>


            <div>

              <h2>
                Ainda não sabe o que preparar?
              </h2>


              <p>
                Explore todas as nossas receitas.
              </p>

            </div>

          </div>


          <button
            onClick={() =>
              navigate("/receitas")
            }
          >

            Explorar receitas

            <ArrowRight size={18} />

          </button>


        </section>


      </main>

    </div>

  );

}


export default Home;