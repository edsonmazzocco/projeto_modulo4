import {Route, Routes, useLocation} from "react-router";
import Menu from "./components/Menu/Menu";
import Login from "./pages/Login/Login";
import Mesas from "./pages/Mesas/Mesas";
import PedidosItems from "./pages/PedidosItems/PedidosItems";
import Pedidos from "./pages/Pedidos/Pedidos";

function App() {

    const location = useLocation();

    return (
    <>
      {location.pathname !== "/" && <Menu />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mesas" element={<Mesas />} />
        <Route path="/pedidos-items" element={<PedidosItems />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Routes>
    </>
    )
}

export default App;