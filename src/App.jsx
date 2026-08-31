import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Receitas from "./pages/Receitas";
import ReceitaDetalhe from "./pages/ReceitaDetalhes";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Favoritos from "./pages/Favoritos";
import Dicas from "./pages/Dicas";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/receitas"
          element={<Receitas />}
        />

        <Route
          path="/receita/:id"
          element={<ReceitaDetalhe />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/cadastro"
          element={<Cadastro />}
        />

        <Route
          path="/favoritos"
          element={<Favoritos />}
        />

        <Route
          path="/dicas"
          element={<Dicas />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;