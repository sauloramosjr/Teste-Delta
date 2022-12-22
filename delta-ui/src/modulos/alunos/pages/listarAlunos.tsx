import { useContext, useEffect, useState } from "react";
import { IAluno } from "../../../common/interfaces/aluno.interface";
import { ENV } from "../../../common/utils/enviroments";
import { fetchAxios } from "../../../common/utils/fetch";
import * as S from "./styles";
import { Edit, Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AlunosContext } from "../../../common/contexts/alunos.contexts";
import { SnackBarContext } from "../../../common/contexts/snackbar.contexts";
const ListarAlunos = () => {
  const navigation = useNavigate();
  const { alunos, setAlunos } = useContext(AlunosContext);
  useEffect(() => {
    getAlunos();
  }, []);
  const [openModal, setOpenModal] = useState(false);
  const getAlunos = async () => {
    const { data } = await fetchAxios.get<IAluno[]>("alunos");
    if (data && data.length) {
      setAlunos(data);
    }
  };
  const handleDeleteAluno = async (id: number, nome: string) => {
    const removeAluno = await fetchAxios.delete("alunos/" + id);
    if (removeAluno) {
      setSnackBar({
        message: `Aluno ${nome} foi deletado com sucesso!`,
        open: true,
      });
      setAlunos(alunos.filter((aluno) => aluno.id !== id));
    }
  };
  const { setSnackBar } = useContext(SnackBarContext);

  const showListaAlunos = () => {
    if (!!alunos.length) {
      return alunos.map((aluno, key) => {
        return (
          <S.AlunoCard key={key}>
            <S.AcoesCardAlunos>
              <Tooltip title="Editar">
                <S.AcaoBtn
                  onClick={() => navigation("../editar/" + String(aluno.id))}
                  tipo="edit"
                >
                  <Edit></Edit>
                </S.AcaoBtn>
              </Tooltip>
              <Tooltip title="Deletar">
                <S.AcaoBtn
                  onClick={() =>
                    handleDeleteAluno(aluno.id as number, aluno.nome)
                  }
                  tipo="delete"
                >
                  <Delete></Delete>
                </S.AcaoBtn>
              </Tooltip>
            </S.AcoesCardAlunos>
            <S.Avatar src={ENV.API_GET_IMAGE + aluno.foto} alt="" />
            <S.InformacoesALuno>
              <p>Nome: {aluno.nome}</p>
              <p>Endereço: {aluno.endereco}</p>
              <p>Telefone: {aluno.telefone}</p>
            </S.InformacoesALuno>
          </S.AlunoCard>
        );
      });
    }
    return <>Nenhum Aluno Cadastrado!</>;
  };

  return (
    <>
      <h1>Lista de Alunos</h1>
      <S.ListaAlunos>{showListaAlunos()}</S.ListaAlunos>
    </>
  );
};

export default ListarAlunos;
