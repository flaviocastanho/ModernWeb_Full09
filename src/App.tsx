import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import LoginPage from './pages/Login'
import HomePage from './pages/Home'
import CreateUserPage from './pages/User/create'
import AlterUserPage from "./pages/User/alter";
import ListUserPage from "./pages/User/list";
import CreateRolesPage from "./pages/Roles/create";
import AlterRolesPage from "./pages/Roles/alter";
import ListRolesPage from "./pages/Roles/list";

const router = createBrowserRouter([
  { path: "/", Component: LoginPage },
  { path: "/login", Component: LoginPage },
  { path: "/home", Component: HomePage },
  { path: "/users", Component: ListUserPage },
  { path: "/users/create", Component: CreateUserPage },
  { path: "/users/alter/:id", Component: AlterUserPage },
  { path: "/roles", Component: ListRolesPage },
  { path: "/roles/create", Component: CreateRolesPage },
  { path: "/roles/alter/:name", Component: AlterRolesPage },
]);

export default function App() {
    return (
        <RouterProvider router={router} />
    )
}