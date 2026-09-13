import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import {Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import { getDataLocalStorage } from "../../utils/getDataLocalStorage";

import stylesIndex from "../../index.module.css";
import styles from "./Mesas.module.css";
import { GiWoodenChair } from "react-icons/gi";


const dadosLocalStorage = getDataLocalStorage();

type Mesa ={
  id: number;
  nome: string;
  quant_lugares: number | null;
  reservado: boolean;
  criado_em: string;
  atualizado_em: string;
}

function Mesas() {

    const navigate = useNavigate();
    const [mesas, setMesas] = useState<Mesa[]>([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [mesaClicada, setMesaClicada] = useState<Mesa | null>(null);
    const [nomeCliente, setNomeCliente] = useState("");

    function abrirModal(mesa: Mesa) {
      setModalAberto(true);
      setMesaClicada(mesa);
    }

    function fecharModal() {
      setModalAberto(false);
    }

    async function criarPedido(event: React.SubmitEvent) {
      try {
        event.preventDefault();

        await axios.post("http://localhost:8888/pedidos",
          {
            mesa_id: mesaClicada?.id,
            nome_cliente: nomeCliente,
            data: "2026-08-26",
          },
          {
            headers: {
              Authorization: `Bearen ${dadosLocalStorage.token}`,
            },
          },
        );

        navigate("/pedido-items");
      } catch {
        alert("Erro ao criar pedido");
      }
  }

    async function buscarMesas() {
      const response = await axios.get<Mesa[]>("http://localhost:8888/mesas", {
        headers: {
          authorization: `Bearer ${dadosLocalStorage.token}`,
        },
      });

      setMesas(response.data);
    }

    useEffect(() => {
      buscarMesas();
    }, []); // Deve executar apenas uma vez ao renderizar a tela inicial de mesas


    return(
    <>

    <div>

      <h2>Mesas</h2>
      <p>Selecione uma mesa para abrir ou acompanhar o pedido</p>

      <div className={styles.containerChair}>
        {mesas.map((mesa) => (
            <div className={styles.chair} key={mesa.id} onClick={() => abrirModal(mesa)}>
          <div className={styles.chairHeader}>
            <span>{mesa.reservado ? "Ocupado" : "Livre"}</span>
            <GiWoodenChair/>
          </div>
          <h3>{mesa.nome}</h3>
          <span>{` ${mesa.quant_lugares} lugares` || 0}</span>
        </div>
        ))}
      </div>

    </div>

    <Dialog open={modalAberto} onClose={fecharModal} maxWidth="md">
        <form onSubmit={criarPedido}>
          <DialogTitle>Mesa {mesaClicada?.nome}</DialogTitle>
          <DialogContent>
            <p>Informe o nome do cliente para abrir o pedido</p>
            <div className={stylesIndex.containerInput}>
              <label>Nome do cliente</label>
              <input
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                required
              />
            </div>
          </DialogContent>
          <DialogActions>
            <button type="submit">Criar pedido</button>
          </DialogActions>
        </form>
      </Dialog>

    </>
  );  

}
export default Mesas;