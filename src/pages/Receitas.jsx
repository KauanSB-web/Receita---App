import { useState } from "react";

import {
  Search,
  Heart,
  ArrowLeft,
  ArrowRight,
  Clock,
  Star,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { receitas } from "../data/receitas";

import {
  obterFavoritos,
  alternarFavorito,
} from "../utils/favoritos";

import "./Receitas.css";


function Receitas() {

  const navigate = useNavigate();


  const [busca, setBusca] = useState("");

  const [categoria, setCategoria] =
    useState("Todas");

  const [favoritos, setFavoritos] =
    useState(obterFavoritos());


  const categorias = [
    "Todas",
    "Massas",
    "Sobremesas",
    "Lanches",
    "Almoço",
    "Saudáveis",
    "Café da manhã",
    "Bebidas",
  ];


  function mudarFavorito(id) {

    alternarFavorito(id);

    setFavoritos(
      obterFavoritos()
    );
  }


  const receitasFiltradas =
    receitas.filter((receita) => {

      const termo =
        busca
          .toLowerCase()
          .trim();


      const correspondeBusca =
        receita.nome
          .toLowerCase()
          .includes(termo) ||

        receita.categoria
          .toLowerCase()
          .includes(termo);


      const correspondeCategoria =
        categoria === "Todas" ||
        receita.categoria === categoria;


      return (
        correspondeBusca &&
        correspondeCategoria
      );
    });


  return (

    <div className="receitas-page">


      {/* ====================================
          CABEÇALHO
      ==================================== */}

      <header className="receitas-header">


        <button
          className="back-button"
          onClick={() => navigate("/")}
        >

          <ArrowLeft size={19} />

          Voltar

        </button>


        <div>

          <h1>
            Todas as receitas
          </h1>

          <p>
            Encontre sua próxima receita favorita
          </p>

        </div>


        <button
          className="favorites-header-button"
          onClick={() =>
            navigate("/favoritos")
          }
        >

          <Heart size={19} />

          Favoritos

          {favoritos.length > 0 && (
            <span>
              {favoritos.length}
            </span>
          )}

        </button>

      </header>



      {/* ====================================
          CONTEÚDO
      ==================================== */}

      <main className="receitas-container">


        {/* BUSCA */}

        <div className="receitas-search">

          <Search size={21} />

          <input
            type="text"
            value={busca}
            onChange={(e) =>
              setBusca(e.target.value)
            }
            placeholder="Buscar uma receita..."
          />

        </div>



        {/* CATEGORIAS */}

        <div className="receitas-categorias">

          {categorias.map((item) => (

            <button
              key={item}
              className={
                categoria === item
                  ? "selected"
                  : ""
              }
              onClick={() =>
                setCategoria(item)
              }
            >

              {item}

            </button>

          ))}

        </div>



        {/* RESULTADO */}

        <div className="receitas-result-header">

          <div>

            <h2>

              {categoria === "Todas"
                ? "Todas as receitas"
                : categoria}

            </h2>

            <p>

              {receitasFiltradas.length}{" "}
              {receitasFiltradas.length === 1
                ? "receita encontrada"
                : "receitas encontradas"}

            </p>

          </div>

        </div>



        {/* ====================================
            CARDS
        ==================================== */}

        {receitasFiltradas.length === 0 ? (

          <div className="receitas-empty">

            <span>
              🍳
            </span>

            <h2>
              Nenhuma receita encontrada
            </h2>

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

          <div className="receitas-grid">

            {receitasFiltradas.map(
              (receita) => {

                const favorito =
                  favoritos.includes(
                    receita.id
                  );


                return (

                  <article
                    className="receita-card"
                    key={receita.id}
                  >


                    {/* IMAGEM */}

                    <div className="receita-image">

                      <img
                        src={receita.imagem}
                        alt={receita.nome}
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";
                        }}
                      />


                      <button
                        className={`heart ${
                          favorito
                            ? "active"
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
                          size={19}
                          fill={
                            favorito
                              ? "currentColor"
                              : "none"
                          }
                        />

                      </button>


                      <span className="recipe-category">

                        {receita.categoria}

                      </span>

                    </div>



                    {/* CONTEÚDO */}

                    <div className="receita-content">


                      <h2>
                        {receita.nome}
                      </h2>


                      <p className="recipe-description">

                        {receita.descricao}

                      </p>



                      <div className="receita-info">


                        <span>

                          <Star
                            size={15}
                            fill="currentColor"
                          />

                          {receita.nota}

                        </span>


                        <span>

                          <Clock size={15} />

                          {receita.tempo}

                        </span>


                        <span>
                          {receita.dificuldade}
                        </span>


                      </div>



                      <button
                        className="open-recipe"
                        onClick={() =>
                          navigate(
                            `/receita/${receita.id}`
                          )
                        }
                      >

                        Ver receita

                        <ArrowRight
                          size={17}
                        />

                      </button>

                    </div>

                  </article>

                );
              }
            )}

          </div>

        )}

      </main>

    </div>
  );
}


export default Receitas;