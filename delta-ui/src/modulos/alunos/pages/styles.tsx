import styled from "styled-components";

export const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const AlunoCard = styled.div`
  max-width: 300px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 3px 3px black;
  display: flex;
  justify-content: center;
  position: relative;
`;

export const ListaAlunos = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: calc(100vw - 100px);
`;
export const InformacoesALuno = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;
export const AcoesCardAlunos = styled.div`
  position: absolute;
  top: 0;
  right: 0px;
`;
export const AcaoBtn = styled.button`
  background: ${(props: { tipo: "delete" | "edit" }) =>
    props.tipo === "delete" ? "red" : "yellow"};
  font-size: 1px;
`;
