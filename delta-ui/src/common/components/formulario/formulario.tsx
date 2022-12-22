import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { HTMLInputTypeAttribute, useContext, useEffect, useState } from "react";
import { RegisterOptions, useForm } from "react-hook-form";
import { ENV } from "../../utils/enviroments";
import { fetchAxios } from "../../utils/fetch";
import * as S from "./styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IAluno } from "../../interfaces/aluno.interface";
import { SnackBarContext } from "../../contexts/snackbar.contexts";

const Formulario = ({
  defaultValues,
  inputs,
}: {
  defaultValues?: any;
  inputs: {
    label: string;
    title: string;
    validations?: any;
    type: HTMLInputTypeAttribute;
  }[];
}) => {
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
  } = useForm({ resolver: yupResolver(schema), defaultValues });
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
    if (defaultValues?.foto)
      return <S.Image src={ENV.API_GET_IMAGE + defaultValues?.foto} alt="" />;

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
            if (defaultValues && defaultValues.id) {
              const alunoEdited: any = {};
              Object.keys(e).forEach((key) => {
                if (String(e[key]) !== String(defaultValues[key])) {
                  alunoEdited[key] = e[key];
                }
              }, {} as any);
              const dataToSend = {
                ...alunoEdited,
                id: defaultValues.id,
              };
              if (file && file.name !== defaultValues.foto) {
                dataToSend.foto = file;
                dataToSend.oldImage = defaultValues.foto;
              } else {
                delete dataToSend.foto;
              }
              resposta = await fetchAxios.patch("alunos", dataToSend);
              if (!!resposta.data.affected) {
                setSnackBar({
                  message: `Aluno ${e.nome} editado com sucesso!`,
                  open: true,
                });
              }
            }
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

export default Formulario;
