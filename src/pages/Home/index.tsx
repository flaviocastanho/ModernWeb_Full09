import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as userService from '../../services/user.service'
import MyMenu from "../../components/MyMenu";
import './styles.scss'
import { logoff } from '../../services/auth.service'

export default function HomePage() {


    return (
      <div className="home-page">
        <header>
          <h1>Bem-vindo ao Trabalho de Conclusão</h1>
          <p>Modern Web Full 09: Flavio Mariano Castanho</p>
        </header>

        <MyMenu/>

        <main>
          <h2>Opção 2: Implementar Alterações no App Web</h2>
          <ol>
            <li>
              Desenvolver o app de controle de acesso já trabalhado em sala de
              aula (telas de login, listagem e, cadastro e atualização de
              usuário)
            </li>
            <li>
              Implementar uma nova tela para listagem das Roles dos usuários
            </li>
            <li>Implementar uma nova tela para cadastro de uma nova Role</li>
            <li>Implementar delete da Role</li>
            <li>
              Alterar a tela de edição de usuário permitindo a associação de
              mais de uma Role para cada usuário
            </li>
          </ol>
        </main>

        <footer>
          <p>&copy; 2025 Meu Site. Todos os direitos reservados.</p>
        </footer>
      </div>
    );
}