import { useState } from "react";
import { Heart, ArrowLeft, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { receitas } from "../data/receitas";

import {
  obterFavoritos,
  alternarFavorito
} from "../utils/favoritos";

import "./Favoritos.css";


function Favoritos(){


  const navigate = useNavigate();


  const [favoritos,setFavoritos] = useState(
    obterFavoritos()
  );



  const receitasFavoritas =
    receitas.filter((receita)=>
      favoritos.includes(receita.id)
    );




  function remover(id){

    alternarFavorito(id);

    setFavoritos(
      obterFavoritos()
    );

  }




  return (

    <div className="favoritos-page">



      <header className="favoritos-header">


        <button
          onClick={()=>navigate(-1)}
        >

          <ArrowLeft size={20}/>

          Voltar

        </button>



        <h1>
          Minhas favoritas ❤️
        </h1>


      </header>





      <main className="favoritos-container">





      {
        receitasFavoritas.length === 0 ?

        (

          <div className="empty-favorites">


            <Heart size={55}/>


            <h2>
              Nenhuma receita salva
            </h2>


            <p>
              Clique no coração das receitas para guardar suas favoritas.
            </p>



            <button
              onClick={()=>
                navigate("/receitas")
              }
            >

              Explorar receitas

            </button>


          </div>

        )

        :

        (

          <div className="favoritos-grid">


          {
            receitasFavoritas.map((receita)=>(


              <article
                className="favorito-card"
                key={receita.id}
              >



                <div className="favorito-image">


                  <img
                    src={receita.imagem}
                    alt={receita.nome}
                  />



                  <button

                    onClick={()=>
                      remover(receita.id)
                    }

                  >

                    <Heart
                      size={21}
                      fill="currentColor"
                    />

                  </button>



                </div>





                <div className="favorito-content">


                  <h2>
                    {receita.nome}
                  </h2>



                  <p>
                    {receita.descricao}
                  </p>




                  <div className="favorito-info">


                    <span>

                      <Star size={15}/>

                      {receita.nota}

                    </span>



                    <span>

                      <Clock size={15}/>

                      {receita.tempo}

                    </span>


                  </div>





                  <button

                    className="open-favorite"

                    onClick={()=>
                      navigate(
                        `/receita/${receita.id}`
                      )
                    }

                  >

                    Ver receita

                  </button>



                </div>


              </article>


            ))
          }


          </div>

        )

      }





      </main>


    </div>

  );

}


export default Favoritos;