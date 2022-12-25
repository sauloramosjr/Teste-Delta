import { HTMLInputTypeAttribute } from "react";
import { IAluno } from "../../interfaces/aluno.interface";

export type FormProps = {
  defaultValues?: IAluno;
  inputs: TInputForm[];
  id?: number;
};
export type TFormAddProps = {
  inputs: TInputForm[];
};
export type TFormEditProps = {
  defaultValues?: IAluno;
  id: number;
  inputs: TInputForm[];
};

export type TInputForm = {
  label: "foto" | "nome" | "telefone" | "endereco" | "id";
  title: string;
  validations?: any;
  type: HTMLInputTypeAttribute;
};
