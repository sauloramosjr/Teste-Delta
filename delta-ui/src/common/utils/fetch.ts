import axios from "axios";
import { IAluno } from "../interfaces/aluno.interface";
import { ENV } from "./enviroments";
export const fetchAxios = {
  get: async <T>(url: string) => await axios.get<T>(ENV.API + url),
  delete: async <T>(url: string) => await axios.delete<T>(ENV.API + url),
  post: async <T>(url: string, data: T & { id?: number }) => {
    const formData = new FormData();
    const dataUnknow = data as any;
    for (const d of Object.keys(dataUnknow as object)) {
      if (d == "id") continue;
      formData.append(d, dataUnknow[d]);
    }

    return await axios.post<T & { id: number }>(ENV.API + url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  },
  patch: async <T>(
    url: string,
    data: T & { id?: number; oldImage?: string },
  ) => {
    const formData = new FormData();
    const dataUnknow = data as any;
    for (const d of Object.keys(dataUnknow as object)) {
      if (d == "id") continue;
      formData.append(d, dataUnknow[d]);
    }
    const id = data.id ?? undefined;

    let urlToSend = ENV.API + url;
    if (id) {
      urlToSend += "/" + id;
    }

    return await axios.patch<T & { id: number }>(urlToSend, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
