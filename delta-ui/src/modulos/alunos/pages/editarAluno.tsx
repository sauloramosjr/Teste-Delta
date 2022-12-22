import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Formulario from "../../../common/components/formulario/formulario";
import { AlunosContext } from "../../../common/contexts/alunos.contexts";
import * as yup from "yup";
import { IAluno } from "../../../common/interfaces/aluno.interface";

const editarAluno = () => {
  const params = useParams();
  const { alunos, setAlunos } = useContext(AlunosContext);
  const [aluno, setAluno] = useState<IAluno>();
  useEffect(() => {
    if (!!alunos.length) {
      setAluno(alunos.find((aluno) => aluno.id == params.id));
    }
  }, []);
  return (
    <>
      {aluno && (
        <>
          <h1>Editar de Aluno: </h1>
          <h3>{aluno.nome}</h3>

          <Formulario
            defaultValues={aluno}
            inputs={[
              {
                label: "nome",
                title: "Nome *",
                validations: yup.string().required("Nome é obrigatório!"),
                type: "text",
              },
              {
                label: "endereco",
                title: "Endereço *",
                validations: yup.string().required("Endereço é obrigatório!"),
                type: "text",
              },
              {
                label: "telefone",
                title: "Telefone *",
                validations: yup
                  .number()
                  .required("Telefone é obrigatório!")
                  .typeError("Telefone Precisa ter apenas números!"),
                type: "text",
              },
              {
                label: "foto",
                title: "Foto *",
                type: "file",
                validations: yup.mixed().required("Foto é obrigatório!"),
              },
            ]}
          ></Formulario>
        </>
      )}{" "}
      {!aluno && <></>}
    </>
  );
};

export default editarAluno;
