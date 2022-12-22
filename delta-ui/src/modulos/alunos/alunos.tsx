import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { routesAlunos } from "./routes";
import styled from "styled-components";
import { Button } from "@mui/material";
import { AlunosProvider } from "../../common/contexts/alunos.contexts";

const MyNav = styled.nav`
  top: 50px;
  left: 0;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Alunos = () => {
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/alunos") {
      navigation("/alunos/listar");
    }
  }, [location.pathname]);

  return (
    <>
      <AlunosProvider>
        <MyNav>
          {routesAlunos.map((rota, key) =>
            rota.title ? (
              <Button
                variant="contained"
                style={{ marginRight: "10px", marginTop: "10px" }}
                key={key}
                onClick={() => navigation(rota.path)}
              >
                {rota.title}
              </Button>
            ) : undefined,
          )}
        </MyNav>
        <Outlet></Outlet>
      </AlunosProvider>
    </>
  );
};

export default Alunos;
