import { Snackbar } from "@mui/material";
import React, { createContext, Dispatch, useState } from "react";
import { IAluno } from "../interfaces/aluno.interface";

type TSnack = {
  open: boolean;
  autoHideDuration?: number;
  onClose?: () => void;
  message?: string;
  action?: string;
};
export const SnackBarContext = createContext<{
  setSnackBar: Dispatch<TSnack>;
}>({} as any);

export const SnackBarProvider = ({ children }: any) => {
  const [snackBar, setSnackBar] = useState<TSnack>({} as TSnack);

  return (
    <SnackBarContext.Provider value={{ setSnackBar }}>
      <>
        {children}
        <Snackbar
          open={snackBar.open}
          autoHideDuration={snackBar.autoHideDuration ?? 3000}
          onClose={() => {
            setSnackBar({ open: false });
          }}
          message={snackBar.message}
          action={snackBar.action ?? "fechar"}
        />
      </>
    </SnackBarContext.Provider>
  );
};
