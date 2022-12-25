import { yupResolver } from "@hookform/resolvers/yup";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { SnackBarContext } from "../../../contexts/snackbar.contexts";
import { TFormAddProps } from "../types";

import { Button } from "@mui/material";
import { fetchAxios } from "../../../utils/fetch";
import * as S from "../styles";

export const AddFormulario = ({ inputs }: TFormAddProps) => {
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
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [file, setFile] = useState<any>();
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
    return <AccountCircleIcon />;
  };
  return (
    <>
      <S.Form
        onSubmit={handleSubmit(async (e: any) => {
          try {
            const valid = await schema.validate(e);
            if (!valid) return;
            let resposta = null;
            resposta = await fetchAxios.post("alunos", {
              ...e,
              foto: file,
            });
            if (!!resposta.data.id) {
              setSnackBar({
                message: `Aluno ${resposta.data.nome} salvo com sucesso!`,
                open: true,
              });
            }
            setTimeout(() => {
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
                      `#${input.label + key}`,
                    ) as HTMLInputElement;
                    fileInput?.click();
                  }}
                  variant="contained"
                >
                  {input.title}
                </Button>
                <div>{showFoto()}</div>

                <S.InputImage
                  id={input.label + key}
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
        <S.InputSubmit
          invalid={
            Object.entries(getValues()).length != 4 ||
            !!Object.entries(errors).length
          }
          type="submit"
        />
      </S.Form>
    </>
  );
};
