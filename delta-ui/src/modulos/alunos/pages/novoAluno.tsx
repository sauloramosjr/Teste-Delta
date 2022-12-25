import Formulario from "../../../common/components/formulario/formulario";
import * as yup from "yup";

const novoAluno = () => {
  return (
    <>
      <h1>Novo Aluno</h1>
      <Formulario
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
  );
};

export default novoAluno;
