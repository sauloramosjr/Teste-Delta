import { Snackbar } from "@mui/material";
import React, { createContext, Dispatch, useState } from "react";
import { IAluno } from "../interfaces/aluno.interface";
import MuiAlert from '@mui/material/Alert';
type TSnack = {
  open: boolean;
  autoHideDuration?: number;
  onClose?: () => void;
  message?: string;
  action?: string;
  severity?: "error" | "warning" | "info" | "success"
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
          action={snackBar.action ?? "fechar"}
        >
          <MuiAlert elevation={6} severity={snackBar.severity}>{snackBar.message}</MuiAlert>
        </Snackbar>
      </>
    </SnackBarContext.Provider>
  );
};
