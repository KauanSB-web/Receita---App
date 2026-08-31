import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import receitas from "../data/receitas";
import { obterFavoritos, alternarFavorito } from "../utils/favoritos";

import "./ReceitaDetalhes.css";


function ReceitaDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const receita = receitas.find(
    (item) => String(item.id) === String(id)
  );

  const [favorito, setFavorito] = useState(() => {
    if (!receita) return false;

    const favoritos = obterFavoritos();

    return favoritos.includes(receita.id);
  });


  if (!receita) {
    return (
      <div className="detalhes-page">

        <div className="detalhes-erro">

          <div className="erro-icon">🍽️</div>

          <h1>Receita não encontrada</h1>

          <p>
            Não conseguimos encontrar essa receita.
          </p>

          <button
            className="btn-voltar"
            onClick={() => navigate("/receitas")}
          >
            ← Voltar para receitas
          </button>

        </div>

      </div>
    );
  }


  const ingredientes = receita.ingredientes || [
    "Ingredientes não cadastrados."
  ];


  const preparo = receita.preparo ||
    "O modo de preparo desta receita ainda está sendo atualizado. Em breve teremos todos os detalhes disponíveis.";


  function handleFavorito() {
    alternarFavorito(receita.id);

    setFavorito(!favorito);
  }


  return (
    <div className="detalhes-page">

      {/* HEADER */}

      <header className="detalhes-header">

        <button
          className="detalhes-voltar"
          onClick={() => navigate("/receitas")}
        >
          ←
          <span>Voltar para receitas</span>
        </button>

        <div className="detalhes-logo">
          👨‍🍳 <span>Receitaí</span>
        </div>

      </header>


      {/* CONTEÚDO */}

      <main className="detalhes-container">

        {/* IMAGEM */}

        <div className="detalhes-imagem-container">

          {receita.imagem ? (
            <img
              src={receita.imagem}
              alt={receita.nome}
              className="detalhes-imagem"
            />
          ) : (
            <div className="detalhes-imagem-placeholder">
              🍽️
            </div>
          )}

          <button
            className={`detalhes-favorito ${
              favorito ? "ativo" : ""
            }`}
            onClick={handleFavorito}
            aria-label="Adicionar aos favoritos"
          >
            {favorito ? "♥" : "♡"}
          </button>

        </div>


        {/* INFORMAÇÕES */}

        <section className="detalhes-conteudo">

          <div className="detalhes-categoria">
            {receita.categoria || "Receita"}
          </div>


          <h1 className="detalhes-titulo">
            {receita.nome}
          </h1>


          <p className="detalhes-descricao">

            Uma receita deliciosa e fácil de preparar
            para deixar suas refeições ainda melhores.

          </p>


          {/* INFORMAÇÕES RÁPIDAS */}

          <div className="detalhes-info">

            <div className="info-item">

              <span className="info-icon">⏱️</span>

              <div>
                <small>Tempo</small>
                <strong>
                  {receita.tempo || "A consultar"}
                </strong>
              </div>

            </div>


            <div className="info-item">

              <span className="info-icon">👨‍🍳</span>

              <div>
                <small>Dificuldade</small>
                <strong>
                  {receita.dificuldade || "Fácil"}
                </strong>
              </div>

            </div>


            <div className="info-item">

              <span className="info-icon">🍽️</span>

              <div>
                <small>Categoria</small>
                <strong>
                  {receita.categoria || "Geral"}
                </strong>
              </div>

            </div>

          </div>


          {/* INGREDIENTES */}

          <section className="detalhes-secao">

            <h2>
              🛒 Ingredientes
            </h2>

            <p className="secao-subtitulo">
              Tudo o que você precisa para preparar essa receita.
            </p>


            <div className="ingredientes-lista">

              {ingredientes.map((ingrediente, index) => (

                <div
                  className="ingrediente-item"
                  key={index}
                >

                  <span className="ingrediente-check">
                    ✓
                  </span>

                  <span>
                    {ingrediente}
                  </span>

                </div>

              ))}

            </div>

          </section>


          {/* PREPARO */}

          <section className="detalhes-secao preparo-secao">

            <h2>
              👨‍🍳 Modo de preparo
            </h2>

            <p className="secao-subtitulo">
              Siga o passo a passo para preparar sua receita.
            </p>


            <div className="preparo-texto">

              {preparo}

            </div>

          </section>


          {/* BOTÕES */}

          <div className="detalhes-acoes">

            <button
              className={`btn-favorito ${
                favorito ? "favoritado" : ""
              }`}
              onClick={handleFavorito}
            >

              {favorito
                ? "♥ Remover dos favoritos"
                : "♡ Adicionar aos favoritos"}

            </button>


            <button
              className="btn-voltar-lista"
              onClick={() => navigate("/receitas")}
            >
              Ver outras receitas →
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}


export default ReceitaDetalhes;