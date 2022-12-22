import React, { createContext, Dispatch, useState } from "react";
import { IAluno } from "../interfaces/aluno.interface";

export const AlunosContext = createContext<{
  alunos: IAluno[];
  setAlunos: Dispatch<IAluno[]>;
}>({
  alunos: [],
  setAlunos: () => undefined,
});

export const AlunosProvider = ({ children }: any) => {
  const [alunos, setAlunos] = useState<IAluno[]>([]);

  return (
    <AlunosContext.Provider value={{ alunos, setAlunos }}>
      {children}
    </AlunosContext.Provider>
  );
};
