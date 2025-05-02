import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { logoff } from "../../services/auth.service";

type Props = {
  title: string;
};

export default function MyHeader() {
      const navigate = useNavigate();

      function sair() {
        navigate("/login");
      }
    return (
      <nav>
        <a href="/home">Início</a>
        <a href="/users">Usuários</a>
        <a href="/roles">Roles</a>
        <a href="#" onClick={sair}>
          Sair
        </a>
      </nav>
    );
}
