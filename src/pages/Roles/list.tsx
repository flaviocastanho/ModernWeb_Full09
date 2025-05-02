import React from "react";
import { useNavigate } from "react-router-dom";
import * as rolesService from "../../services/roles.service";
import MyHeader from "../../components/MyHeader";
import "./styles.scss";
import MyMenu from "../../components/MyMenu";
import MyButton from '../../components/MyButton'

export default function ListRoles() {
  const navigate = useNavigate();

  const [userList, setRolesList] = React.useState([]);

  function fetchRoles() {
    rolesService
      .getList()
      .then((list) => {
        setRolesList(list);
      })
      .catch((error) => {
        console.error("Erro ao recuperar a lista de Roles: ", error);
        navigate("/login");
      });
  }

  React.useEffect(() => {
    fetchRoles();
  }, []);

  function goToAdd() {
    navigate("/roles/create");
  }

  function remove(id: number) {
    rolesService
      .remove(id)
      .then(() => {
        fetchRoles();
      })
      .catch((error) => {
        console.error("Erro ao deletar a Role: ", error);
        navigate("/login");
      });
  }

  function altera(id: number) {
    
    navigate("/roles/alter/" + id);
  }

  return (
    <div className="home-page">
       <MyHeader title="Lista de Roles" />

     <MyMenu/>

      <main>
        <button onClick={goToAdd}>Adicionar</button>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((roles: any) => {
              return (
                <tr>
                  <td>{roles.name}</td>
                  <td>{roles.description}</td>
                  <td>
                    <button onClick={() => remove(roles.id)}>Remover</button>
                    <button onClick={() => altera(roles.id)}>Alterar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>

      <footer>Temos {userList.length} roles cadastros no sistema.</footer>
    </div>
  );
}
