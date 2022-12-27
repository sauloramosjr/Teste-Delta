import { yupResolver } from "@hookform/resolvers/yup";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { SnackBarContext } from "../../../contexts/snackbar.contexts";
import { TFormEditProps } from "../types";

import { Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IAluno, IEditAluno } from "../../../interfaces/aluno.interface";
import { ENV } from "../../../utils/enviroments";
import { fetchAxios } from "../../../utils/fetch";
import * as S from "../styles";

export const EditFormulario = ({
  id,
  inputs,
  defaultValues,
}: TFormEditProps) => {
  const getShape = () => {
    const shape = inputs.reduce((final, atual) => {
      final[atual.label] = atual.validations;
      return final;
    }, {} as any);
    return shape;
  };
  const { setSnackBar } = useContext(SnackBarContext);
  const schema = yup.object().shape({ ...getShape() });
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues });
  const [file, setFile] = useState<any>();
  const [editAluno, setEditAluno] = useState<IEditAluno>({} as IEditAluno);
  const navigation = useNavigate();

  useEffect(() => {
    if (!file) {
      setValue("foto", "");
    } else {
      setValue("foto", file);
      clearErrors("foto");
    }
  }, [file]);

  const showFoto = () => {
    if (file) return <S.Image src={URL.createObjectURL(file as any)} alt="" />;
    if (defaultValues?.foto)
      return <S.Image src={ENV.API_GET_IMAGE + defaultValues?.foto} alt="" />;

    return <AccountCircleIcon />;
  };

  const confirmarSeMudou = async (e: any) => {
    if (e.target) {
      if (
        !!defaultValues &&
        e.target.value !== defaultValues[e.target.id as keyof IAluno]
      ) {
        setEditAluno({ ...editAluno, [e.target.id]: e.target.value } as any);
      } else {
        const newEditeAluno: any = {};
        Object.keys(editAluno).forEach((key: unknown) => {
          if (e.target.id != key) {
            newEditeAluno[key as keyof IAluno] = editAluno[key as keyof IAluno];
          }
        });
        setEditAluno(newEditeAluno);
      }
    } else {
      Object.keys(e).forEach((key) => {
        if (!!defaultValues && e[key] !== defaultValues[key as keyof IAluno]) {
          setEditAluno({ ...editAluno, [key]: e[key] } as any);
        } else {
          const newEditeAluno = editAluno;
          delete newEditeAluno[key as keyof IAluno];
          setEditAluno(newEditeAluno);
        }
      });
    }
  };

  return (
    <>
      <S.Form
        onChange={confirmarSeMudou}
        onSubmit={handleSubmit(async (e: any) => {
          await confirmarSeMudou(e);
          try {
            const valid =
              (await schema.validate(e)) && !!Object.keys(editAluno).length;
            if (!valid) return;
            let resposta = null;
            if (defaultValues && defaultValues.id) {
              const dataToSend = {
                ...editAluno,
                id: defaultValues.id,
              };
              if (file && file.name !== defaultValues.foto) {
                dataToSend.foto = file;
                dataToSend.oldImage = defaultValues.foto;
              } else {
                delete dataToSend.foto;
              }
              resposta = await fetchAxios.patch("alunos", dataToSend as any);
              if (!!resposta.data.affected) {
                setSnackBar({
                  message: `Aluno ${e.nome} editado com sucesso!`,
                  open: true,
                  severity:'success'
                });
              }
            }
            setTimeout(() => {
              navigation("../listar");
              setSnackBar({ message: "", open: false });
            }, 2000);
          } catch (err: any) {
            console.log(err);
          }
        })}
      >
        {inputs.map((input, key) =>
          input.type != "file" ? (
            <S.FlexColumn key={key}>
              <S.MyTextField
                id={input.label}
                color="secondary"
                focused
                label={input.title}
                {...register(input.label, {})}
                type={input.type}
              />
              {errors[input.label] && (
                <S.SpanErrors>
                  {(errors[input.label]?.message as string) ?? ""}
                </S.SpanErrors>
              )}
            </S.FlexColumn>
          ) : (
            <S.FlexColumn key={key}>
              <S.ContentFileInput>
                <Button
                  onClick={() => {
                    const fileInput = document.querySelector(
                      `#foto`,
                    ) as HTMLInputElement;
                    fileInput?.click();
                  }}
                  variant="contained"
                >
                  {input.title}
                </Button>
                <div>{showFoto()}</div>

                <S.InputImage
                  id={"foto"}
                  type="file"
                  accept="image/jpg, image/png, image/jpeg"
                  {...register(input.label, {})}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFile(e.target.files[0]);
                    }
                  }}
                />
              </S.ContentFileInput>
              {errors[input.label] && (
                <S.SpanErrors>
                  {(errors[input.label]?.message as string) ?? ""}
                </S.SpanErrors>
              )}
            </S.FlexColumn>
          ),
        )}
        <Tooltip
          title={
            !Object.keys(editAluno).length
              ? "Formulário sem nenhuma alteração!"
              : "Enviar Aluno"
          }
        >
          <S.InputSubmit
            invalid={
              !!Object.keys(errors).length || !Object.keys(editAluno).length
            }
            type="submit"
          />
        </Tooltip>
      </S.Form>
    </>
  );
};
