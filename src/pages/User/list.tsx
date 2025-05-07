import React from "react";
import { useNavigate } from "react-router-dom";
import * as userService from "../../services/user.service";
import MyHeader from "../../components/MyHeader";
import "./styles.scss";
import MyMenu from "../../components/MyMenu";

export default function ListUser() {
  const navigate = useNavigate();

  const [userList, setUserList] = React.useState([]);

  function fetchUsers() {
    userService
      .getList()
      .then((list) => {
        setUserList(list);
      })
      .catch((error) => {
        console.error("Erro ao recuperar a lista de usuários: ", error);
        navigate("/login");
      });
  }

  React.useEffect(() => {
    fetchUsers();
    
  }, []);

    React.useEffect(() => {
      fetchUsers();
    }, []);

  function goToAdd() {
    navigate("/users/create");
  }

  function remove(id: number) {
    userService
      .remove(id)
      .then(() => {
        fetchUsers();
      })
      .catch((error) => {
        console.error("Erro ao deletar um usuário: ", error);
        navigate("/login");
      });
  }

  function altera(id: number) {
    navigate("/users/alter/" + id);
  }

  return (
    <div className="home-page">
      <MyHeader title="Lista de Usuários" />

      <MyMenu />

      <main>
        <button onClick={goToAdd}>Adicionar</button>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Usuário</th>
              <th>Roles</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user: any) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.roles != null ? user.roles.join("|") : ""}</td>
                  <td>
                    <button onClick={() => remove(user.id)}>Remover</button>
                    <button onClick={() => altera(user.id)}>Alterar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>

      <footer>Temos {userList.length} usuários cadastros no sistema.</footer>
    </div>
  );
}
