import { yupResolver } from "@hookform/resolvers/yup";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { HTMLInputTypeAttribute, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { SnackBarContext } from "../../contexts/snackbar.contexts";
import { ENV } from "../../utils/enviroments";
import { fetchAxios } from "../../utils/fetch";
import { AddFormulario } from "./components/addFormulario";
import { EditFormulario } from "./components/editFormulario";
import * as S from "./styles";
import { FormProps } from "./types";

const Formulario = ({ defaultValues, inputs, id }: FormProps) => {
  if (id) {
    return (
      <EditFormulario
        id={id}
        inputs={inputs}
        defaultValues={defaultValues}
      ></EditFormulario>
    );
  }
  return <AddFormulario inputs={inputs}></AddFormulario>;
};

export default Formulario;
