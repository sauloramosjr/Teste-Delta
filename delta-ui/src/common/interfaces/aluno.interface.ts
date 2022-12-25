export interface IAluno {
  id?: number;
  nome: string;
  telefone: string;
  endereco: string;
  foto: File | string;
}
export interface IEditAluno {
  id: number;
  nome?: string;
  telefone?: string;
  endereco?: string;
  foto?: File | string;
  oldImage: string | File;
}
