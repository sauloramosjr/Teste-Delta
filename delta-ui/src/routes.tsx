import Alunos from "./modulos/alunos/alunos";
import Home from "./modulos/home/home";
import { Home as HomeIcon, People } from "@mui/icons-material";
import { routesAlunos } from "./modulos/alunos/routes";

export const routes = [
  {
    path: "/",
    element: Home,
    title: "Home",
    icon: <HomeIcon></HomeIcon>,
  },
  {
    path: "/alunos",
    element: Alunos,
    title: "Alunos",
    icon: <People></People>,
    children: routesAlunos,
  },
];
