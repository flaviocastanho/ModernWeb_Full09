import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

import * as userService from '../../services/user.service'

import MyInput from '../../components/MyInput'
import MyButton from '../../components/MyButton'
import MyHeader from "../../components/MyHeader";
import MyMenu from "../../components/MyMenu";

import './styles.scss'

export default function CreateUser() {
    const navigate = useNavigate()

    const [name, setName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [password, setPawssord] = React.useState('')
    const [confirmPass, setConfirmPass] = React.useState('')
  
  const rolesDisponiveis: string[] = ["admin", "editor", "viewer", "user"];

  const [rolesSelecionados, setRolesSelecionados] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const values = selectedOptions.map((option) => option.value);
    setRolesSelecionados(values);
  };

    
    function save() {
        if (name === null || name.length < 1) {
            alert('Nome é obrigatório')
            return
        }
        if (username === null || username.length < 1) {
            alert('Login é obrigatório')
            return
        }
        if (password === null || password.length < 1) {
            alert('Senha é obrigatória')
            return
        }
        if (password !== confirmPass) {
            alert('Senha é inválida')
            return
        }

        userService
          .save(name, username, password, rolesSelecionados)
          .then((code) => {
            if (code === 201) {
              navigate("/users");
            } else if (code === 400) {
              alert("username já cadastro!");
            } else {
              navigate("/login");
            }
          });
    }

    return (
      <div className="create-user-page">
        <MyHeader title="Novo Usuário" />

        <MyMenu />

        <main>
          <MyInput label="Nome" value={name} change={setName} />
          <MyInput label="Login" value={username} change={setUsername} />
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
          <MyInput
            label="Senha"
            value={password}
            change={setPawssord}
            type="password"
          />
          <MyInput
            label="Confirmar Senha"
            value={confirmPass}
            change={setConfirmPass}
            type="password"
          />
        </main>

        <footer>
          <MyButton title="Salvar" click={save} />
        </footer>
      </div>
    );
}