import { Link } from "react-router";
import { FaDoorOpen } from "react-icons/fa";
import { getDataLocalStorage } from "../../utils/getDataLocalStorage";
import styles from "./Menu.module.css";

const dadosLocalStorage = getDataLocalStorage();

function Menu() {
    return (
        <div className={styles.containerMenu}>
        <div className={styles.contenteLeft}>
          <span className={styles.logoMenu}>🍽️</span>
          <h1>Sabor & Arte</h1>
          <ul>
            <Link to="/mesas">
                <li>Mesas</li>
            </Link>
            <Link to="/pedidos">
              <li>Pedidos</li>
            </Link>
          </ul>
        </div>
        <div className={styles.contentRight}>
          <span>{dadosLocalStorage.nome}</span>
          <span>
            <FaDoorOpen/>
          </span>
        </div>
      </div>
    )
}

export default Menu;