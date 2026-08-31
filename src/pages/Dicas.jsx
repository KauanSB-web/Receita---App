import { useState } from "react";
import {
  ArrowLeft,
  Lightbulb,
  ChefHat,
  Clock,
  CheckCircle,
  Sparkles,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./Dicas.css";

function Dicas() {
  const navigate = useNavigate();

  const [busca, setBusca] = useState("");

  const dicas = [
    {
      id: 1,
      titulo: "Como deixar o arroz soltinho",
      categoria: "Preparação",
      tempo: "5 min",
      icone: "🍚",
      texto:
        "Lave o arroz antes de cozinhar para retirar parte do excesso de amido. Refogue os grãos com um pouco de óleo ou azeite antes de adicionar a água. Depois, cozinhe em fogo baixo e evite mexer enquanto o arroz cozinha.",
      passos: [
        "Lave o arroz até a água ficar mais clara.",
        "Refogue o arroz por alguns minutos.",
        "Adicione a água na proporção adequada.",
        "Cozinhe em fogo baixo com a panela parcialmente tampada.",
        "Desligue o fogo e deixe descansar por alguns minutos antes de servir.",
      ],
    },

    {
      id: 2,
      titulo: "Como deixar o frango mais suculento",
      categoria: "Carnes",
      tempo: "10 min",
      icone: "🍗",
      texto:
        "Para evitar que o frango fique seco, tempere com antecedência e não cozinhe por tempo excessivo. Em preparações grelhadas, deixe a panela bem quente antes de colocar o frango.",
      passos: [
        "Tempere o frango com antecedência.",
        "Deixe a frigideira ou grelha aquecer bem.",
        "Sele os dois lados do frango.",
        "Finalize o cozimento em fogo médio.",
        "Deixe a carne descansar alguns minutos antes de cortar.",
      ],
    },

    {
      id: 3,
      titulo: "Como fazer uma massa perfeita",
      categoria: "Massas",
      tempo: "8 min",
      icone: "🍝",
      texto:
        "Uma boa massa começa com bastante água fervente e uma quantidade adequada de sal. Evite colocar óleo na água, pois isso pode dificultar a aderência do molho à massa.",
      passos: [
        "Use bastante água para cozinhar a massa.",
        "Adicione sal quando a água estiver fervendo.",
        "Coloque a massa somente depois da fervura.",
        "Mexa nos primeiros minutos para evitar que grude.",
        "Reserve um pouco da água do cozimento para o molho.",
      ],
    },

    {
      id: 4,
      titulo: "Como cortar cebola sem chorar",
      categoria: "Truques",
      tempo: "3 min",
      icone: "🧅",
      texto:
        "Uma cebola bem gelada pode liberar menos compostos irritantes durante o corte. Use uma faca bem afiada e tente cortar a cebola rapidamente, mantendo o rosto um pouco mais afastado.",
      passos: [
        "Coloque a cebola na geladeira por alguns minutos.",
        "Use uma faca bem afiada.",
        "Corte primeiro as extremidades.",
        "Evite aproximar muito o rosto da tábua.",
        "Lave a faca se necessário durante o preparo.",
      ],
    },

    {
      id: 5,
      titulo: "Como deixar a carne bem dourada",
      categoria: "Carnes",
      tempo: "5 min",
      icone: "🥩",
      texto:
        "Para conseguir uma boa crosta dourada, a superfície da carne deve estar relativamente seca e a panela precisa estar bem quente. Evite colocar muitas peças ao mesmo tempo.",
      passos: [
        "Seque a superfície da carne antes de cozinhar.",
        "Aqueça bem a panela.",
        "Adicione uma pequena quantidade de óleo.",
        "Coloque a carne sem amontoar.",
        "Evite ficar virando a carne o tempo todo.",
      ],
    },

    {
      id: 6,
      titulo: "Como conservar ervas frescas",
      categoria: "Conservação",
      tempo: "5 min",
      icone: "🌿",
      texto:
        "Ervas frescas podem durar mais quando armazenadas corretamente. Retire folhas danificadas e mantenha as ervas de acordo com a sua necessidade de umidade.",
      passos: [
        "Retire folhas amassadas ou estragadas.",
        "Evite guardar ervas molhadas em excesso.",
        "Use papel-toalha para controlar a umidade.",
        "Mantenha-as em recipiente adequado.",
        "Evite deixar as ervas expostas ao calor.",
      ],
    },

    {
      id: 7,
      titulo: "Como engrossar um molho",
      categoria: "Molhos",
      tempo: "5 min",
      icone: "🥣",
      texto:
        "Se o molho ficou muito líquido, existem algumas maneiras simples de corrigir a textura. Você pode reduzir o líquido no fogo ou utilizar um espessante adequado para a receita.",
      passos: [
        "Deixe o molho cozinhar por mais alguns minutos.",
        "Mexa ocasionalmente para evitar que grude.",
        "Experimente antes de adicionar qualquer espessante.",
        "Se necessário, utilize amido previamente dissolvido em água.",
        "Cozinhe até atingir a consistência desejada.",
      ],
    },

    {
      id: 8,
      titulo: "Como fazer ovos mexidos cremosos",
      categoria: "Café da manhã",
      tempo: "5 min",
      icone: "🍳",
      texto:
        "O segredo dos ovos mexidos cremosos é o fogo baixo e o cozimento gradual. Mexa constantemente e retire do fogo um pouco antes de atingir o ponto final, pois os ovos continuam cozinhando com o calor residual.",
      passos: [
        "Quebre os ovos em uma tigela.",
        "Bata levemente até misturar.",
        "Aqueça a frigideira em fogo baixo.",
        "Mexa os ovos lentamente.",
        "Retire do fogo enquanto ainda estiverem levemente cremosos.",
      ],
    },

    {
      id: 9,
      titulo: "Como evitar bolo solado",
      categoria: "Confeitaria",
      tempo: "10 min",
      icone: "🍰",
      texto:
        "Um bolo pode ficar solado por vários motivos, como excesso de líquido, fermento inadequado ou mistura excessiva da massa. Respeite as quantidades indicadas e evite abrir o forno nos primeiros minutos.",
      passos: [
        "Meça os ingredientes corretamente.",
        "Confira a validade do fermento.",
        "Misture a massa somente até incorporar os ingredientes.",
        "Preaqueça o forno.",
        "Evite abrir a porta do forno no início do cozimento.",
      ],
    },

    {
      id: 10,
      titulo: "Como organizar sua cozinha",
      categoria: "Organização",
      tempo: "10 min",
      icone: "👨‍🍳",
      texto:
        "Uma cozinha organizada deixa o preparo muito mais rápido. Antes de começar uma receita, separe os ingredientes, utensílios e recipientes que serão utilizados.",
      passos: [
        "Leia toda a receita antes de começar.",
        "Separe todos os ingredientes.",
        "Deixe os utensílios necessários à mão.",
        "Organize os ingredientes por ordem de utilização.",
        "Limpe a bancada conforme for terminando cada etapa.",
      ],
    },
  ];

  const dicasFiltradas = dicas.filter((dica) => {
    const termo = busca.toLowerCase();

    return (
      dica.titulo.toLowerCase().includes(termo) ||
      dica.categoria.toLowerCase().includes(termo) ||
      dica.texto.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="dicas-page">

      {/* HEADER */}
      <header className="dicas-header">

        <button
          className="dicas-back"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="dicas-brand">
          <ChefHat size={28} />
          <span>Receitaí</span>
        </div>

        <button
          className="dicas-recipes-button"
          onClick={() => navigate("/receitas")}
        >
          Ver receitas
        </button>

      </header>

      <main className="dicas-container">

        {/* HERO */}
        <section className="dicas-hero">

          <div className="dicas-hero-icon">
            <Lightbulb size={42} />
          </div>

          <div className="dicas-hero-content">

            <span className="dicas-label">
              DICAS DO DIA
            </span>

            <h1>
              Pequenos truques,
              <br />
              grandes resultados.
            </h1>

            <p>
              Aprenda técnicas simples que vão deixar
              seus pratos ainda mais saborosos.
            </p>

          </div>

        </section>

        {/* BUSCA */}
        <div className="dicas-search">

          <Search size={21} />

          <input
            type="text"
            placeholder="Buscar uma dica..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

        </div>

        {/* TÍTULO */}
        <section className="dicas-section-title">

          <div>
            <span>APRENDA E COZINHE MELHOR</span>

            <h2>
              Dicas para o seu dia a dia
            </h2>
          </div>

          <div className="dicas-total">
            <Sparkles size={17} />
            {dicasFiltradas.length} dicas
          </div>

        </section>

        {/* CARDS */}
        {dicasFiltradas.length > 0 ? (

          <div className="dicas-grid">

            {dicasFiltradas.map((dica) => (

              <article
                className="dica-card"
                key={dica.id}
              >

                <div className="dica-card-top">

                  <div className="dica-emoji">
                    {dica.icone}
                  </div>

                  <span className="dica-category">
                    {dica.categoria}
                  </span>

                </div>

                <h3>
                  {dica.titulo}
                </h3>

                <p className="dica-description">
                  {dica.texto}
                </p>

                <div className="dica-time">
                  <Clock size={16} />
                  Leitura rápida • {dica.tempo}
                </div>

                <div className="dica-steps">

                  <strong>
                    Como fazer
                  </strong>

                  {dica.passos.map((passo, index) => (

                    <div
                      className="dica-step"
                      key={index}
                    >
                      <CheckCircle size={17} />

                      <span>
                        {passo}
                      </span>
                    </div>

                  ))}

                </div>

              </article>

            ))}

          </div>

        ) : (

          <div className="dicas-empty">

            <span>🔎</span>

            <h3>
              Nenhuma dica encontrada
            </h3>

            <p>
              Tente pesquisar por outro termo.
            </p>

            <button
              onClick={() => setBusca("")}
            >
              Ver todas as dicas
            </button>

          </div>

        )}

        {/* CTA */}
        <section className="dicas-cta">

          <div className="dicas-cta-icon">
            👨‍🍳
          </div>

          <div className="dicas-cta-text">

            <span>
              PRONTO PARA COZINHAR?
            </span>

            <h2>
              Coloque as dicas em prática!
            </h2>

            <p>
              Escolha uma receita e comece a preparar.
            </p>

          </div>

          <button
            onClick={() => navigate("/receitas")}
          >
            Explorar receitas
          </button>

        </section>

      </main>

    </div>
  );
}

export default Dicas;