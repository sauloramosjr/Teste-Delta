import { existsSync, unlinkSync } from 'fs';

export const fileWizard = {
  deletarArquivo: (nomeArquivo: string) => {
    const arquivo = existsSync('./uploads/' + nomeArquivo);
    if (arquivo) unlinkSync('./uploads/' + nomeArquivo);
  },
};
