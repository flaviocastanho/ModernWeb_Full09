import React from 'react'
import { useNavigate } from 'react-router-dom'

import * as rolesService from '../../services/roles.service'

import MyInput from '../../components/MyInput'
import MyButton from '../../components/MyButton'
import MyHeader from "../../components/MyHeader";
import MyMenu from "../../components/MyMenu";

import './styles.scss'

export default function CreateRoles() {
    const navigate = useNavigate()

    const [name, setName] = React.useState('')
    const [descricao, setDescricao] = React.useState('')

    function save() {
        if (name === null || name.length < 1) {
            alert('Nome é obrigatório')
            return
        }
        if (descricao === null || descricao.length < 1) {
          alert("Descrição é obrigatório");
          return;
        }

        rolesService.save(name, descricao).then((code) => {
          if (code === 201) {
            navigate("/roles");
          } else if (code === 400) {
            alert("roles já cadastro!");
          } else {
            navigate("/login");
          }
        });
    }

    return (
      <div className="create-user-page">
        <MyHeader title="Nova Role" />

        <MyMenu/>

        <main>
          <MyInput label="Nome" value={name} change={setName} />
          <MyInput label="Descrição" value={descricao} change={setDescricao} />
        </main>

        <footer>
          <MyButton title="Salvar" click={save} />
        </footer>
      </div>
    );
}