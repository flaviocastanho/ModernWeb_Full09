import React, { useState }  from 'react'
import { useNavigate, useParams  } from 'react-router-dom'
import * as rolesService from "../../services/roles.service";
import * as userService from '../../services/user.service'
import MyHeader from "../../components/MyHeader";
import MyMenu from "../../components/MyMenu";
import MyInput from '../../components/MyInput'
import MyButton from '../../components/MyButton'


import './styles.scss'

export default function AlterUser() {
    const navigate = useNavigate()
    
    let { id } = useParams();
    const [name, setName] = React.useState('')
    const [username, setUsername] = React.useState('')

  const rolesDisponiveis: string[] = ["admin", "editor", "viewer", "user"];
  const [rolesSelecionados, setRolesSelecionados] = useState<string[]>([]);
  
      function fetchRoles() {
        rolesService
          .getList()
          .then((list) => {
            setRolesSelecionados(list);
          })
          .catch((error) => {
            console.error("Erro ao recuperar a lista de Roles: ", error);
            navigate("/login");
          });
      }
  
   React.useEffect(() => {
     fetchRoles();
     
   }, []);
  
   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
     const selectedOptions = Array.from(event.target.selectedOptions);
     const values = selectedOptions.map((option) => option.value);
     setRolesSelecionados(values);
   };
  

    function fetchUsers() {
        userService.getUser(Number(id)).then(list => {
            setName(list.name);
            setUsername(list.username);
        }).catch(error => {
            console.error('Erro ao recuperar a lista de usuários: ', error)
            navigate('/login')
        })
    }

    React.useEffect(() => {
        fetchUsers()
    }, [])
    
    function update() {
        if (name === null || name.length < 1) {
            alert('Nome é obrigatório')
            return
        }

        userService
          .update(Number(id), name, rolesSelecionados)
          .then((code) => {
            if (code === 200) {
              navigate("/users");
            } else {
              navigate("/login");
            }
          });
    }

    return (
      <div className="alter-user-page">
        <MyHeader title="Alterar Usuário" />

        <MyMenu />

        <main>
          <MyInput label="Nome" value={name} change={setName} />
          <MyInput
            label="Login"
            value={username}
            change={setUsername}
            disabled
          />
          <label htmlFor="roles">Selecione as Roles:</label>
          <br />
          <select
            id="roles"
            multiple
            value={rolesSelecionados}
            onChange={handleChange}
            style={{
              padding: "8px",
              width: "15%",
              height: "120px",
              marginTop: "10px",
            }}
          >
            {rolesDisponiveis.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          {rolesSelecionados.length > 0 && (
            <p style={{ marginTop: "15px" }}>
              <strong>Selecionados:</strong> {rolesSelecionados.join(", ")}
            </p>
          )}
        </main>

        <footer>
          <MyButton title="Salvar" click={update} />
        </footer>
      </div>
    );
}