import ListarAlunos from "./pages/listarAlunos";
import { People } from "@mui/icons-material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import novoAluno from "./pages/novoAluno";
import editarAluno from "./pages/editarAluno";
export const routesAlunos = [
  {
    path: "listar",
    element: ListarAlunos,
    title: "Listar Alunos",
    icon: <People></People>,
  },
  {
    path: "novo",
    element: novoAluno,
    title: "Novo Aluno",
    icon: <AssignmentIndIcon></AssignmentIndIcon>,
  },
  {
    path: "editar/:id",
    element: editarAluno,
    icon: <AssignmentIndIcon></AssignmentIndIcon>,
  },
];
