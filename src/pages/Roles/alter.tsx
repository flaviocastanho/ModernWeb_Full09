import React from 'react'
import { useNavigate, useParams  } from 'react-router-dom'

import * as rolesService from '../../services/roles.service'
import MyHeader from "../../components/MyHeader";
import MyInput from '../../components/MyInput'
import MyButton from '../../components/MyButton'
import MyMenu from "../../components/MyMenu";

import './styles.scss'

export default function AlterRoles() {
  const navigate = useNavigate()
 
  let { name } = useParams();
  const id = name;
  const [namedesc, setName] = React.useState("");
    const [descricao, setDescricao] = React.useState('')

    function fetchUsers() {
        rolesService.getRoles(Number(id)).then(list => {
            setName(list.name);
            setDescricao(list.description);
        }).catch(error => {
            console.error('Erro ao recuperar a lista de Roles: ', error)
            navigate('/login')
        })
    }

    React.useEffect(() => {
        fetchUsers()
    }, [])
    
    function update() {
        rolesService.update(Number(id), descricao).then((code) => {
          if (code === 200) {
            navigate("/roles");
          } else {
            navigate("/login");
          }
        });
    }

    return (
      <div className="alter-user-page">
        <MyHeader title="Alterar Roles" />

        <MyMenu/>
        
        <main>
          <MyInput label="Nome" value={namedesc} change={setName} disabled />
          <MyInput label="Descrição" value={descricao} change={setDescricao} />
        </main>

        <footer>
          <MyButton title="Salvar" click={update} />
        </footer>
      </div>
    );
}